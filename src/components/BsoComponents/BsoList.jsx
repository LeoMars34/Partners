import { getHistoryBso } from "../../api";

function BsoList(props) {
    const {
        id,
        agent,
        type,
        series,
        number,
        company,
        channel,
        date_add,
        setHistoryBsoList,
        status,
    } = props;

    return (
        <tr
            onClick={() => {
                getHistoryBso(id).then((data) => {
                    setHistoryBsoList(data.results);
                    document
                        .getElementById("changeStatusTable")
                        .classList.remove("table_none");
                });
            }}
            data-id={id}
        >
            <td>{agent.name}</td>
            <td>{type.name}</td>
            <td>{series}</td>
            <td>{number}</td>
            <td>{company.name}</td>
            <td>{channel.name}</td>
            <td>{date_add}</td>
            <td>{status}</td>
        </tr>
    );
}

export { BsoList };
