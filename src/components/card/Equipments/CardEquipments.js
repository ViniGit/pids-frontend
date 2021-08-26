import "../style.css";

const CardEquipments = (props) => {

  console.log(props);

  var status = props.reserve.status; // deixando o card com a cor dinâmica
  props.reserve.starts_at = new Date(props.reserve.starts_at); //pegando o time stamp e transformando e data
  props.reserve.ends_at = new Date(props.reserve.ends_at);

  return (

    <div className={`card event w-50 m-2 box-${status}`}>
      <div className="card-body">
        <h4 className="card-title">{props.reserve.equipment.name}</h4>
        <p className="card-text">Solicitante: <strong>{props.reserve.user.name}</strong></p>
        <p className="card-text">De: {`${props.reserve.starts_at.getDate()}/${props.reserve.starts_at.getMonth()}/${props.reserve.starts_at.getFullYear()}`} Horário: {props.reserve.starts_at.getHours()}:{props.reserve.starts_at.getMinutes()}</p>
        <p className="card-text">Até: {`${props.reserve.ends_at.getDate()}/${props.reserve.ends_at.getMonth()}/${props.reserve.ends_at.getFullYear()}`} Horário: {props.reserve.ends_at.getHours()}:{props.reserve.ends_at.getMinutes()}</p>
        <p className="card-text">Status da Reserva: <strong>{(status == "accepted" ? "Aprovada" : (status == "pending" ? "Pendente" : (status == "denied" ? "Negado" : null)))}</strong></p>

      </div>
    </div>

  )
}

export default CardEquipments;