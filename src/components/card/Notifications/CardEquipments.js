import "../style.css";

const CardNotifications = (props) => {

  console.log(props);



  return (

    <div className={`card event w-100 m-2 box-blue`}>
      <div className="card-body">
        <h4 className="card-title">{props.notification.body}</h4>
        {/* <p className="card-text">Solicitante: <strong>{props.reserve.user.name}</strong></p>
        <p className="card-text">Data: {`${props.reserve.starts_at.getDate()}/${props.reserve.starts_at.getMonth()}/${props.reserve.starts_at.getFullYear()}`} Horário: {props.reserve.starts_at.getHours()}:{props.reserve.starts_at.getMinutes()}</p>
        <p className="card-text">Status da Reserva: <strong>{(status == "accepted" ? "Aprovada" : (status == "pending" ? "Pendente" : (status == "denied" ? "Negado" : null)))}</strong></p> */}

      </div>
    </div>

  )
}

export default CardNotifications;