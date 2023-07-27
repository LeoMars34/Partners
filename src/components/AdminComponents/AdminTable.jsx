import { useEffect } from "react";
import {
    getTypeStock,
    deleteAdmin,
    getBanksStock,
    getChannelStock,
    getCompanyStock,
    getStatusStock,
} from "../../api";

function AdminTable(props) {
    const {
        id,
        name,
        text,
        setBsoCatalogChannel,
        setBanks,
        setBsoCatalogCompany,
        setBsoCatalogType,
        setBsoCatalogStatus,
    } = props;

    function deleteAdministration(event) {
        if (
            event.target.parentNode.parentNode.classList.contains("redBorder")
        ) {
            deleteAdmin(id, text).then((response) => {
                getChannelStock().then((data) => {
                    setBsoCatalogChannel(data.results);
                });

                getCompanyStock().then((data) => {
                    setBsoCatalogCompany(data.results);
                });
                getTypeStock().then((data) => {
                    setBsoCatalogType(data.results);
                });

                getBanksStock().then((data) => {
                    setBanks(data.results);
                });
                getStatusStock().then((data) => {
                    setBsoCatalogStatus(data.results);
                });
            });
        } else {
            event.target.parentNode.parentNode.classList.add("redBorder");
        }
    }
    /*Изменения инпутов таблиц */
    function saveAdminChange(e) {
        let bodyChange = {
            name: e.target.value,
        };
        if (text == "channel") {
            getChannelStock("", id, bodyChange).then((data) => {});
        }
        if (text == "company") {
            getCompanyStock("", id, bodyChange).then((data) => {});
        }
        if (text == "type") {
            getTypeStock("", id, bodyChange).then((data) => {});
        }
        if (text == "banks") {
            getBanksStock("", id, bodyChange).then((data) => {});
        }
        if (text == "sbv") {
            getStatusStock("", id, bodyChange).then((data) => {});
        }
    }
    useEffect(() => {
        document.getElementById(`${id}${text}`).value = name;
    }, []);

    return (
        <>
            <tr>
                <th>
                    <input
                        className="input table__input"
                        id={id + text}
                        type="text"
                        onBlur={saveAdminChange}
                    />
                    <button
                        onClick={deleteAdministration}
                        className="btn table__btn"
                    >
                        &#10006;
                    </button>
                </th>
            </tr>
        </>
    );
}

export { AdminTable };
