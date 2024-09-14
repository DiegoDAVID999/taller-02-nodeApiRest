import Router from 'express';
import { getCuentas, postCuenta, consignar, retirar, deleteCuenta  } from '../controllers/cuentaController.js';

const routerCuenta = Router();

routerCuenta.get('/cuenta', getCuentas);
routerCuenta.post('/cuenta', postCuenta);
routerCuenta.post('/cuenta/:id/consignar', consignar);
routerCuenta.post('/cuenta/:id/retirar', retirar);
routerCuenta.delete('/cuenta/:id', deleteCuenta);

export default routerCuenta;
