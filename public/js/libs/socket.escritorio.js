var socket = io();
var searchParams = new URLSearchParams(window.location.search);



//console.log(searchParams.getAll('escritorio'));
if(!searchParams.has('escritorio')){
    window.location="http://www.cristalab.com";
}
var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio: '+escritorio);

$('button').on('click',function() {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    console.log('click');
    socket.emit('atenderticket',{escritorio:escritorio},function (params) {
        console.log(params.ticket);
        if(params === 'no hay mas tickets'){
            alert('no hay mas tickkets');
            return;
        }
        $('small').text(params.numero);
    });
});







