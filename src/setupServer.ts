import express, { Application, json, urlencoded, Response, Request, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import HTTP_STATUS from "http-status-codes";
import session from "express-session";
import rateLimit from "express-rate-limit";
import applicationRoutes from "./routes";
import { IErrorResponse, CustomError } from "./utils/error-handler";
import { RedisStore, redisClient } from "./config/redis";

export class Server {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.setup();
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.redisSessionMiddleware(this.app); // <-- Add Redis session middleware
    this.routesMiddleware(this.app);
    this.apiMonitoring(this.app);
    this.startServer(this.app);
    this.globalErrorHandler(this.app);
  }

  private async setup(): Promise<void> {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    await this.redisSessionMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.apiMonitoring(this.app);
    this.globalErrorHandler(this.app);
  }

  private async redisSessionMiddleware(app: Application): Promise<void> {
    try {
      if (!redisClient.isOpen) await redisClient.connect();
      app.use(
        session({
          store: new RedisStore({ client: redisClient as any }),
          secret: process.env.SESSION_SECRET || "your_secret_key",
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
          },
        })
      );
    } catch (error) {
      console.error("❌ Redis Connection Error:", error);
    }
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));
    app.disable("x-powered-by");
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private apiMonitoring(app: Application): void {
    // Add API monitoring logic here (e.g., Prometheus, Datadog)
  }

  private securityMiddleware(app: Application): void {
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: "*",
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );

    if (process.env.NODE_ENV !== "test") {
      const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        message: "Too many requests from this IP, please try again later.",
      });

      app.use(limiter);
      app.set("trust proxy", 1);
    }
  }

  private globalErrorHandler(app: Application): void {
    app.all("*", (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    const errorHandler: ErrorRequestHandler = (
      error: IErrorResponse,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeErrors());
      } else {
        res.status(HTTP_STATUS.BAD_REQUEST).send({
          status: "BAD_REQUEST",
          message: error.message ?? "Something went wrong.",
          statusCode: HTTP_STATUS.BAD_REQUEST,
        });
      }
    };

    app.use(errorHandler);
  }

  private startServer(app: Application): void {
    app.listen(process.env.PORT, async () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  }

  public getApp(): Application {
    return this.app;
  }
}
