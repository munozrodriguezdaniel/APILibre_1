"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const schemas_1 = require("../model/schemas");
const database_1 = require("../database/database");
class Routes {
    constructor() {
        this.listarMonoplaza2 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield schemas_1.Monoplaza.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.listarPiloto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield schemas_1.Piloto.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.listarPiloto2 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let id2 = parseInt(id);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield schemas_1.Piloto.find({ id: id2 });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.detailsMonoplaza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let id2 = parseInt(id);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield schemas_1.Monoplaza.find({ id: id2 });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.actualizarMonoplaza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { modelo, n_vuelta, num_pitstop } = req.body;
            yield database_1.db.conectarBD();
            yield schemas_1.Monoplaza.findOneAndUpdate({ id: id }, {
                modelo: modelo,
                n_vuelta: n_vuelta,
                num_pitstop: num_pitstop
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => { })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            }); // concatenando con cadena muestra mensaje
            yield database_1.db.desconectarBD();
        });
        this.actualizarPiloto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, fecha_n, modelo_m, num_carrera, num_victoria, num_pole, num_podio, escuderia, url } = req.body;
            yield database_1.db.conectarBD();
            yield schemas_1.Piloto.findOneAndUpdate({ id: id }, {
                id: id,
                nombre: nombre,
                fecha_n: fecha_n,
                modelo_m: modelo_m,
                num_carrera: num_carrera,
                num_victoria: num_victoria,
                num_pole: num_pole,
                num_podio: num_podio,
                escuderia: escuderia,
                url: url
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => { })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            }); // concatenando con cadena muestra mensaje
            yield database_1.db.desconectarBD();
        });
        this.addPiloto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, modelo_m, fecha_n, num_carrera, num_victoria, num_podio, num_pole, escuderia, url } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                id: id,
                nombre: nombre,
                fecha_n: fecha_n,
                modelo_m: modelo_m,
                num_carrera: num_carrera,
                num_podio: num_podio,
                num_pole: num_pole,
                num_victoria: num_victoria,
                escuderia: escuderia,
                url: url
            };
            const oSchema = new schemas_1.Piloto(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.borrarPiloto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            yield schemas_1.Piloto.findOneAndDelete({ id: id });
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/lisMonoplaza', this.listarMonoplaza2);
        this._router.get('/lisPiloto', this.listarPiloto);
        this._router.get('/lisPiloto2/:id', this.listarPiloto2);
        this._router.get('/detMonoplaza/:id', this.detailsMonoplaza);
        this._router.post('/actMonoplazas/:id', this.actualizarMonoplaza);
        this._router.post('/actPiloto/:id', this.actualizarPiloto);
        this._router.post('/addPiloto', this.addPiloto);
        this._router.get('/borPiloto/:id', this.borrarPiloto);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;
