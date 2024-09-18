
export class Reservas {
    constructor(id, id_user, id_item, id_equipamento, tipo_item, data_reserva, hora_inicio, hora_fim, status_reserva ) {
        this.id = id;
        this.id_user = id_user;
        this.id_item = id_item;
        this.id_equipamento = id_equipamento;
        this.tipo_item = tipo_item;
        this.data_reserva = data_reserva;
        this.hora_inicio = hora_inicio;
        this.hora_fim = hora_fim;
        this.status_reserva = status_reserva;
    }

    
}