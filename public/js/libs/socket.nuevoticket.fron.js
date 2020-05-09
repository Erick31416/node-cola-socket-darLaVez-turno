//comando para establecer la comunicación
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect',function(){
    console.log('conectado con el servidor');
});
socket.on('disconnect',function(){
    console.log('Usuario desconectado.');
});

socket.on('estadoActual',function(data){
    label.text(data.actual);
});



$('button').on('click',function() {
    console.log('click');
    socket.emit('siguienteticket',null,function (params) {
        console.log({params});
        label.text(params);
        //console.log(params.siguiente);
    });
});
socket.on('enviarMensaje',function(data){
    console.log(data);
});
