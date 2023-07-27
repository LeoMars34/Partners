function SearchBso({ searchList }) {
    if (searchList) {
        return searchList.map((bso) => (
            <tr>
                <td>{bso.agent.name}</td>
                <td>{bso.type.name}</td>
                <td>{bso.company.name}</td>
                <td>{bso.channel.name}</td>
                <td>{bso.series}</td>
                <td>{bso.number}</td>
                <td>{bso.date_add}</td>
            </tr>
        ));
    } else return;
}
export { SearchBso };
