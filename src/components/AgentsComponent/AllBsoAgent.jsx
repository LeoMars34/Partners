function AllBsoAgent(props) {
    const { type, company, channel, agent } = props;
    return (
        <tr>
            <th>{type.name}</th>
            <th>{company.name}</th>
            <th>{channel.name}</th>
            <th>{agent}</th>
        </tr>
    );
}

export { AllBsoAgent };
