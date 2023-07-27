import { useState, useEffect } from "react";
import {
    getAllBsoStock,
    getChannelStock,
    getCompanyStock,
    getTypeStock,
    getAllAgents,
    getBsoDeadLine,
    getBsoToAgent,
    getStatusBso,
    addBsoStatus,
    changeBsoStatus,
    getHistoryBso,
    getBsoList,
    getBsoAgentsArhived,
    getBsoToArhive,
} from "../api";

import { BsoStockList } from "../components/BsoComponents/BsoStockList";
import { SelectOptionMap } from "../components/BsoComponents/SelectOptionMap";
import { BsoDeadLineList } from "../components/BsoComponents/BsoDeadLineList";
import { BsoListAll } from "../components/BsoComponents/BsoListAll";
import { HistoryListBso } from "../components/BsoComponents/HistoryListBso";
import { StatusBsoInputList } from "../components/BsoComponents/StatusBsoInputList";

function Bso() {
    const [bsoCatalog, setBsoCatalog] = useState([]);
    const [bsoCatalogType, setBsoCatalogType] = useState([]);
    const [bsoCatalogChannel, setBsoCatalogChannel] = useState([]);
    const [bsoCatalogCompany, setBsoCatalogCompany] = useState([]);
    const [bsoCatalogAgents, setBsoCatalogAgents] = useState([]);
    const [currentPage, setCurrentPage] = useState("");
    const [link, setLink] = useState();
    const [bsoDeadLine, setBsoDeadLine] = useState([]);
    const [bsoList, setBsoList] = useState([]);
    const [historyBsoList, setHistoryBsoList] = useState([]);
    const [statusBso, setStatusBso] = useState([]);

    /*Scroll таблиц */
    const scrollHandler = (e) => {
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                100 &&
            currentPage
        ) {
            getAllBsoStock(`?${currentPage}`).then((data) => {
                setBsoCatalog([...bsoCatalog, ...data.results]);
                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
            });
        }
    };

    useEffect(() => {
        {
            getAllBsoStock().then((data) => {
                setBsoCatalog(data.results);
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
            getAllAgents().then((data) => {
                setBsoCatalogAgents(data);
            });
            getBsoDeadLine().then((data) => {
                setBsoDeadLine(data);
            });
            getBsoList().then((data) => {
                setBsoList(data.results);
            });
            getStatusBso().then((data) => {
                setStatusBso(data.results);
            });
        }
    }, []);

    /*Фильтр БСО на складе */
    function changeBsoSelect() {
        let youLink = "?";

        if (document.getElementById("selectOne").value != "0") {
            youLink =
                youLink + `type=${document.getElementById("selectOne").value}&`;
        }
        if (document.getElementById("selectTwo").value != "0") {
            youLink =
                youLink +
                `channel=${document.getElementById("selectTwo").value}&`;
        }

        if (document.getElementById("selectThree").value != "0") {
            youLink =
                youLink +
                `company=${document.getElementById("selectThree").value}&`;
        }
        setLink(youLink);

        getAllBsoStock(youLink).then((data) => {
            setBsoCatalog(data.results);
            if (data.next) {
                setCurrentPage(data.next.split("?")[1]);
            } else {
                setCurrentPage(null);
            }
        });
    }

    /*БСО в архив*/
    function goBsoToArhive() {
        let idBso = historyBsoList[0].bso.id;
        getBsoToArhive(idBso).then((data) => {
            getBsoList().then((data) => {
                setBsoList(data.results);
            });
            getHistoryBso(idBso).then((data) => {
                setHistoryBsoList(data.results);
            });
        });
    }
    /*Выдача БСО со склада агенту */
    function checkInput() {
        let list_is = [];
        let checkArray = document.querySelectorAll("tr>td>input");
        checkArray.forEach((item) => {
            if (item.checked === true) {
                list_is.push(item.parentNode.parentNode.dataset.id);
            }
        });
        const counts = {
            type: document.getElementById("selectOne").value,
            channel: document.getElementById("selectTwo").value,
            company: document.getElementById("selectThree").value,
            series: document.getElementById("inputSeries").value,
            number: document.getElementById("inputNumber").value,
            count: document.getElementById("inputCount").value,
        };

        let bodyArray = {
            agent: document.getElementById("selectAgents").value,
            counts: counts,
            list: { list_is: list_is },
        };

        if (!counts.series || !counts.count || !counts.number) {
            delete bodyArray.counts;
        }
        if (list_is.length === 0) {
            delete bodyArray.list;
        }

        getBsoToAgent(bodyArray).then(() => {
            getAllBsoStock().then((data) => {
                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
            });
            getBsoDeadLine().then((data) => {
                setBsoDeadLine(data);
            });
        });
    }

    /*Добавление нового статуса БСО*/

    function addNewStatus() {
        let newValueStatus = document.getElementById("historyBsoInput").value;
        addBsoStatus(newValueStatus).then(() => {
            getStatusBso().then((data) => {
                setStatusBso(data.results);
            });
        });
    }

    /*Изменение статуса БСО*/

    function changeStatusBso() {
        let idSelectBso = document.getElementById("selectFour").value;
        let idBso = historyBsoList[0].bso.id;

        changeBsoStatus({
            bso: idBso,
            status: idSelectBso,
        }).then(() => {
            getBsoList().then((data) => {
                setBsoList(data.results);
            });
            getHistoryBso(idBso).then((data) => {
                setHistoryBsoList(data.results);
            });
        });
    }
    /*Архив БСО*/
    function changeText() {
        getBsoAgentsArhived().then((data) => {
            setBsoList(data.results);
        });
        document.getElementById("changeText").classList.add("btn_none");
        document
            .getElementById("changeTextSecond")
            .classList.remove("btn_none");
        document.getElementById("hideInBush").classList.add("btn_none");
    }
    function changeTextSecond() {
        getBsoList().then((data) => {
            setBsoList(data.results);
        });
        document.getElementById("changeTextSecond").classList.add("btn_none");
        document.getElementById("changeText").classList.remove("btn_none");
        document.getElementById("hideInBush").classList.remove("btn_none");
    }

    /*Загрузка БСО нап склад*/

    function loadBsoToStock() {
        const counts = {
            type: document.getElementById("selectOne").value,
            channel: document.getElementById("selectTwo").value,
            company: document.getElementById("selectThree").value,
            series: document.getElementById("inputSeries").value,
            number: document.getElementById("inputNumber").value,
            count: document.getElementById("inputCount").value,
        };

        /*Валидация загрузки БСО на склад*/

        if (counts.type === "0") {
            document.getElementById("selectOne").classList.add("redBorder");
        } else {
            document.getElementById("selectOne").classList.remove("redBorder");
        }

        if (counts.channel === "0") {
            document.getElementById("selectTwo").classList.add("redBorder");
        } else {
            document.getElementById("selectTwo").classList.remove("redBorder");
        }
        if (counts.company === "0") {
            document.getElementById("selectThree").classList.add("redBorder");
        } else {
            document
                .getElementById("selectThree")
                .classList.remove("redBorder");
        }
        if (counts.series === "") {
            document.getElementById("inputSeries").classList.add("redBorder");
        } else {
            document
                .getElementById("inputSeries")
                .classList.remove("redBorder");
        }
        if (counts.number === "") {
            document.getElementById("inputNumber").classList.add("redBorder");
        } else {
            document
                .getElementById("inputNumber")
                .classList.remove("redBorder");
        }
        if (counts.count === "") {
            document.getElementById("inputCount").classList.add("redBorder");
        } else {
            document.getElementById("inputCount").classList.remove("redBorder");
        }

        let loadBsoArray = {
            new: counts,
        };

        getBsoToAgent(loadBsoArray).then(() => {
            getAllBsoStock().then((data) => {
                setBsoCatalog(data.results);
                document.getElementById("selectOne").value = "0";
                document.getElementById("selectTwo").value = "0";
                document.getElementById("selectThree").value = "0";
                document.getElementById("inputSeries").value = "";
                document.getElementById("inputNumber").value = "";
                document.getElementById("inputCount").value = "";

                if (data.next) {
                    setCurrentPage(data.next.split("?")[1]);
                } else {
                    setCurrentPage(null);
                }
            });
        });
    }

    return (
        <>
            <div className="container">
                <h4>Статистика БСО по агентам</h4>
                <table className="table container__table">
                    <thead>
                        <tr>
                            <th>Агенты</th>
                            <th>Общее колличество БСО</th>
                            <th>Закончится через: 7 дней</th>
                            <th>Закончится через: 2 дня</th>
                            <th>Просрочен</th>
                        </tr>
                    </thead>
                    <tbody>
                        <BsoDeadLineList bsoDeadLine={bsoDeadLine} />
                    </tbody>
                </table>

                <h4>БСО на складе</h4>
                <div className=" container__table">
                    <select
                        onChange={changeBsoSelect}
                        id="selectOne"
                        className="select container__select"
                    >
                        <option value="0">Тип</option>
                        <SelectOptionMap props={bsoCatalogType} />
                    </select>
                    <select
                        onChange={changeBsoSelect}
                        id="selectTwo"
                        className="select container__select"
                    >
                        <option value="0">Канал продаж</option>
                        <SelectOptionMap props={bsoCatalogChannel} />
                    </select>
                    <select
                        onChange={changeBsoSelect}
                        id="selectThree"
                        className="select container__select"
                    >
                        <option value="0">Компания</option>
                        <SelectOptionMap props={bsoCatalogCompany} />
                    </select>
                    <input
                        id="inputSeries"
                        type="text"
                        placeholder="Серия"
                        className="input container__input"
                    ></input>
                    <input
                        id="inputNumber"
                        type="text"
                        placeholder="Номер с"
                        className="input container__input"
                    ></input>
                    <input
                        id="inputCount"
                        type="text"
                        placeholder="Колличество"
                        className="input container__input"
                    ></input>
                    <select
                        id="selectAgents"
                        className="select container__select"
                    >
                        <option value="0">Агент</option>
                        <SelectOptionMap props={bsoCatalogAgents} />
                    </select>
                    <button onClick={checkInput} className="btn container__btn">
                        Выдать
                    </button>
                    <button
                        onClick={loadBsoToStock}
                        className="btn container__btn"
                    >
                        Загрузить БСО
                    </button>
                </div>
                <div className="container__scroll">
                    <table className="table">
                        <thead className="container__head">
                            <tr>
                                <th>&#9745;</th>
                                <th>Тип</th>
                                <th>Серия</th>
                                <th>Номер</th>
                                <th>Компания</th>
                                <th>Канал продаж</th>
                                <th>Дата получения</th>
                            </tr>
                        </thead>

                        <tbody>
                            <BsoStockList bsoCatalog={bsoCatalog} />
                        </tbody>
                    </table>
                </div>
                <h4>БСО</h4>
                <table className="table container__table">
                    <thead>
                        <tr>
                            <th>Агент</th>
                            <th>Тип</th>
                            <th>Серия</th>
                            <th>Номер</th>
                            <th>Компания</th>
                            <th>Канал продаж</th>
                            <th>Дата получения</th>
                            <th>Актуальный статус</th>
                        </tr>
                    </thead>

                    <tbody>
                        <BsoListAll
                            bsoList={bsoList}
                            setHistoryBsoList={setHistoryBsoList}
                        />
                    </tbody>
                </table>

                <table className="table container__table_status">
                    <thead>
                        <tr>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        <HistoryListBso historyBsoList={historyBsoList} />
                    </tbody>
                </table>

                <div
                    id="changeStatusTable"
                    className="container__table table_none container__table_status"
                >
                    <select
                        name=""
                        id="selectFour"
                        className="select container__select"
                    >
                        <option value="0">Статус</option>
                        <StatusBsoInputList statusBso={statusBso} />
                    </select>
                    <button
                        onClick={changeStatusBso}
                        className="btn container__btn"
                        // id="historyBsoButton"
                    >
                        Изменить
                    </button>

                    <input
                        className="input container__input"
                        type="text"
                        id="historyBsoInput"
                    />
                    <button
                        onClick={addNewStatus}
                        className="btn container__btn"
                        // id="historyBsoButton"
                    >
                        Добавить
                    </button>
                    <button
                        onClick={goBsoToArhive}
                        className="btn container__btn"
                        // id="historyBsoButton"
                    >
                        В архив
                    </button>
                </div>
            </div>
        </>
    );
}

export { Bso };
