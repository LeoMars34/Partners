import { ModalSelect } from "./ModalSelect";

function ModalJunior(props) {
    const { h, value, data } = props;
    return (
        <tr>
            <td data-h={h} style={{ textAligsn: "left" }}>
                {value}
            </td>
            <td>
                <select name="" id="">
                    <option value="-">-</option>
                    <ModalSelect data={data} />
                </select>
            </td>
        </tr>
    );
}

export { ModalJunior };
