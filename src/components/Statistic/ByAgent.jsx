import { Link } from "react-router-dom";

function ByAgent(props) {
    const {
        agent,
        count,
        value,
        commission_all,
        commission_agent,
        commission_my,
    } = props;

    return (
        <>
            <tr>
                <td id={agent.id}>
                    <Link className="link" to={`/AgentCard/${agent.id}`}>
                        {agent.name}
                    </Link>
                </td>
                <td>{count}</td>
                <td>{value}</td>
                <td>{commission_all}</td>
                <td>{commission_agent}</td>
                <td>{commission_my}</td>
            </tr>
        </>
    );
}

export { ByAgent };
