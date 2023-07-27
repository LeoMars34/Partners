function BsoAgent(props) {
    const { type, series, number, company, channel, date_add, status } = props;

    return (
        <tr>
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

export { BsoAgent };
