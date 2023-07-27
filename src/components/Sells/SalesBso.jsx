import { Link } from "react-router-dom";

function SalesBso(props) {
    const {
        id,
        agent,
        type,
        company,
        channel,
        policy,
        date_end,
        date_registration,
        date_start,
        agent_commission,
        agent_rub,
        input_com,
        input_rub,
        margin_percent,
        margin,
    } = props;

    return (
        <tr>
            <td>
                <Link to={`/agents/SalesCard/${id}`} className=" link_td">
                    {type.name}{" "}
                </Link>
            </td>
            <td>{channel.name}</td>
            <td>{company.name}</td>
            <td>{agent.name}</td>
            <td>{policy}</td>
            <td>{date_registration}</td>
            <td>{date_start}</td>
            <td>{date_end}</td>
            <td>{agent_commission}</td>
            <td>{agent_rub}</td>
            <td>{input_com}</td>
            <td>{input_rub}</td>
            <td>{margin_percent}</td>
            <td>{margin}</td>
        </tr>
    );
}

export { SalesBso };
