export class ReservasRepository {
    constructor() {
      this.reservas = [];
    }
  
    getReserva() {
      return this.reservas;
    }
  
    getReservaById(id) {
      return this.reservas.find((reserva) => reserva.id === id);
    }
  
    addReserva(reserva) {
      this.reservas.push(reserva);
    }
  
    updateReserva(id, id_user, id_ferramenta, id_impressora, data_reserva, hora_inicio, hora_fim, status_reserva) {
      const reserva = this.getReservaById(id);

      if (reserva) {
        reserva.id_user = id_user;
        reserva.id_ferramenta = id_ferramenta;
        reserva.id_impressora = id_impressora;
        reserva.data_reserva = data_reserva;
        reserva.hora_inicio = hora_inicio;
        reserva.hora_fim = hora_fim;
        reserva.status_reserva = status_reserva;
      }
      
      return reserva;
    }
  
    deleteReserva(id) {
      this.reservas = this.reservas.filter((reserva) => reserva.id !== id);
    }
  }
  