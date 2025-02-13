"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const express_1 = __importDefault(require("express"));
class TeamRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        // this.router.post("/",  AuthMiddleware.withRoles(['admin']).verifyUser, validateRequest(createTeamValidation), TeamController.prototype.create);
        // this.router.get("/:teamId?", AuthMiddleware.withRoles(['admin', 'user']).verifyUser, validateRequest(searchFixtureValidation), TeamController.prototype.read);
        // this.router.put("/:teamId", AuthMiddleware.withRoles(['admin']).verifyUser, validateRequest(updateTeamValidation), TeamController.prototype.update);
        // this.router.delete("/:teamId", AuthMiddleware.withRoles(['admin']).verifyUser, TeamController.prototype.delete);
        return this.router;
    }
}
exports.teamRoutes = new TeamRoutes();
//# sourceMappingURL=team.routes.js.map