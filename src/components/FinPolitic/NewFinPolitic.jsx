import { deleteNewFinPolitic, getListFP } from "../../api";

function NewFinPolitic(props) {
    const { financial, setListFP, setNewFPS, count } = props;

    /*Удаление в сетки фин.политики */
    function deleteNewFP(event) {
        if (
            event.target.parentNode.parentNode.classList.contains("redBorder")
        ) {
            deleteNewFinPolitic(financial.id).then((response) => {
                getListFP().then((data) => {
                    setListFP(data);
                });
            });
        } else {
            event.target.parentNode.parentNode.classList.add("redBorder");
        }
    }
    /*Редактирование сетки фин.политики */
    function showNewRedactor() {
        document
            .getElementById("scroll-table-FP-new")
            .classList.remove("table_none");
        getListFP(financial.id).then((data) => {
            setNewFPS(data);
            document.getElementById("nameID").value = data.financial.name;
            document.getElementById("dateID").value = data.financial.date_start;
            document
                .getElementById("addFP")
                .setAttribute("data-financialId", financial.id);
        });
    }

    return (
        <>
            <tr>
                <td>{financial.name}</td>
                <td>{financial.date_start}</td>
                <td>{count}</td>
                <td>
                    <button
                        onClick={deleteNewFP}
                        className="btn container__btn"
                    >
                        &#10006;
                    </button>
                </td>
                <td className="">
                    <button
                        onClick={showNewRedactor}
                        className="btn container__btn"
                    >
                        &#9998;
                    </button>
                </td>
            </tr>
        </>
    );
}

export { NewFinPolitic };
