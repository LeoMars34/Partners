function SearchSales({ searchList }) {
    if (searchList) {
        return searchList.map((sales) => (
            <tr>
                <td>{sales.type.name}</td>
                <td>{sales.channel.name}</td>
                <td>{sales.company.name}</td>
                <td>{sales.agent.name}</td>
                <td>{sales.policy}</td>
                <td>{sales.date_registration}</td>
                <td>{sales.date_start}</td>
                <td>{sales.date_end}</td>
            </tr>
        ));
    } else return;
}

export { SearchSales };
