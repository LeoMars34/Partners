import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
    getAllBsoStock,
    getChannelStock,
    getCompanyStock,
    getTypeStock,
    getAllAgents,
    getBsoList,
    getStatusBso,
    addPolicies,
    getPolicies,
    editingPolicie,
    getPolicyHistory,
} from "../api";
import { SelectOptionMap } from "../components/BsoComponents/SelectOptionMap";
import { StatusBsoInputList } from "../components/BsoComponents/StatusBsoInputList";
import { HistoryListBso } from "../components/BsoComponents/HistoryListBso";

function SalesCard() {
    const [bsoCatalog, setBsoCatalog] = useState([]);
    const [bsoCatalogType, setBsoCatalogType] = useState([]);
    const [bsoCatalogChannel, setBsoCatalogChannel] = useState([]);
    const [bsoCatalogCompany, setBsoCatalogCompany] = useState([]);
    const [bsoCatalogAgents, setBsoCatalogAgents] = useState([]);
    const [bsoList, setBsoList] = useState([]);
    const [historyBsoList, setHistoryBsoList] = useState([]);
    const [statusBso, setStatusBso] = useState([]);
    const [policiesType, setPoliciesType] = useState();
    const [policiesAgent, setPoliciesAgent] = useState();
    const [policiesCompany, setPoliciesCompany] = useState();
    const [policiesChannel, setPoliciesChannel] = useState();
    const [policiesStatus, setPoliciesStatus] = useState();
    const [policiesSeries, setPoliciesSeries] = useState();
    const [policiesNumber, setPoliciesNumber] = useState();
    const [policiesClient, setPoliciesClient] = useState();
    const [policiesTypeClient, setPoliciesTypeClient] = useState();
    const [policiesDateRegistration, setPoliciesDateRegistration] = useState();
    const [policiesDateStart, setPoliciesDateStart] = useState();
    const [policiesDateEnd, setPoliciesDateEnd] = useState();
    const [policiesTypePay, setPoliciesTypePay] = useState();
    const [policiesPrice, setPoliciesPrice] = useState();
    const [policiesAgentComission, setPoliciesAgentComission] = useState();
    const [policiesInputComission, setPoliciesInputComission] = useState();
    const [comissionAgentRub, setComissionAgentRub] = useState();
    const [comissionInputRub, setComissionInputRub] = useState();
    const [margin, setMargin] = useState();
    const [marginPercent, setMarginPercent] = useState();
    const { id } = useParams();

    useEffect(() => {
        {
            getAllBsoStock().then((data) => {
                setBsoCatalog(data.results);
            });

            getChannelStock().then((data) => {
                setBsoCatalogChannel(data.results);
            });
            getCompanyStock().then((data) => {
                setBsoCatalogCompany(data.results);
            });
            getTypeStock().then((data) => {
                setBsoCatalogType(data.results);
            });
            getAllAgents().then((data) => {
                setBsoCatalogAgents(data);
            });

            getBsoList().then((data) => {
                setBsoList(data.results);
            });

            getStatusBso().then((data) => {
                setStatusBso(data.results);
            });

            getPolicies(id).then((data) => {
                let series = "";
                let number = "";
                if (data.policy.split(" ").length === 1) {
                    number = data.policy.split(" ")[0];
                } else {
                    series = data.policy.split(" ")[0];
                    number = data.policy.split(" ")[1];
                }
                setComissionInputRub(data.input_rub);
                setMargin(data.margin);
                setMarginPercent(data.margin_percent);
                setComissionAgentRub(data.agent_rub);
                setPoliciesAgentComission(data.agent_commission);
                setPoliciesInputComission(data.input_com);
                setPoliciesType(data.type.id);
                setPoliciesAgent(data.agent.id);
                setPoliciesCompany(data.company.id);
                setPoliciesChannel(data.channel.id);
                setPoliciesSeries(series);
                setPoliciesNumber(number);
                setPoliciesClient(data.client);
                setPoliciesTypeClient(data.type_client);
                setPoliciesDateRegistration(data.date_registration);
                setPoliciesDateStart(data.date_start);
                setPoliciesDateEnd(data.date_end);
                setPoliciesTypePay(data.type_pay);
                setPoliciesPrice(data.price);
                getPolicyHistory(id).then((data) => {
                    setHistoryBsoList(data.results);
                    let lastElement = data.results[data.results.length - 1];
                    document.getElementById("selectStatus").value =
                        lastElement.status.id;
                });
            });
        }
    }, []);

    /*Валидация поля Страхователь */
    function validate() {
        document.getElementById("inputClient").value = document
            .getElementById("inputClient")
            .value.replace(/[^a-zA-Zа-яА-Я\s]/g, "");
    }

    /*Функция сохранения изменений полиса */
    function editPolicie() {
        const salesCardArray = {
            type: policiesType,
            agent: policiesAgent,
            company: policiesCompany,
            channel: policiesChannel,
            status: policiesStatus,
            series: policiesSeries,
            number: policiesNumber,
            client: policiesClient,
            type_client: policiesTypeClient,
            date_registration: policiesDateRegistration,
            date_start: policiesDateStart,
            date_end: policiesDateEnd,
            type_pay: policiesTypePay,
            price: policiesPrice,
            agent_commission: policiesAgentComission,
            input_com: policiesInputComission,
        };
        editingPolicie(id, salesCardArray).then((data) => {});
        getPolicyHistory(id).then((data) => {
            setHistoryBsoList(data.results);
            let lastElement = data.results[data.results.length - 1];
            document.getElementById("selectStatus").value =
                lastElement.status.id;
        });
    }
    /*Изменения значений select и input*/
    function handleChange() {
        setPoliciesType(document.getElementById("selectType").value);
        setPoliciesAgent(document.getElementById("selectAgents").value);
        setPoliciesCompany(document.getElementById("selectCompany").value);
        setPoliciesChannel(document.getElementById("selectChannel").value);
        setPoliciesStatus(document.getElementById("selectStatus").value);
        setPoliciesSeries(document.getElementById("inputSeries").value);
        setPoliciesNumber(document.getElementById("inputNumber").value);
        setPoliciesClient(document.getElementById("inputClient").value);
        setPoliciesTypeClient(
            document.getElementById("selectTypeClient").value
        );
        setPoliciesDateRegistration(
            document.getElementById("inputDateRegistration").value
        );
        setPoliciesDateStart(document.getElementById("inputDateStart").value);
        setPoliciesDateEnd(document.getElementById("inputDateEnd").value);
        setPoliciesTypePay(document.getElementById("selectTypePays").value);
        setPoliciesPrice(document.getElementById("inputPrice").value);
        setPoliciesAgentComission(
            document.getElementById("policiesAgentComission").value
        );

        setPoliciesInputComission(
            document.getElementById("policiesInputComission").value
        );
    }

    /*Функция создания нового полиса */
    function olala() {
        const salesCardArray = {
            type: document.getElementById("selectType").value,
            agent: document.getElementById("selectAgents").value,
            company: document.getElementById("selectCompany").value,
            channel: document.getElementById("selectChannel").value,
            status: document.getElementById("selectStatus").value,
            series: document.getElementById("inputSeries").value,
            number: document.getElementById("inputNumber").value,
            client: document.getElementById("inputClient").value,
            type_client: document.getElementById("selectTypeClient").value,
            date_registration: document.getElementById("inputDateRegistration")
                .value,
            date_start: document.getElementById("inputDateStart").value,
            date_end: document.getElementById("inputDateEnd").value,
            type_pay: document.getElementById("selectTypePays").value,
            price: document.getElementById("inputPrice").value,
            agent_commission: document.getElementById("policiesAgentComission")
                .value,
            input_com: document.getElementById("policiesInputComission").value,
        };
        /*Добавление нового полиса*/
        addPolicies(salesCardArray).then((data) => {
            if (data.message === "полис с таким номером уже есть в базе") {
                document
                    .getElementById("dataMessageYes")
                    .classList.remove("btn_none");
                document
                    .getElementById("dataMessageNo")
                    .classList.add("btn_none");
            } else {
                document
                    .getElementById("dataMessageNo")
                    .classList.remove("btn_none");
                document
                    .getElementById("dataMessageYes")
                    .classList.add("btn_none");
            }
        });
    }

    return (
        <>
            <div id="salesTable" className="container">
                <table className="table container__table">
                    <tbody>
                        <tr>
                            <th>Тип</th>
                            <td>
                                <select
                                    id="selectType"
                                    className="input_large"
                                    value={policiesType}
                                    onChange={handleChange}
                                >
                                    <option value="0"></option>
                                    <SelectOptionMap props={bsoCatalogType} />
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <th>Агент</th>
                            <td>
                                <select
                                    value={policiesAgent}
                                    id="selectAgents"
                                    className="input_large"
                                    onChange={handleChange}
                                >
                                    <option value="0"></option>
                                    <SelectOptionMap props={bsoCatalogAgents} />
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Компания</th>
                            <td>
                                <select
                                    value={policiesCompany}
                                    id="selectCompany"
                                    className="input_large"
                                    onChange={handleChange}
                                >
                                    <option value="0"></option>
                                    <SelectOptionMap
                                        props={bsoCatalogCompany}
                                    />
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Канал продаж</th>
                            <td>
                                <select
                                    value={policiesChannel}
                                    className="input_large"
                                    name=""
                                    id="selectChannel"
                                    onChange={handleChange}
                                >
                                    <option value="0"></option>
                                    <SelectOptionMap
                                        props={bsoCatalogChannel}
                                    />
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Статус</th>
                            <td>
                                <select
                                    value={policiesStatus}
                                    onChange={handleChange}
                                    id="selectStatus"
                                    className="input_large"
                                >
                                    <option value="0"></option>
                                    <StatusBsoInputList statusBso={statusBso} />
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Серия</th>
                            <td>
                                <input
                                    value={policiesSeries}
                                    onChange={handleChange}
                                    className="input_large"
                                    type="text"
                                    id="inputSeries"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Номер</th>
                            <td>
                                <input
                                    value={policiesNumber}
                                    onChange={handleChange}
                                    className="input_large"
                                    type="text"
                                    id="inputNumber"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Страхователь</th>
                            <td>
                                <input
                                    value={policiesClient}
                                    onChange={handleChange}
                                    className="input_large"
                                    type="text"
                                    id="inputClient"
                                    onInput={validate}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Тип клиента</th>
                            <td>
                                <select
                                    onChange={handleChange}
                                    value={policiesTypeClient}
                                    className="input_large"
                                    name=""
                                    id="selectTypeClient"
                                >
                                    <option value="0"></option>
                                    <option value="B">Юр.Лицо</option>
                                    <option value="C">Физ.Лицо</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Тип оплаты</th>
                            <td>
                                <select
                                    value={policiesTypePay}
                                    onChange={handleChange}
                                    className="input_large"
                                    name=""
                                    id="selectTypePays"
                                >
                                    <option value="0"></option>
                                    <option value="C">Наличные</option>
                                    <option value="N">Безнал</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Дата оформления полюса</th>
                            <td>
                                <input
                                    value={policiesDateRegistration}
                                    onChange={handleChange}
                                    className="input_large"
                                    type="date"
                                    id="inputDateRegistration"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Дата начала действия полюса</th>
                            <td>
                                <input
                                    value={policiesDateStart}
                                    onChange={handleChange}
                                    className="input_large"
                                    type="date"
                                    id="inputDateStart"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Окончание действия полюса</th>
                            <td>
                                <input
                                    value={policiesDateEnd}
                                    onChange={handleChange}
                                    className="input_large "
                                    type="date"
                                    id="inputDateEnd"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Страховая премия</th>
                            <td>
                                <input
                                    value={policiesPrice}
                                    onChange={handleChange}
                                    className="input_large"
                                    type="number"
                                    id="inputPrice"
                                    step="0.01"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table container__table">
                    <button className="btn container__btn" onClick={olala}>
                        Создать новый полис
                    </button>
                    <button
                        className="btn container__btn"
                        onClick={editPolicie}
                    >
                        Сохранить изменения
                    </button>

                    <h3 className="btn_none" id="dataMessageYes">
                        Полис с таким номером уже есть в базе
                    </h3>
                    <h3 className="btn_none" id="dataMessageNo">
                        Полис добавлен
                    </h3>
                </table>

                <table className="table container__table">
                    <tbody>
                        <tr>
                            <th> Комиссия агента в %</th>
                            <input
                                type="number"
                                id="policiesAgentComission"
                                value={policiesAgentComission}
                                onChange={handleChange}
                                className="input_large"
                            />
                        </tr>
                        <tr>
                            <th> Комиссия агента в рублях</th>
                            <td>{comissionAgentRub}</td>
                        </tr>
                        <tr>
                            <th> Входящая комиссия в %</th>
                            <input
                                type="number"
                                id="policiesInputComission"
                                value={policiesInputComission}
                                onChange={handleChange}
                                className="input_large"
                            />
                        </tr>
                        <tr>
                            <th> Входящая комиссия в рублях</th>
                            <td>{comissionInputRub}</td>
                        </tr>
                        <tr>
                            <th> Маржа в %</th>
                            <td>{marginPercent}</td>
                        </tr>
                        <tr>
                            <th> Маржа в рублях</th>
                            <td>{margin}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table container__table">
                    <thead className="">
                        <tr className="">
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        <HistoryListBso historyBsoList={historyBsoList} />
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { SalesCard };
