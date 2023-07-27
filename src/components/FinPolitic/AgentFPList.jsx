import { AgentFP } from "./AgentFP";

function AgentFPList({ allAgents, listFP }) {
    return allAgents.map((data) => (
        <AgentFP key={data.id} {...data} listFP={listFP} />
    ));
}

export { AgentFPList };
