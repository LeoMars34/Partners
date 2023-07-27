import { FinPoliticRedactor } from "./FinPoliticRedactor";

function FinPoliticListRedactor({ newFPS, setNewFPS, setListFP }) {
    if ("data" in newFPS) {
        return newFPS.data.map((data) => (
            <FinPoliticRedactor
                key={data.id}
                {...data}
                setNewFPS={setNewFPS}
                newFPS={newFPS}
                setListFP={setListFP}
            />
        ));
    }
}

export { FinPoliticListRedactor };
