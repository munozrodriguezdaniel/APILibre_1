import { Schema, model } from 'mongoose'

const MonoplazaSchema = new Schema({
    id:Number,
    modelo: String,
    piloto: String,
    n_vuelta: Number,
    num_pitstop: Number,
    f_pitstop: Array,
    url:String
},{
    collection:'monoplaza'
})


const PilotoSchema = new Schema({
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
},{
    collection:'piloto'
})



export const Monoplaza = model('monoplaza', MonoplazaSchema  )
export const Piloto = model('piloto', PilotoSchema  )
