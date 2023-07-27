import { SalesBso } from "./SalesBso";

function SalesBsoList({ policies }) {
    return policies.map((card) => <SalesBso key={card.id} {...card} />);
}

export { SalesBsoList };
