const fs = require('fs');

class Ticket {
    constructor (numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    
    constructor(){
        console.log('consotrubot');
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        
        let data = require('../data/data.json');

        if (data.hoy == this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
        }else{
            this.reiniciaSistema();
        }
    }
    reiniciaSistema()  {
        this.tickets = [];
        this.ultimo = 0;
        this.grabarArchivo();
    }
    siguiente(){
        let siguiente = this.ultimo + 1;
        this.ultimo = siguiente;
        console.log('grabar');
        this.grabarArchivo();
        const ticket = new Ticket(siguiente,null);
        this.tickets.push(ticket);
        return `Ticket ${siguiente}`;
    }
    getUltimoticket(){
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4(){
        return  this.ultimos4;
    }
    grabarArchivo(){

        let jsonData = {
            hoy: this.hoy,
            ultimo: this.ultimo,
            tickets: this.tickets
        }
        
        let stringJson = JSON.stringify(jsonData);
        console.log('antes del error');
        fs.writeFileSync('./server/data/data.json',stringJson);
        //console.log('antes del error');
    }
    atenderTicket(escritorio){

        console.log('entra en atender ticktes');
        if (this.tickets.length === 0){
            console.log('hay cero tickets');
            return 'no hay ticket para atender';
        }
        console.log('array de tickets');
        console.log(this.tickets[0]);
        let numero = this.tickets[0].numero;
        //elimina el primer elemento del array , y lo devuelve.
        this.tickets.shift();
        let atenderTicket = new Ticket (numero,escritorio);
        //unsif debe de añadir al principio del arrayu
        this.ultimos4.unshift(atenderTicket);
        if(this.ultimos4.length > 4){
            var ultimos4 = this.ultimos4;
            console.log({ultimos4});
            this.ultimos4.splice(-1,1)
        }
        console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }
}
module.exports = {
    TicketControl
}
//{"hoy":9,"ultimo":7,"tickets":[{"numero":5,"escritorio":null},{"numero":6,"escritorio":null},{"numero":7,"escritorio":null}]}