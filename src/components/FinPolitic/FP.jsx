function FP(props) {
    const { financial, propsFinancial } = props;

    if (propsFinancial && propsFinancial.id == financial.id) {
        return (
            <option selected value={financial.id}>
                {" "}
                {financial.name}
            </option>
        );
    } else {
        return <option value={financial.id}> {financial.name}</option>;
    }
}

export { FP };
