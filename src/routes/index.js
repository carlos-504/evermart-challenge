import { Router } from 'express';
import UserController from '../controllers/UserController';

const routes = Router();
const userController = new UserController();

routes.get('/user', userController.getUsers);
routes.get('/user-xls', userController.generateXLS);

export default routes;
