import { useState, useEffect } from "react";

import {
    getChannelStock,
    getCompanyStock,
    getTypeStock,
    getStatisticList,
    getBanksStock,
    loadNewFinPolitic,
    getFinPoliticList,
    redactorFPt,
    redactorNF,
    getListFP,
    redactorComissionAgent,
    getAllAgents,
} from "../api";
import { SelectOptionMap } from "../components/BsoComponents/SelectOptionMap";
import { FinPoliticList } from "../components/FinPolitic/FinPoliticList";
import { NewFinPoliticList } from "../components/FinPolitic/NewFinPoliticList";
import { FinPoliticListRedactor } from "../components/FinPolitic/FinPoliticListRedactor";
import { AgentFPList } from "../components/FinPolitic/AgentFPList";

function FinPolitic() {
    const [banks, setBanks] = useState([]);
    const [bsoCatalogType, setBsoCatalogType] = useState([]);
    const [bsoCatalogChannel, setBsoCatalogChannel] = useState([]);
    const [bsoCatalogCompany, setBsoCatalogCompany] = useState([]);
    const [bsoNewCatalogType, setBsoNewCatalogType] = useState([]);
    const [bsoNewCatalogChannel, setBsoNewCatalogChannel] = useState([]);
    const [bsoNewCatalogCompany, setBsoNewCatalogCompany] = useState([]);
    const [newBanks, setNewBank] = useState([]);
    const [finPoliticList, setFPlitic] = useState([]);
    const [link, setLink] = useState();
    const [statistic, setStatistic] = useState([]);
    const [currentPage, setCurrentPage] = useState("");
    const [listFP, setListFP] = useState([]);
    const [newFP, setNewFP] = useState([]);
    const [newFPS, setNewFPS] = useState([]);
    const [allAgents, setAllAgents] = useState([]);

    useEffect(() => {
        {
            getFinPoliticList().then((data) => {
                setFPlitic(data.results);
                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
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

            getStatisticList().then((data) => {
                setStatistic(data);
            });
            getBanksStock().then((data) => {
                setBanks(data.results);
            });
            getFinPoliticList().then((data) => {
                setFPlitic(data.results);
            });
            getListFP().then((data) => {
                setListFP(data);
            });
            getAllAgents().then((data) => {
                setAllAgents(data);
            });

            getTypeStock("ic/").then((data) => {
                setBsoNewCatalogType(data);
            });
            // getBanksStock("ic/").then((data) => {
            //     setNewBank(data);
            // });
            getListFP().then((data) => {
                getListFP(data.id).then((data) => {
                    setNewFP(data.results);
                });
                if (sessionStorage.getItem("fid")) {
                    document
                        .getElementById("scroll-table-FP-new")
                        .classList.remove("table_none");
                    getListFP(sessionStorage.getItem("fid")).then((data) => {
                        setNewFPS(data);
                        document.getElementById("nameID").value =
                            data.financial.name;
                        document.getElementById("dateID").value =
                            data.financial.date_start;
                        document
                            .getElementById("addFP")
                            .setAttribute(
                                "data-financialId",
                                data.financial.id
                            );
                    });
                    sessionStorage.removeItem("fid");
                }
            });
        }
    }, []);

    /*Scroll для таблиц */
    const scrollHandler = (e) => {
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                100 &&
            currentPage
        ) {
            getFinPoliticList(`?${currentPage}`).then((data) => {
                setFPlitic([...finPoliticList, ...data.results]);
                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
            });
        }
    };
    /*Добавление select Банк при ипотечном выборе*/
    function ipotechnyiSelect() {
        let ipotechnyi = document.getElementById("selectOne");
        let ipotechnyiIndex = ipotechnyi.selectedIndex;

        if (ipotechnyi[ipotechnyiIndex].textContent == "Ипотечный") {
            document
                .getElementById("selectFour")
                .classList.remove("select_none");
        } else {
            document.getElementById("selectFour").classList.add("select_none");
            document.getElementById("selectFour").value = "0";
        }
    }
    function ipotechnyiSelectS() {
        let ipotechnyi = document.getElementById("select_One");
        let ipotechnyiIndex = ipotechnyi.selectedIndex;

        if (ipotechnyi[ipotechnyiIndex].textContent == "Ипотечный") {
            document
                .getElementById("select_Four")
                .classList.remove("select_none");
        } else {
            document.getElementById("select_Four").classList.add("select_none");
            document.getElementById("select_Four").value = "0";
        }
    }

    function closeRedactor() {
        document.getElementById("redactorTableId").classList.add("table_none");
    }
    /* Создание новой входящей комиссии*/
    function createNewFP() {
        const finPoliticArray = {
            type_policy: document.getElementById("selectOne").value,
            channel: document.getElementById("selectTwo").value,
            company: document.getElementById("selectThree").value,
            date_start: document.getElementById("inputDate").value,
            value: document.getElementById("inputComission").value,
        };
        if (document.getElementById("selectFour").value != "0") {
            finPoliticArray["bank"] =
                document.getElementById("selectFour").value;
        }

        loadNewFinPolitic(finPoliticArray).then((data) => {
            getFinPoliticList().then((data) => {
                setFPlitic(data.results);
            });
        });
    }
    /*Редактирование входящей комиссии */
    function remakeNewFP() {
        const finPoliticArray = {
            type_policy: document.getElementById("select_One").value,
            channel: document.getElementById("select_Two").value,
            company: document.getElementById("select_Three").value,
            date_start: document.getElementById("input_Date").value,
            value: document.getElementById("input_Comission").value,
        };
        if (document.getElementById("select_Four").value != "0") {
            finPoliticArray["bank"] =
                document.getElementById("select_Four").value;
        }

        redactorFPt(
            document.getElementById("redactorTableId").dataset.id,
            finPoliticArray
        ).then((data) => {
            getFinPoliticList().then((data) => {
                closeRedactor();
                setFPlitic(data.results);
                getListFP().then((data) => {
                    setNewFPS(data);
                });
            });
        });
    }
    /*Сетка фин.политики */
    function editFinancial(e) {
        let nameless = {
            text: "name",
            date: "date_start",
        };
        let body = {};
        body[nameless[e.target.type]] = e.target.value;
        redactorNF(body, newFPS.financial.id).then((data) => {
            getListFP().then((data) => {
                setListFP(data);
            });
        });
    }
    /*Редактирование сетки фин.политики */
    function remakeNew_FP() {
        const newFinPoliticArray = {
            name: newFPS.financial.id,
            type_policy: document.getElementById("select_One_").value,
            channel: document.getElementById("select_Two_").value,
            company: document.getElementById("select_Three_").value,
            commission_agent: document.getElementById("input_Agent-Comission")
                .value,
        };
        if (document.getElementById("select_Four_").value != "0") {
            newFinPoliticArray["bank"] =
                document.getElementById("select_Four_").value;
        }
        redactorComissionAgent(newFinPoliticArray).then((data) => {
            getListFP().then((data) => {
                setListFP(data);
            });
            getListFP(
                document.getElementById("addFP").dataset.financialid
            ).then((data) => {
                setNewFPS(data);
            });
        });
    }

    function createNameFP() {
        const newFP = {
            date_start: document.getElementById("inputDateNew").value,
            name: document.getElementById("inputNameNew").value,
        };

        redactorNF(newFP).then((response) => {
            getListFP().then((data) => {
                setListFP(data);
            });
        });
    }
    /*Фильтр входящей комиссии */
    function changeBsoSelect() {
        let youLink = "?";

        if (document.getElementById("selectOne_").value != "0") {
            youLink =
                youLink +
                `type_policy=${document.getElementById("selectOne_").value}&`;
        }
        if (document.getElementById("selectTwo_").value != "0") {
            youLink =
                youLink +
                `channel=${document.getElementById("selectTwo_").value}&`;
        }

        if (document.getElementById("selectThree_").value != "0") {
            youLink =
                youLink +
                `company=${document.getElementById("selectThree_").value}&`;
        }
        if (document.getElementById("selectFour_").value != "0") {
            youLink =
                youLink +
                `bank=${document.getElementById("selectFour_").value}&`;
        }

        setLink(youLink);

        getFinPoliticList(youLink).then((data) => {
            setFPlitic(data.results);
        });
    }

    /*Добавление нового типа финюполитики */
    function addNewFinPoliticType(e) {
        getChannelStock(`ic/?type_policy=${e.target.value}`).then((data) => {
            setBsoNewCatalogChannel(data);
        });
    }
    /*Добавление нового канала продаж финюполитики */
    function addNewFinPoliticChannel(e) {
        let type = document.getElementById("select_One_").value;
        getCompanyStock(
            `ic/?type_policy=${type}&channel=${e.target.value}`
        ).then((data) => {
            setBsoNewCatalogCompany(data);
        });
    }
    /*Добавление новой компании финюполитики */
    function addNewFinPoliticCompany(e) {
        let type = document.getElementById("select_One_");
        let channel_ = document.getElementById("select_Two_").value;
        if (type[type.selectedIndex].textContent == "Ипотечный") {
            getBanksStock(
                `ic/?channel=${channel_}&company=${e.target.value}`
            ).then((data) => {
                setNewBank(data);
            });
        }
    }

    return (
        <div className="container">
            <h4>Входящая комиссия</h4>
            <select
                id="selectOne"
                className="select"
                onChange={ipotechnyiSelect}
            >
                <option value="0">Тип</option>
                <SelectOptionMap props={bsoCatalogType} />
            </select>
            <select id="selectTwo" className="select">
                <option value="0">Канал продаж</option>
                <SelectOptionMap props={bsoCatalogChannel} />
            </select>
            <select id="selectThree" className="select">
                <option value="0">Компания</option>
                <SelectOptionMap props={bsoCatalogCompany} />
            </select>
            <input
                id="inputDate"
                className="input container__input"
                type="date"
            />
            <input
                id="inputComission"
                placeholder="Комиссия"
                className="input container__input"
                type="number"
                step="0.01"
                style={{ textAlign: "center" }}
            />
            <select id="selectFour" className="select select_none">
                <option value="0">Банк</option>
                <SelectOptionMap props={banks} />
            </select>
            <button
                id="createFpButton"
                className="btn container__btn"
                onClick={createNewFP}
            >
                Создать
            </button>
            <div className="container__scroll">
                <table className="table">
                    <thead className="container__head">
                        <tr>
                            <th>
                                <select
                                    id="selectOne_"
                                    className="select container__select"
                                    onChange={changeBsoSelect}
                                >
                                    <option value="0">Тип</option>
                                    <SelectOptionMap props={bsoCatalogType} />
                                </select>
                            </th>

                            <th>
                                <select
                                    id="selectTwo_"
                                    className="select container__select_small"
                                    onChange={changeBsoSelect}
                                >
                                    <option value="0">Канал продаж</option>
                                    <SelectOptionMap
                                        props={bsoCatalogChannel}
                                    />
                                </select>
                            </th>
                            <th>
                                <select
                                    id="selectThree_"
                                    className="select container__select_small"
                                    onChange={changeBsoSelect}
                                >
                                    <option value="0">Компания</option>
                                    <SelectOptionMap
                                        props={bsoCatalogCompany}
                                    />
                                </select>
                            </th>
                            <th>Дата начала</th>
                            <th>Комиссия</th>
                            <th>
                                <select
                                    id="selectFour_"
                                    className="select container__select"
                                    onChange={changeBsoSelect}
                                >
                                    <option value="0">Банк</option>
                                    <SelectOptionMap props={banks} />
                                </select>
                            </th>
                            <th>&#10006;</th>
                            <th>&#9998;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <FinPoliticList
                            finPoliticList={finPoliticList}
                            setFPlitic={setFPlitic}
                        />
                    </tbody>
                </table>
            </div>
            <h4>Сетка фин.политики</h4>
            <table
                id="redactorTableId"
                className="table container__table table_none"
            >
                <tbody>
                    <select
                        id="select_One"
                        className="select container__select"
                        onChange={ipotechnyiSelectS}
                    >
                        <option value="0">Тип</option>
                        <SelectOptionMap props={bsoCatalogType} />
                    </select>
                    <select
                        id="select_Two"
                        className="select container__select"
                        onChange={changeBsoSelect}
                    >
                        <option value="0">Канал продаж</option>
                        <SelectOptionMap props={bsoCatalogChannel} />
                    </select>
                    <select
                        id="select_Three"
                        className="select container__select"
                        onChange={changeBsoSelect}
                    >
                        <option value="0">Компания</option>
                        <SelectOptionMap props={bsoCatalogCompany} />
                    </select>
                    <input
                        id="input_Date"
                        className="input container__input"
                        type="date"
                    />
                    <input
                        id="input_Comission"
                        placeholder="Комиссия"
                        className="input container__input"
                        type="number"
                        step="0.01"
                        style={{ textAlign: "center" }}
                    />
                    <select
                        id="select_Four"
                        className="select container__select select_none"
                        onChange={changeBsoSelect}
                    >
                        <option value="0">Банк</option>
                        <SelectOptionMap props={banks} />
                    </select>
                    <button
                        onClick={remakeNewFP}
                        className="btn container__btn"
                    >
                        Сохранить
                    </button>
                    <button
                        onClick={closeRedactor}
                        className="btn container__btn"
                    >
                        Отмена
                    </button>
                </tbody>
            </table>
            <div className=" container__table">
                <input
                    id="inputNameNew"
                    placeholder="Наименование"
                    className="input container__input"
                    type="text"
                />
                <input
                    id="inputDateNew"
                    className="input container__input"
                    type="date"
                />
                <button onClick={createNameFP} className="btn container__btn">
                    Создать
                </button>
            </div>

            <table className="table container__table">
                <thead className="">
                    <tr className="">
                        <th>Наименование</th>
                        <th>Дата начала действия</th>
                        <th>Всего</th>
                        <th>
                            <span>&#10006;</span>
                        </th>
                        <th>
                            <span>&#9998;</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <NewFinPoliticList
                        listFP={listFP}
                        setListFP={setListFP}
                        setNewFPS={setNewFPS}
                    />
                </tbody>
            </table>

            <div
                id="scroll-table-FP-new"
                className="container__table table_none"
            >
                <th>
                    <input
                        className="input container__input"
                        id="nameID"
                        placeholder="Наименование"
                        type="text"
                        onBlur={(e) => editFinancial(e)}
                    />

                    <input
                        className="input container__input"
                        id="dateID"
                        type="date"
                        onBlur={(e) => editFinancial(e)}
                    />
                </th>

                <table className="table">
                    <tbody>
                        <FinPoliticListRedactor
                            newFPS={newFPS}
                            setNewFPS={setNewFPS}
                            setListFP={setListFP}
                        />
                    </tbody>
                </table>

                <th>
                    <select
                        className="select container__select"
                        id="select_One_"
                        onChange={addNewFinPoliticType}
                    >
                        <option value="0">Тип</option>
                        <SelectOptionMap props={bsoNewCatalogType} />
                    </select>

                    <select
                        className="select container__select"
                        id="select_Two_"
                        onChange={addNewFinPoliticChannel}
                    >
                        <option value="0">Канал продаж</option>
                        <SelectOptionMap props={bsoNewCatalogChannel} />
                    </select>

                    <select
                        className="select container__select"
                        id="select_Three_"
                        onChange={addNewFinPoliticCompany}
                    >
                        <option value="0">Компания</option>
                        <SelectOptionMap props={bsoNewCatalogCompany} />
                    </select>

                    <input
                        className="input container__input"
                        id="input_Agent-Comission"
                        placeholder="Комиссия агента"
                        type="number"
                        step="0.01"
                    />

                    <select
                        className="select container__select"
                        id="select_Four_"
                    >
                        <option value="0">Банк</option>
                        <SelectOptionMap props={newBanks} />
                    </select>

                    <button
                        id="addFP"
                        className="btn container__btn"
                        onClick={remakeNew_FP}
                    >
                        Добавить
                    </button>
                </th>
            </div>
            <h4>Фин.политика по агентам</h4>
            <table className="table container__table">
                <thead className="">
                    <th>Агент</th>
                    <th>Фин. политика</th>
                </thead>
                <tbody>
                    <AgentFPList allAgents={allAgents} listFP={listFP} />
                </tbody>
            </table>
        </div>
    );
}

export { FinPolitic };
