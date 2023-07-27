import { NewFinPolitic } from "./NewFinPolitic";

function NewFinPoliticList({ listFP, setListFP, setNewFPS }) {
    return listFP.map((data) => (
        <NewFinPolitic
            key={data.id}
            {...data}
            setListFP={setListFP}
            setNewFPS={setNewFPS}
        />
    ));
}

export { NewFinPoliticList };
