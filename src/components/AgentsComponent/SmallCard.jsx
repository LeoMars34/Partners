import { Link } from "react-router-dom";

function SmallCard(props) {
    const { id, logo, name, date_at, email, phone } = props;

    return (
        <>
            <form className="form">
                <h3 className="container-agents-cards form__h3">{name}</h3>

                <p className="form__p">
                    Телефон:
                    <div> {phone} </div>
                </p>
                <p className="form__p">
                    <div>Почта:</div>
                    {email}
                </p>
                <p className="form__p">
                    <div>Зарегестрирован:</div>
                    {date_at}
                </p>
                <button className="container-agents-cards btn form__btn_small">
                    <Link className="link" to={`/agents/AgentCard/${id}`}>
                        Подробнее
                    </Link>
                </button>
                <img src={logo} alt="logo" className="logo form__logo" />
            </form>
        </>
    );
}

export { SmallCard };
