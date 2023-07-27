function BySells({ sells }) {
    return (
        <>
            <tr>
                <td>{sells.value}</td>
                <td>{sells.margin}</td>
                <td>{sells.average}</td>
                <td>{sells.middle_margin}</td>
            </tr>
        </>
    );
}
export { BySells };
