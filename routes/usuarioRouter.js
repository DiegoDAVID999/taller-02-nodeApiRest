import  Router  from 'express'
import { login, createUsuario,updateUsuario, deleteUsuario } from '../controllers/usuarioController.js';

const routerUsuario = Router();

routerUsuario.post('/user/login', login);
routerUsuario.post('/user', createUsuario);
routerUsuario.put('/user/:id', updateUsuario);
routerUsuario.delete('/user/:id', deleteUsuario);

export default routerUsuario;
