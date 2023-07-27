import {
    deleteFinPolitic,
    getFinPoliticList,
    redactorFinPolitic,
} from "../../api";

function FinPolitic(props) {
    const {
        type_policy,
        company,
        channel,
        date_start,
        value,
        bank,
        id,
        setFPlitic,
    } = props;

    /*Удаление входящей комиссии */
    function deleteFP(event) {
        if (
            event.target.parentNode.parentNode.classList.contains("redBorder")
        ) {
            deleteFinPolitic(id).then(() => {
                getFinPoliticList().then((data) => {
                    setFPlitic(data.results);
                });
            });
        } else {
            event.target.parentNode.parentNode.classList.add("redBorder");
        }
    }
    /*Добавление таблицы редактирования входящей комиссии */
    function showRedactor() {
        document
            .getElementById("redactorTableId")
            .classList.remove("table_none");

        redactorFinPolitic(id).then((data) => {
            document
                .getElementById("redactorTableId")
                .setAttribute("data-id", data.id);
            document.getElementById("select_One").value = data.type_policy.id;
            document.getElementById("select_Two").value = data.channel.id;
            document.getElementById("select_Three").value = data.company.id;
            document.getElementById("input_Date").value = data.date_start;
            document.getElementById("input_Comission").value = data.value;
            if (data.bank != null) {
                document
                    .getElementById("select_Four")
                    .classList.remove("table_none");
                document.getElementById("select_Four").value = data.bank.id;
            } else {
                document
                    .getElementById("select_Four")
                    .classList.add("table_none");
                document.getElementById("select_Four").value = 0;
            }
        });
    }

    return (
        <>
            <tr data-id={id}>
                <td>{type_policy.name}</td>
                <td>{channel.name}</td>
                <td>{company.name}</td>
                <td>{date_start}</td>
                <td>{value}</td>
                <td>{bank ? bank.name : ""}</td>
                <td>
                    <button onClick={deleteFP} className="btn container__btn">
                        &#10006;
                    </button>
                </td>
                <td>
                    <button
                        onClick={showRedactor}
                        className="btn container__btn"
                    >
                        &#9998;
                    </button>
                </td>
            </tr>
        </>
    );
}

export { FinPolitic };
