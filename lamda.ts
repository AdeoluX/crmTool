import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from "aws-lambda";
import serverless from "@vendia/serverless-express";
import app from "./src/lamdaConfig"; // Import your Express app

const server = serverless({ app });//

export const handler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {
  return server(event, context, callback);
};
