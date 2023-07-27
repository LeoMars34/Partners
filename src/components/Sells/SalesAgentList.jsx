import { SalesAgent } from "./SalesAgent";

function SalesAgentList({ statistic }) {
    return statistic.map((card) => <SalesAgent key={card.id} {...card} />);
}

export { SalesAgentList };
