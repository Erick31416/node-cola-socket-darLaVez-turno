var socket = io();


var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var ticketArray = [ lblTicket1,lblTicket2,lblTicket3,lblTicket4];
var escritorioArray = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];



socket.on('estadoActual',function(data){
    ultimos4 = data.ultimos4;
    console.log({data});
    recargarhtml(ultimos4);
    
});
socket.on('ultimos4',function(data){
    console.log(data);
    recargarhtml(data.ultimos4);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
});


function recargarhtml (ultimos4) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    
    
    for (let i = 0; i < ultimos4.length; i++) {
        ticketArray[i].html(ultimos4[i].numero);
        escritorioArray[i].html('Escritorio :'+ultimos4[i].escritorio);
    }

}
