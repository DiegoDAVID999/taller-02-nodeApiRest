import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

// Login de usuario
export async function login(req, res) {
    const { nombreUsuario, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ nombreUsuario });
        if (!usuario || usuario.estado === 'inactivo') {
            return res.status(400).json({ error: 'Usuario no existe o está inactivo' });
        }

        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario._id }, SECRET_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el proceso de autenticación' });
    }
}

// Crear usuario
export async function createUsuario(req, res) {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

// Actualizar usuario
export async function updateUsuario(req, res) {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

// Eliminar usuario
export async function deleteUsuario(req, res) {
    const _id = req.params.id; // obtener el id desde Postman o formulario
    try {
        await Usuario.findByIdAndDelete({ _id });
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
}
