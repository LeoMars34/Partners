function SalesAgent(props) {
    const {
        agent,
        count,
        value,
        commission_all,
        commission_agent,
        commission_my,
    } = props;

    return (
        <tr>
            <td>{agent.name}</td>
            <td>{count}</td>
            <td>{value}</td>
            <td>{commission_all}</td>
            <td>{commission_agent}</td>
            <td>{commission_my}</td>
        </tr>
    );
}

export { SalesAgent };
