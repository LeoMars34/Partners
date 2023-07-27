import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    getAllBsoStock,
    getChannelStock,
    getCompanyStock,
    getTypeStock,
    getAllAgents,
    getPoliciesList,
    filterPolicies,
    unloadingPolicies,
    getStatisticList,
} from "../api";
import { SelectOptionMap } from "../components/BsoComponents/SelectOptionMap";
import { SalesBsoList } from "../components/Sells/SalesBsoList";
import { ModalLoadFile } from "../components/Sells/ModalLoadFile";
import { SalesAgentList } from "../components/Sells/SalesAgentList";

function Sales() {
    const [bsoCatalog, setBsoCatalog] = useState([]);
    const [bsoCatalogType, setBsoCatalogType] = useState([]);
    const [bsoCatalogChannel, setBsoCatalogChannel] = useState([]);
    const [bsoCatalogCompany, setBsoCatalogCompany] = useState([]);
    const [bsoCatalogAgents, setBsoCatalogAgents] = useState([]);
    const [currentPage, setCurrentPage] = useState("");
    const [link, setLink] = useState();
    const [policies, setPolicies] = useState([]);
    const [modalActive, setModalActive] = useState();
    const [statistic, setStatistic] = useState([]);

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

            getPoliciesList().then((data) => {
                setPolicies(data.results);
            });
            let d = new Date();
            let day = d.getDate();
            if (day < 10) day = "0" + day;
            let month = d.getMonth() + 1;
            if (month < 10) month = "0" + month;
            let year = d.getFullYear();

            document.getElementById("date").value =
                year + "-" + month + "-" + "01";

            let month2 = "";
            let year2 = year;
            if (d.getMonth() + 1 > 8) {
                month2 = d.getMonth() + 1 + 1;
            } else {
                month2 = "0" + (d.getMonth() + 1 + 1);
            }
            if (d.getMonth() + 2 > 12) {
                month2 = "01";
                year2 = year2 + 1;
            }
            document.getElementById("date_").value =
                year2 + "-" + month2 + "-" + "01";
            let d_s = document.getElementById("date").value;
            let d_e = document.getElementById("date_").value;
            let link = `?date_start=${d_s}&date_end=${d_e}`;
            getStatisticList(link).then((data) => {
                setStatistic(data);
            });
        }
    }, []);
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

    function hideTwoButton() {
        document.getElementById("TwoButtonYesHidden").classList.add("btn_none");
        document.getElementById("TwoButtonNoHidden").classList.add("btn_none");
    }
    /*Фильтр таблиц*/
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
        if (document.getElementById("selectAgents").value != "0") {
            youLink =
                youLink +
                `agent=${document.getElementById("selectAgents").value}&`;
        }
        setLink(youLink);

        filterPolicies(youLink).then((data) => {
            setPolicies(data.results);
        });
    }

    /*Фильтр таблиц*/
    function unloadPolicy() {
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
        if (document.getElementById("selectAgents").value != "0") {
            youLink =
                youLink +
                `agent=${document.getElementById("selectAgents").value}&`;
        }
        /*Скачать файл*/
        unloadingPolicies(youLink).then((data) => {
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "policy.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    function filtrTable() {
        let d_s = document.getElementById("date").value;
        let d_e = document.getElementById("date_").value;
        let link = `?date_start=${d_s}&date_end=${d_e}`;
        getStatisticList(link).then((data) => {
            setStatistic(data);
        });
    }

    /*Наполнение input датами для фильтрации */
    window.addEventListener(
        "load",
        function (e) {
            let d = new Date();
            let day = d.getDate();
            if (day < 10) day = "0" + day;
            let month = d.getMonth() + 1;
            if (month < 10) month = "0" + month;
            let year = d.getFullYear();

            document.getElementById("date").value =
                year + "-" + month + "-" + "01";

            let month2 = "";
            let year2 = year;
            if (d.getMonth() + 1 > 8) {
                month2 = d.getMonth() + 1 + 1;
            } else {
                month2 = "0" + (d.getMonth() + 1 + 1);
            }
            if (d.getMonth() + 2 > 12) {
                month2 = "01";
                year2 = year2 + 1;
            }
            document.getElementById("date_").value =
                year2 + "-" + month2 + "-" + "01";
        },
        false
    );

    return (
        <>
            <div className="container">
                <h4>Статистика продаж по агентам</h4>
                <input className="input" type="date" id="date" name="date" />
                <input
                    className="input container__input"
                    id="date_"
                    name="date_"
                    type="date"
                />
                <button onClick={filtrTable} className="btn container__btn">
                    Фильтр
                </button>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Агент</th>
                            <th>Общее кол-во полисов</th>
                            <th>Объём продаж</th>
                            <th>КВ всего</th>
                            <th>КВ агента</th>
                            <th>Маржа</th>
                        </tr>
                    </thead>

                    <tbody>
                        <SalesAgentList statistic={statistic} />
                    </tbody>
                </table>
                <h4>Список полисов</h4>

                <button className="btn container__btn" onClick={unloadPolicy}>
                    Выгрузить
                </button>
                <button
                    class="btn container__btn"
                    onClick={() => setModalActive(true)}
                >
                    Загрузить
                </button>

                <button
                    id="TwoButtonYesHidden"
                    className="btn container__btn btn_none"
                >
                    Сохранить
                </button>

                <button
                    id="TwoButtonNoHidden"
                    className="btn container__btn btn_none"
                    onClick={hideTwoButton}
                >
                    Отмена
                </button>
                <Link to={"/agents/SalesCard"}>
                    <button className="btn container__btn">Создать</button>
                </Link>
                <ModalLoadFile
                    active={modalActive}
                    setActive={setModalActive}
                />

                <div className="container__scroll container__scroll_small">
                    <table className="table">
                        <thead className="container__head">
                            <tr>
                                <th>
                                    <select
                                        id="selectOne"
                                        className="select container__select"
                                        onChange={changeBsoSelect}
                                    >
                                        <option value="0">Тип</option>
                                        <SelectOptionMap
                                            props={bsoCatalogType}
                                        />
                                    </select>
                                </th>
                                <th>
                                    <select
                                        id="selectTwo"
                                        className="select container__select"
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
                                        id="selectThree"
                                        className="select container__select"
                                        onChange={changeBsoSelect}
                                    >
                                        <option value="0">Компания</option>
                                        <SelectOptionMap
                                            props={bsoCatalogCompany}
                                        />
                                    </select>
                                </th>
                                <th>
                                    <select
                                        id="selectAgents"
                                        className="select container__select"
                                        onChange={changeBsoSelect}
                                    >
                                        <option value="0">Агент</option>
                                        <SelectOptionMap
                                            props={bsoCatalogAgents}
                                        />
                                    </select>
                                </th>
                                <th>Серия и №</th>
                                <th>Дата оформления</th>
                                <th>Дата начала</th>
                                <th>Дата окончания</th>
                                <th>Комиссия агента в %</th>
                                <th>Комиссия агента в &#8381;</th>
                                <th>Входящая комиссия в %</th>
                                <th>Входящая комиссия в &#8381;</th>
                                <th>Маржа в %</th>
                                <th>Маржа в &#8381;</th>
                            </tr>
                        </thead>

                        <tbody>
                            <SalesBsoList policies={policies} />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export { Sales };
