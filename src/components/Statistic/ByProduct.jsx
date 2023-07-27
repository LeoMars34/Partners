function ByProduct(props) {
    let keys = Object.keys(props)[0];
    let data = Object.values(props)[0];

    return (
        <tr>
            <td>{keys}</td>
            <td>{data.count}</td>
            <td>{data.value}</td>
            <td>{data.average}</td>
            <td>{data.margin}</td>
            <td>{data.middle_margin}</td>
        </tr>
    );
}
export { ByProduct };
