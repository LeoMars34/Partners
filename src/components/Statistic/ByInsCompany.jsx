function ByInsCompany(props) {
    let keys = Object.keys(props)[0];
    let data = Object.values(props)[0];

    return (
        <tr>
            <td>{keys}</td>
            <td>{data.count}</td>
            <td>{data.value}</td>
            <td>{data.osago_value}</td>
            <td>{data.osago_percent}</td>
            <td>{data.other_value}</td>
            <td>{data.other_percent}</td>
        </tr>
    );
}
export { ByInsCompany };
