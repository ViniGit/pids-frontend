import "../style.css";

const CardRooms = (props) => {

  var status = props.room.status; // deixando o card com a cor dinâmica

  return (

    <div className={`card event w-50 m-2 box-${status}`}>
      <div className="card-body">
        <h4 className="card-title">{props.room.room.name}</h4>
        <p className="card-text">Tipo da sala: <strong>{(props.room.room.type == "lab" ? "Laboratório" : (props.room.room.type == "auditorium" ? "Auditório" : (props.room.room.type == "room" ? "Sala" : null)))}</strong></p>
        <p className="card-text">Solicitante: <strong>{props.room.user.name}</strong></p>
        <p className="card-text">De: {`${props.room.starts_at.getDate()}/${props.room.starts_at.getMonth()}/${props.room.starts_at.getFullYear()}`} Horário: {props.room.starts_at.getHours()}:{props.room.starts_at.getMinutes()}</p>
        <p className="card-text">Até: {`${props.room.ends_at.getDate()}/${props.room.ends_at.getMonth()}/${props.room.ends_at.getFullYear()}`} Horário: {props.room.ends_at.getHours()}:{props.room.ends_at.getMinutes()}</p>
        <p className="card-text">Status da Reserva: <strong>{(status == "accepted" ? "Aprovada" : (status == "pending" ? "Pendente" : (status == "denied" ? "Negado" : null)))}</strong></p>
      </div>
    </div>

  )
}

export default CardRooms;