require('../config/config');

const axios = require('axios');
const ruta = process.env.RUTA_API;


let obtenerEncuesta = async(activa = {}) => {

    let recurso = `${ruta}/encuestas`;
    try {
        let resp = await axios.get(recurso, { params: activa });
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

let obtenerPreguntas = async(id) => {

    let recurso = `${ruta}/preguntas/${id}`;
    let resp = await axios.get(recurso);
    return resp.data;
}

let guardarRespuestas = async(data) => {

    let recurso = `${ruta}/ingresar-respuesta`;
    try {

        let resp = await axios.post(recurso, data);
        console.log("respuesta:", resp.data);
        return resp.data;

    } catch (error) {
        return error.response.data
    }

}

module.exports = {
    obtenerPreguntas,
    guardarRespuestas,
    obtenerEncuesta
}