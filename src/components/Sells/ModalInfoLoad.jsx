import { Modal } from "./Modal";
import { SelectOptionMap } from "../BsoComponents/SelectOptionMap";
import { getAllAgents } from "../../api";
import { useState, useEffect, createElement } from "react";
import { loadNewPolicies, errorsPolicies } from "../../api";

function ModalLoadInfo({ activate, setActivate, props, alert }) {
    function loadFile() {
        const { data } = props;

        /*Валидация селектов загрузки с файла полюса*/
        let id = document.getElementById("tbodyModal").childNodes;
        let obj = {};
        let shlyaps = {};
        for (let i = 0; i < id.length; i++) {
            if (id[i].childNodes[1].childNodes[0].value === "-") {
                continue;
            }
            if (id[i].childNodes[1].childNodes[0].value in shlyaps) {
                shlyaps[id[i].childNodes[1].childNodes[0].value].count++;
                shlyaps[id[i].childNodes[1].childNodes[0].value].index.push(i);
            } else {
                shlyaps[id[i].childNodes[1].childNodes[0].value] = {
                    count: 1,
                    index: [i],
                };
                delete data[id[i].childNodes[1].childNodes[0].value];
            }

            obj[id[i].childNodes[1].childNodes[0].value] =
                id[i].childNodes[0].dataset.h;
        }

        for (const key in shlyaps) {
            if (shlyaps[key].count > 1) {
                shlyaps[key].index.map((ind) => {
                    id[ind].childNodes[1].childNodes[0].className = "shlypa";
                });
            } else {
                shlyaps[key].index.map((ind) => {
                    id[ind].childNodes[1].childNodes[0].classList.remove(
                        "shlypa"
                    );
                });
            }
        }

        let alert = document.querySelector(".alertShlypa");
        alert.classList.remove("alertShlypaHide");
        alert.innerHTML = "Осталось заполнить поля: <br>";

        for (const keys in data) {
            alert.innerHTML = alert.innerHTML + ` ${data[keys]}`;
        }

        obj["agent"] = document.getElementById("agentObj").value;

        if (
            document.querySelectorAll(".shlyapa").length === 0 ||
            data.length === 0
        )
            loadNewPolicies(obj).then((data) => {
                let cleanTable = document.getElementById("tfoot");
                cleanTable.innerHTML = "";

                let errors = document.querySelector(".divSucsses");
                errors.innerHTML = `Успешно загружено:  ${
                    Object.values(data)[0]
                }`;
                let sucsses = document.querySelector(".divErrors");
                sucsses.innerHTML = `Ошибок:  ${Object.values(data)[1]}`;
                let buttons = document.querySelector(".divButton");
                if (Object.values(data)[1] != 0) {
                    buttons.classList.remove("divButtonHide");
                }
            });
    }

    function loadErrors() {
        errorsPolicies().then((data) => {
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "policy.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    const [bsoCatalogAgents, setBsoCatalogAgents] = useState([]);
    useEffect(() => {
        getAllAgents().then((data) => {
            setBsoCatalogAgents(data);
        });
    }, []);

    if (props != "Error") {
        return (
            <div
                id="modalInfo"
                className={activate ? "modalInfo activate" : "modalInfo"}
                onClick={() => setActivate(false)}
            >
                <div
                    className={
                        activate
                            ? "modalInfoContent activate"
                            : "modalInfoContent"
                    }
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <div className="divSucsses"></div>{" "}
                        <div className="divErrors"></div>{" "}
                        <button onClick={loadErrors} className="btn btn_none">
                            Импортировать <br />
                            Ошибки
                        </button>
                    </div>
                    <table id="tfoot">
                        <div className="alertShlypaHide alertShlypa"></div>
                        <tbody id="tbodyModal">
                            <Modal props={props} />
                        </tbody>
                        <button
                            className="btn"
                            onClick={() => setActivate(false)}
                        >
                            Отменить
                        </button>
                        <button onClick={loadFile} className="btn">
                            Начать импорт
                        </button>
                        <select className="select" id="agentObj">
                            <option value="">Агент</option>
                            <SelectOptionMap props={bsoCatalogAgents} />
                        </select>
                    </table>
                </div>
            </div>
        );
    }
}
export { ModalLoadInfo };
