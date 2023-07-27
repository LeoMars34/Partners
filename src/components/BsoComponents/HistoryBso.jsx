function HistoryBso(props) {
    const { id, status, date_at } = props;
    console.log(props);
    return (
        <tr data-id={id}>
            <td>{status.name}</td>
            <td>{date_at}</td>
        </tr>
    );
}

export { HistoryBso };
