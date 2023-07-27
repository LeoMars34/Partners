import { FPList } from "./FPList";
import { addFpToAgent } from "../../api";

function AgentFP(props) {
    const { name, listFP, id, financial } = props;

    function addFP(e) {
        let newAgentFP = {
            nf: e.target.value,
        };

        addFpToAgent(newAgentFP, id).then((response) => {});
    }

    return (
        <>
            <tr>
                <td>{name}</td>
                <td>
                    <select className="select" onChange={addFP}>
                        <option value="0"></option>
                        <FPList listFP={listFP} financial={financial} />
                    </select>
                </td>
            </tr>
        </>
    );
}

export { AgentFP };
