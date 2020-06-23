var btnSubmit = $('#btnSubmit');

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
};


function validarNombre() {
    if ($('#nombre').val().trim() == "") {

        return false;
    }
    return true;
}

$('#formIndex').on('submit', function(event) {

    if (!validarNombre()) {
        return false;
    }

});