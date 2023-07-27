import { ByAgent } from "./ByAgent";

function ByAgentList({ agent }) {
    return agent.map((data) => <ByAgent key={data.id} {...data} />);
}

export { ByAgentList };
