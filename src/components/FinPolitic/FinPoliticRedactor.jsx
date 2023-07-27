import { useState, useEffect } from "react";
import {
    redactorComissionAgent,
    deleteRedactopFinPolitic,
    getListFP,
} from "../../api";

function FinPoliticRedactor(props) {
    const {
        commission_agent,
        commission_input,
        id,
        setListFP,

        setNewFPS,
    } = props;

    const [val1 = commission_agent, setVal1] = useState();

    useEffect(() => setVal1(val1), [val1]);

    /*Изменение комиссии агента */
    function changeAgentComission() {
        let newAgentComission = {
            commission_agent: document.getElementById("agentComission").value,
        };

        redactorComissionAgent(newAgentComission, id).then((data) => {});
    }
    /*Удаление из сетки фин.политики */
    function deleteNewFP(event) {
        if (
            event.target.parentNode.parentNode.classList.contains("redBorder")
        ) {
            deleteRedactopFinPolitic(id).then((response) => {
                getListFP().then((data) => {
                    setListFP(data);
                });

                getListFP(
                    document.getElementById("addFP").dataset.financialid
                ).then((data) => {
                    setNewFPS(data);
                });
            });
        } else {
            event.target.parentNode.parentNode.classList.add("redBorder");
        }
    }

    return (
        <tr>
            <td>{commission_input.type_policy.name}</td>
            <td>{commission_input.channel.name}</td>
            <td>{commission_input.date_start}</td>
            <td>{commission_input.company.name}</td>
            <td>{commission_input.value}</td>{" "}
            <td>
                <input
                    className="input"
                    id="agentComission"
                    step={0.01}
                    type="number"
                    value={val1}
                    onChange={(ev) => setVal1(ev.target.value)}
                    onBlur={changeAgentComission}
                />
            </td>
            <td>{commission_input.bank ? commission_input.bank.name : ""}</td>
            <td>
                <button onClick={deleteNewFP} className="btn container__btn">
                    &#10006;
                </button>
            </td>
        </tr>
    );
}
export { FinPoliticRedactor };
