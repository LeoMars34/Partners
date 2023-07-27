import { ModalSelectLast } from "./ModalSelectLast";

function ModalSelect(props) {
    const { data } = props;

    return Object.keys(data).map((item) => (
        <ModalSelectLast item={item} value={data[item]} />
    ));
}

export { ModalSelect };
