import { FinPolitic } from "./FinPolitic";

function FinPoliticList({ finPoliticList, setFPlitic }) {
    return finPoliticList.map((data) => (
        <FinPolitic key={data.id} {...data} setFPlitic={setFPlitic} />
    ));
}

export { FinPoliticList };
