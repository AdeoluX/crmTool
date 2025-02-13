"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixtureRoutes = void 0;
const express_1 = __importDefault(require("express"));
class FixtureRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        // this.router.post("/", AuthMiddleware.withRoles(['admin']).verifyUser, validateRequest(createFixtureValidation), FixtureController.prototype.create);
        // this.router.get("/:fixtureId?", AuthMiddleware.withRoles(['admin', 'user']).verifyUser, validateRequest(searchFixtureValidation), FixtureController.prototype.read);
        // this.router.put("/:fixtureId", AuthMiddleware.withRoles(['admin']).verifyUser, validateRequest(updateFixtureValidation), FixtureController.prototype.update);
        // this.router.delete("/:fixtureId", AuthMiddleware.withRoles(['admin']).verifyUser, FixtureController.prototype.delete);
        // //link
        // this.router.post("/generate-link/:fixtureId", AuthMiddleware.withRoles(['admin']).verifyUser, FixtureController.prototype.generateLink);
        // this.router.get("/links/:fixtureId", AuthMiddleware.withRoles(['admin', 'user']).verifyUser, FixtureController.prototype.getFixtureLinks);
        // this.router.get("/link/:link", AuthMiddleware.withRoles(['admin', 'user']).verifyUser, FixtureController.prototype.getFixtureViaLink);
        return this.router;
    }
}
exports.fixtureRoutes = new FixtureRoutes();
//# sourceMappingURL=fixture.routes.js.map