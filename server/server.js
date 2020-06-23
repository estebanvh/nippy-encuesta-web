require('./config/config');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { obtenerPreguntas, guardarRespuestas, obtenerEncuesta } = require('./servicios/encuesta-api');

const path = require('path');

const app = express();
let server = http.createServer(app);

//exponer carpeta public
let ruta = path.resolve(__dirname, '../public');
app.use(express.static(ruta));

const io = socketIO(server);
io.on('connection', (client) => {

    client.on('obtenerPreguntas', (callback) => {


        obtenerEncuesta({ activa: true })
            .then((resp) => {

                console.log(resp);
                if (!resp.ok) {
                    return callback(resp)
                }

                obtenerPreguntas(resp.encuestas[0]._id)
                    .then(resp => callback(resp))
                    .catch(err => callback(err))

            })
            .catch(err => callback(err));

    });

    client.on('guardarRespuesta', (data, callback) => {

        guardarRespuestas(data)
            .then(resp => {
                callback(resp);
            })
            .catch(err => {
                callback(err);
            })
    })

});

server.listen(process.env.PORT, () => {
    console.log('servidor arriba');
})