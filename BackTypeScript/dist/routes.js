"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GaController_1 = __importDefault(require("./controllers/GaController"));
const routes = express_1.default.Router();
const gameController = new GaController_1.default();
routes.get('/games', gameController.Index);
routes.get('/games/:id', gameController.Show);
routes.post('/games', gameController.Create);
routes.put('/games/:id', gameController.Edit);
routes.delete('/games/:id', gameController.Delete);
exports.default = routes;
