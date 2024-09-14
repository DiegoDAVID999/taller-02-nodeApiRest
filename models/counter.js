// counter.js
import mongoose from 'mongoose';

// Define el esquema del contador
const counterSchema = new mongoose.Schema({
  _id: String, // Nombre del contador, como 'numeroCuenta'
  seq: { type: Number, default: 0 } // Valor inicial del contador
});

// Crea el modelo del contador
const Counter = mongoose.model('Counter', counterSchema);

// Función para obtener el siguiente valor de la secuencia
export async function getNextSequence(name) {
  const counter = await Counter.findByIdAndUpdate(
    { _id: name }, // Identificador del contador
    { $inc: { seq: 1 } }, // Incrementa el contador
    { new: true, upsert: true } // Crea el documento si no existe
  );
  return counter.seq; // Devuelve el nuevo valor del contador
}

export default Counter;
