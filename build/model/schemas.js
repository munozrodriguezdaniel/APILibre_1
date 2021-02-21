"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piloto = exports.Monoplaza = void 0;
const mongoose_1 = require("mongoose");
const MonoplazaSchema = new mongoose_1.Schema({
    id: Number,
    modelo: String,
    piloto: String,
    n_vuelta: Number,
    num_pitstop: Number,
    f_pitstop: Array,
    url: String
}, {
    collection: 'monoplaza'
});
const PilotoSchema = new mongoose_1.Schema({
    id: Number,
    nombre: String,
    fecha_n: Date,
    modelo_m: String,
    num_carrera: Number,
    num_victoria: Number,
    num_pole: Number,
    num_podio: Number,
    escuderia: String,
    url: String
}, {
    collection: 'piloto'
});
exports.Monoplaza = mongoose_1.model('monoplaza', MonoplazaSchema);
exports.Piloto = mongoose_1.model('piloto', PilotoSchema);
