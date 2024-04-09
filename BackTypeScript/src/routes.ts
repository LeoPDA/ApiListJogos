import express from 'express';
import GaController from './controllers/GaController';


const routes = express.Router();
const  gameController = new GaController();


routes.get('/games', gameController.Index);
routes.get('/games/:id', gameController.Show);
routes.post('/games', gameController.Create);
routes.put('/games/:id', gameController.Edit);
routes.delete('/games/:id', gameController.Delete);



export default routes;