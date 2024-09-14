import Cuenta from '../models/cuenta.js';

// Listar cuentas
export async function getCuentas(req, res) {
    try {
        const cuentas = await Cuenta.find();
        res.json(cuentas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las cuentas' });
    }
}

// Crear cuenta
export async function postCuenta(req, res) {
    try {
        const nuevaCuenta = new Cuenta(req.body);
        await nuevaCuenta.save();
        res.status(201).json(nuevaCuenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la cuenta' });
    }
}

// Consignar dinero
export async function consignar(req, res) {
    const { monto } = req.body;
    if (monto <= 0) return res.status(400).json({ error: 'Monto inválido' });

    try {
        const cuenta = await Cuenta.findById(req.params.id);
        cuenta.saldo += monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al consignar dinero' });
    }
}

// Retirar dinero
export async function retirar(req, res) {
    const { monto } = req.body;

    try {
        const cuenta = await Cuenta.findById(req.params.id);
        if (monto > cuenta.saldo) return res.status(400).json({ error: 'Fondos insuficientes' });

        cuenta.saldo -= monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al retirar dinero' });
    }
}

// Eliminar cuenta
export async function deleteCuenta(req, res) {
    try {
        const cuenta = await Cuenta.findById(req.params.id);
        if (cuenta.saldo !== 0) return res.status(400).json({ error: 'El saldo debe ser cero' });

        await Cuenta.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cuenta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la cuenta' });
    }
}

