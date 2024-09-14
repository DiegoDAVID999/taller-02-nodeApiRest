import Router from 'express';
import { getClientes, postCliente, updateCliente, deleteCliente } from '../controllers/clienteController.js';

const routesCliente = Router();

routesCliente.get('/cliente', getClientes);
routesCliente.post('/cliente', postCliente);
routesCliente.put('/cliente/:id', updateCliente);
routesCliente.delete('/cliente/:id', deleteCliente);

export default routesCliente;
