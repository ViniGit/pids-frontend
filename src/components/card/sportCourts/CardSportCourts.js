import "../style.css";

const CardSportCourts = (props) => {

  var status = props.sportCourts.status; // deixando o card com a cor dinâmica

  return (

    <div className={`card event w-50 m-2 box-${status}`}>
      {/* <a href="/admin/index" className="link" > */}
      <div className="card-body">
        <h4 className="card-title">{props.sportCourts.sport_court.name}</h4>
        <p className="card-text">Solicitante: <strong>{props.sportCourts.user.name}</strong></p>
        <p className="card-text">De: {`${props.sportCourts.starts_at.getDate()}/${props.sportCourts.starts_at.getMonth()}/${props.sportCourts.starts_at.getFullYear()}`} Horário: {props.sportCourts.starts_at.getHours()}:{props.sportCourts.starts_at.getMinutes()}</p>
        <p className="card-text">Até: {`${props.sportCourts.ends_at.getDate()}/${props.sportCourts.ends_at.getMonth()}/${props.sportCourts.ends_at.getFullYear()}`} Horário: {props.sportCourts.ends_at.getHours()}:{props.sportCourts.ends_at.getMinutes()}</p>
        <p className="card-text">Status da Reserva: <strong>{(status == "accepted" ? "Aprovada" : (status == "pending" ? "Pendente" : (status == "denied" ? "Negado" : null)))}</strong></p>
      </div>
      {/* </a> */}
    </div>

  )
}

export default CardSportCourts;