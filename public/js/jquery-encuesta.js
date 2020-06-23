var progessBar = $('#progressbar');
var divContenedor = $('#msform');

var socket = io();

var requestRespuestas = {

    "nombre": "",
    "respuesta": "",
    "pregunta": ""

}

/*function obtenerPreguntas() {

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/preguntas/5eefb311dad6de17e8afb29a",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(resp) {
            console.log(resp);
            renderizarSitio(resp);
        },
        async: false
    });

};
*/

function obtenerPreguntas() {

    socket.emit('obtenerPreguntas', function(resp) {
        renderizarSitio(resp);
        eventListener();
    })

}

function renderizarProgressBar(total) {

    var html = '';
    for (var i = 0; i < total; i++) {

        if (i == 0) {
            html += '<li class="active"></li>';
        } else {
            html += '<li></li>';
        }

    }

    progessBar.append(html);

}

function renderizarPreguntas(resp) {

    var html = '';

    var preguntas = resp.preguntas;

    for (var i = 0; i < preguntas.length; i++) {

        html += '<fieldset>';
        html += '        <h2 class="fs-title">Pregunta ' + (i + 1) + '</h2>';
        html += '        <h3 class="fs-subtitle">' + preguntas[i].descripcion + '</h3>';
        html += '        <textarea class="form-control" data-id="' + preguntas[i]._id + '" name="CAT_Custom" id="CAT_Custom_' + (i + 1) + '" rows="4" onkeydown="if(this.value.length>=4000)this.value=this.value.substring(0,3999);"></textarea>';

        if (i == 0 && preguntas.length > 1) {

            html += '        <input type="button" name="next" class="next action-button" value="Siguiente" />';

        } else if (i == preguntas.length - 1 && preguntas.length > 1) {

            html += '<input type="button" name="previous" class="previous action-button" value="Anterior" />';
            html += '<input type="submit" name="enviarForm" class="submit action-button" value="Finalizar" />';

        } else if (preguntas.length == 1) {

            html += '<input type="submit" name="enviarForm" class="submit action-button" value="Finalizar" />';

        } else {
            html += '<input type="button" name="previous" class="previous action-button" value="Anterior" />';
            html += '<input type="button" name="next" class="next action-button" value="Siguiente" />';

        }

        html += '</fieldset>';

    }

    divContenedor.append(html);

    var formEnviar = $('#msform');
    formEnviar.on('submit', function(e) {
        e.preventDefault();
        guardarRespuestas();
    });

};

function renderizarSitio(resp) {

    var totalItems = resp.total;
    renderizarProgressBar(totalItems);
    renderizarPreguntas(resp);

};


//guardar respuestas
function guardarRespuestas() {

    var objeto = [];
    var nombre = getQueryVariable('nombre');
    var respuestas = document.getElementsByName('CAT_Custom');
    for (var i = 0; i < respuestas.length; i++) {
        requestRespuestas.nombre = nombre;
        requestRespuestas.respuesta = respuestas[i].value;
        requestRespuestas.pregunta = respuestas[i].getAttribute('data-id');
        objeto.push(requestRespuestas);
        json = {
            "respuestas": objeto
        }
    }

    socket.emit('guardarRespuesta', json, function(resp) {

        console.log(resp);

    });



};


obtenerPreguntas();