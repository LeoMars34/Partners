import { ModalJunior } from "./ModalJunior";

function Modal({ props }) {
    return Object.keys(props.headers).map((indexId) => (
        <ModalJunior
            h={indexId}
            value={props.headers[indexId]}
            data={props.data}
        />
    ));
}

export { Modal };
