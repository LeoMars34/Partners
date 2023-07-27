function SearchFinancial({ searchList }) {
    console.log(searchList);
    return searchList.map((financials) => (
        <tr>
            <td>{financials.name}</td>
            <td>{financials.date_start}</td>
            <td>{financials.count}</td>
        </tr>
    ));
}
export { SearchFinancial };
