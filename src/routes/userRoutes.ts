import { Router } from 'express';
import { UserController } from 'src/controllers/userController';

export const userRoutes  = Router();

userRoutes.get('/', UserController.getAll);
userRoutes.get('/:id', UserController.getById);
userRoutes.post('/', UserController.create);
userRoutes.put('/:id', UserController.update);
userRoutes.delete('/:id',UserController.delete);