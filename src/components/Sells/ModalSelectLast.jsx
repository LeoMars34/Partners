function ModalSelectLast(props) {
    const { item, value } = props;

    return (
        <>
            <option value={item}>{value}</option>
        </>
    );
}

export { ModalSelectLast };
