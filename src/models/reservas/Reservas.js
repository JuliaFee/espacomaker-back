
export default class Reservas {
    constructor(id, id_user, id_ferramenta, id_impressora, data_reserva, hora_inicio, hora_fim, status_reserva) {
        this.id = id;
        this.id_user = id_user;
        this.id_ferramenta = id_ferramenta;
        this.id_impressora = id_impressora;
        this.data_reserva = data_reserva;
        this.hora_inicio = hora_inicio;
        this.hora_fim = hora_fim;
        this.status_reserva = status_reserva;
    }

    
}
