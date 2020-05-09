const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteticket',(data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(
            siguiente
            );
    });
    client.emit('estadoActual', {
        actual:ticketControl.getUltimoticket(),
        ultimos4:ticketControl.getUltimos4(),
    });
    client.on('atenderticket',(data,callback)=>{
        console.log('atinede');
        if(!data.escritorio){
            return callback ({
                err: true,
                msg:'No se ha recibido escritorio'
            })
        }
        let atenderticket = ticketControl.atenderTicket(data.escritorio);
        //client.emit('estadoActual', {
        //    actual:ticketControl.getUltimoticket(),
        //    ultimos4:ticketControl.getUltimos4(),
        //});
        callback (atenderticket);
        client.broadcast.emit('ultimos4',{ultimos4:ticketControl.getUltimos4()});
    });

        
});

/* client.emit('enviarMensaje', {
    usuario: 'Administrador',
    mensaje: 'Bienvenido a esta aplicación'
});
client.on('disconnect', () => {});
// Escuchar el cliente
client.on('enviarMensaje', (data, callback) => {
    client.broadcast.emit('enviarMensaje', data);
    // if (mensaje.usuario) {
    //     callback({
    //         resp: 'TODO SALIO BIEN!'
    //     });
    // } else {
    //     callback({
    //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     });
    // }
}); */