import { Link } from "react-router-dom";

function SearchAgent({ searchList }) {
    if (searchList) {
        return searchList.map((agents) => (
            <tr>
                <Link className="link" to={`/agents/AgentCard/${agents.id}`}>
                    {agents.name}
                </Link>
            </tr>
        ));
    } else return;
}

export { SearchAgent };
