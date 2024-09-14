import {model, Schema} from "mongoose";
import bcrypt from 'bcrypt';

const UsuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        unique: true,
        required: true 
        },
    password:{
        type: String,
        required: true 
        },
    estado:{
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo' }
});

UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default model('Usuario', UsuarioSchema);
