import {model, Schema} from "mongoose";

const ClienteSchema = new Schema({
    documentoCliente:{
         type: String,
         unique: true,
         required: true 
        },
    nombreCompleto:{
         type: String,
         required: true 
        },
    celular:{
         type: String,
         required: true 
        },
    fechaNacimiento:{
         type: Date,
         required: true }
});

export default model('Cliente', ClienteSchema, 'cliente');
