import {model, Schema} from "mongoose";
import { getNextSequence } from "./counter.js";
import bcrypt from 'bcrypt';



const CuentaSchema = new Schema({
    numeroCuenta: {
         type: Number,
         unique: true 
        },
    documentoCliente: {
         type: String,
         required: true 
        },
    fechaApertura: {
         type: Date, 
         default: Date.now 
        },
    saldo: {
         type: Number, 
         default: 0 
        },
    claveAcceso: {
         type: String,
         required: true 
        }
});

CuentaSchema.pre('save', async function (next) {
    if (!this.isModified('claveAcceso')) return next();
    this.claveAcceso = await bcrypt.hash(this.claveAcceso, 10);
    next();
});

// Middleware para auto-incrementar numeroCuenta antes de guardar
CuentaSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.numeroCuenta = await getNextSequence('numeroCuenta'); // Generar el siguiente número de cuenta
    }

    if (this.isModified('claveAcceso')) {
        this.claveAcceso = await bcrypt.hash(this.claveAcceso, 10);
    }

    next();
});




export default model('Cuenta', CuentaSchema, 'cuenta');
