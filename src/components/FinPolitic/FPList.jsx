import { FP } from "./FP";

function FPList({ listFP, financial }) {
    return listFP.map((data) => (
        <FP key={data.id} {...data} propsFinancial={financial} />
    ));
}

export { FPList };
