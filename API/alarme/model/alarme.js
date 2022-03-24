const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlarmeSchema = new Schema({
 id: {
  type: String, 
  required: [true, 'Obrigatório'], 
 },
 indiceGas: {
  type: String, 
  required: [true, 'Obrigatório'], 
 },
 temperatura: {
  type: String, 
  required: [true, 'Obrigatório'], 
 },
 status: {
  type: String, 
  required: [true, 'Obrigatório']},
 dia: {
  type: String, 
  required: [true, 'Obrigatório']},
 hora: {
  type: String, 
  required: [true, 'Obrigatório']},
 });
// Exportar o modelo
module.exports = mongoose.model('alarme', AlarmeSchema);