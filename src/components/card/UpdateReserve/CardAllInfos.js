import "../style.css";

const CardAllInfos = (props) => {

  console.log(props);

  var status = props.equipments.status; // deixando o card com a cor dinâmica

  return (

    <div className={`card event w-50 m-2 box-${status}`}>
      <div className="card-body">
        <h4 className="card-title">{props.equipments.equipment.name}</h4>
        <p className="card-text">Solicitante: <strong>{props.equipments.user.name}</strong></p>
        <p className="card-text">De: {`${props.equipments.starts_at.getDate()}/${props.equipments.starts_at.getMonth()}/${props.equipments.starts_at.getFullYear()}`} Horário: {props.equipments.starts_at.getHours()}:{props.equipments.starts_at.getMinutes()}</p>
        <p className="card-text">Até: {`${props.equipments.ends_at.getDate()}/${props.equipments.ends_at.getMonth()}/${props.equipments.ends_at.getFullYear()}`} Horário: {props.equipments.ends_at.getHours()}:{props.equipments.ends_at.getMinutes()}</p>
        <p className="card-text">Status da Reserva: <strong>{(status == "accepted" ? "Aprovada" : (status == "pending" ? "Pendente" : (status == "denied" ? "Negado" : null)))}</strong></p>

      </div>
    </div>

  )
}

export default CardAllInfos;