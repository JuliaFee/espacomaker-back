export default class Reserva_Ferramenta {
    constructor(id_user, id_ferramenta, id_horario, data_reserva, status_reserva) {
        this.id_user = id_user;
        this.id_ferramenta = id_ferramenta;
        this.id_horario = id_horario; 
        this.data_reserva = data_reserva;
        this.status_reserva = status_reserva;
    }
}
