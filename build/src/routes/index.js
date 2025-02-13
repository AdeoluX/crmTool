"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = require("./auth.routes");
const team_routes_1 = require("./team.routes");
const fixture_routes_1 = require("./fixture.routes");
const BASE_PATH = "/api/v1";
exports.default = (app) => {
    const routes = () => {
        app.use(`${BASE_PATH}/auth`, auth_routes_1.authRoutes.routes());
        app.use(`${BASE_PATH}/team`, team_routes_1.teamRoutes.routes());
        app.use(`${BASE_PATH}/fixture`, fixture_routes_1.fixtureRoutes.routes());
    };
    routes();
};
//# sourceMappingURL=index.js.map