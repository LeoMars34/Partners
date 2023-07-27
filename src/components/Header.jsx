import { Link } from "react-router-dom";

function Header() {
    return (
        <nav>
            <img src="/static/smallLogo.png" alt="InsFamily" />
            <ul>
                <li className="large material-icons">
                    account_box
                    <Link className="link__navigate" to={"/agents/Agent"}>
                        Агенты
                    </Link>
                </li>
                <li className="large material-icons">
                    assignment
                    <Link className="link__navigate" to={"/agents/Bso"}>
                        Работа с БСО
                    </Link>
                </li>
                <li className="large material-icons">
                    attach_money
                    <Link className="link__navigate" to={"/agents/Sales"}>
                        Продажи
                    </Link>
                </li>
                <li className="large material-icons">
                    business_center
                    <Link className="link__navigate" to={"/agents/FinPolitic"}>
                        Фин.политика
                    </Link>
                </li>
                <li className="large material-icons">
                    {" "}
                    assessment
                    <Link className="link__navigate" to={"/agents/Statistic"}>
                        Статистика
                    </Link>
                </li>
                <li className="large material-icons">
                    account_balance
                    <Link
                        className="link__navigate"
                        to={"/agents/Administration"}
                    >
                        Администрирование
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export { Header };
