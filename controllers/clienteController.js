import Cliente from '../models/cliente.js';


// Obtener todos los clientes
export async function getClientes(req, res) {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({error})
    }
    
};

// Crear cliente
export async function postCliente (req, res) {
    const body = req.body //obtiene la informacion desde postman o del formulario
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json('Cliente created successfully')
    } catch (error) {
        res.status(500).json(error)
    }
    
};

// Actualizar cliente
export async function updateCliente(req, res) {
    const { documentoCliente, nombreCompleto, celular, fechaNacimiento } = req.body; // destructuring data from body
    try {
        // Busca el cliente por documentoCliente y actualiza los campos especificados
        await Cliente.findOneAndUpdate(
            { documentoCliente: documentoCliente },
            { nombreCompleto: nombreCompleto, celular: celular, fechaNacimiento: fechaNacimiento }
        );
        res.status(200).json('Cliente actualizado exitosamente');
    } catch (error) {
        res.status(500).json(error);
    }
}


// Eliminar cliente
export async function deleteCliente(req, res) {
    const _id = req.params.id; // obtener el id desde Postman o desde algún formulario
    try {
        await Cliente.findByIdAndDelete({ _id: _id });
        res.json('Cliente eliminado exitosamente');
    } catch (error) {
        res.status(404).json('Cliente no encontrado');
    }
}
