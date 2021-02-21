import {Request, Response, Router } from 'express'
import { Monoplaza, Piloto } from '../model/schemas'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }
    
    private listarMonoplaza2 = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Monoplaza.find()  
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private listarPiloto = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Piloto.find()  
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private listarPiloto2 = async (req:Request, res: Response) => {
        const { id } = req.params
        let id2 = parseInt(id)
        await db.conectarBD()
        .then( async ()=> {
            const query = await Piloto.find(
                {id:id2}
            )  
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private detailsMonoplaza = async (req:Request, res: Response) => {
        const { id } = req.params
        let id2 = parseInt(id)
        await db.conectarBD()
        .then( async ()=> {
            const query = await Monoplaza.find(
                {id:id2}
            )
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
   
    private actualizarMonoplaza = async (req:Request, res: Response) => {
        const { id } = req.params
        const { modelo, n_vuelta, num_pitstop } = req.body
        await db.conectarBD()
            await Monoplaza.findOneAndUpdate(
                {id:id},
                {
                    modelo: modelo,
                    n_vuelta: n_vuelta,
                    num_pitstop: num_pitstop

                },
                {
                    new: true,
                    runValidators: true // para que se ejecuten las validaciones del Schema
                }    
        )
        .then( (docu: any) => {}
    )
    .catch( (err: any) => {
        console.log('Error: '+err)
        res.json({error: 'Error: '+err })
    }
    ) // concatenando con cadena muestra mensaje
        await db.desconectarBD()
    }

    private actualizarPiloto = async (req:Request, res: Response) => {
        const { id } = req.params
        const { nombre, fecha_n, modelo_m, num_carrera, num_victoria, num_pole, num_podio, escuderia, url } = req.body
        await db.conectarBD()
        await Piloto.findOneAndUpdate(
            {id:id},
            {
                id:id,
                nombre: nombre,
                fecha_n: fecha_n,
                modelo_m: modelo_m,
                num_carrera: num_carrera,
                num_victoria: num_victoria,
                num_pole: num_pole,
                num_podio: num_podio,
                escuderia: escuderia,
                url:url

            },
            {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            }    
        )
        .then( (docu: any) => {}
    )
    .catch( (err: any) => {
        console.log('Error: '+err)
        res.json({error: 'Error: '+err })
    }
    ) // concatenando con cadena muestra mensaje
        await db.desconectarBD()
    }

    private addPiloto = async (req: Request, res: Response) => {
        const { id, nombre, modelo_m, fecha_n, num_carrera, num_victoria, num_podio, num_pole, escuderia, url} = req.body

        await db.conectarBD()
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
        }
        const oSchema = new Piloto(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    }

    private borrarPiloto = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        await Piloto.findOneAndDelete(
            { id: id }, 
            // (err: any, doc) => {
            //     if(err) res.json(err)
            //     else{
            //         if (doc == null) res.json(`No encontrado`+id)
            //         else res.json('Borrado correcto: '+ doc)
            //     }
            // }
        )
        await db.desconectarBD()
    }

    misRutas(){
        this._router.get('/lisMonoplaza', this.listarMonoplaza2)
        this._router.get('/lisPiloto', this.listarPiloto)
        this._router.get('/lisPiloto2/:id', this.listarPiloto2)
        this._router.get('/detMonoplaza/:id', this.detailsMonoplaza)
        this._router.post('/actMonoplazas/:id', this.actualizarMonoplaza)
        this._router.post('/actPiloto/:id', this.actualizarPiloto)
        this._router.post('/addPiloto', this.addPiloto)
        this._router.get('/borPiloto/:id', this.borrarPiloto)
        
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router
