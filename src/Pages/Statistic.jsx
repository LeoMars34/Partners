import { useState, useEffect } from "react";
import { ByAgentList } from "../components/Statistic/ByAgentList";
import { ByInsCompanyList } from "../components/Statistic/ByInsCompanyList";
import { ByProductList } from "../components/Statistic/ByProductList";
import { BySells } from "../components/Statistic/BySells";
import {
    getStatisticProductList,
    getStatisticCompanyList,
    getStatisticAgentsList,
    getStatisticAllList,
} from "../api";

function Statistic() {
    const [agent, setAgent] = useState([]);
    const [company, setCompany] = useState([]);
    const [product, setPropduct] = useState([]);
    const [sells, setSells] = useState([]);

    useEffect(() => {
        let d = new Date();
        let day = d.getDate();
        if (day < 10) day = "0" + day;
        let month = d.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let year = d.getFullYear();
        let date_start_Array = ["mydate", "mydate2", "mydate3", "mydate4"];
        date_start_Array.forEach((id) => {
            document.getElementById(id).value = year + "-" + month + "-" + "01";
        });
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
        let date_end_Array = ["mydate_1", "mydate_2", "mydate_3", "mydate_4"];
        date_end_Array.forEach((item) => {
            document.getElementById(item).value =
                year2 + "-" + month2 + "-" + "01";
        });
        let d_s = document.getElementById("mydate").value;
        let d_e = document.getElementById("mydate_1").value;
        let link = `?date_start=${d_s}&date_end=${d_e}`;
        getStatisticProductList(link).then((data) => {
            setPropduct(data);
        });
        getStatisticCompanyList(link).then((data) => {
            setCompany(data);
        });
        getStatisticAgentsList(link).then((data) => {
            setAgent(data);
        });
        getStatisticAllList(link).then((data) => {
            setSells(data);
        });
    }, []);

    /*Заполнение input датами*/
    window.addEventListener(
        "load",
        function (e) {
            let d = new Date();
            let day = d.getDate();
            if (day < 10) day = "0" + day;
            let month = d.getMonth() + 1;
            if (month < 10) month = "0" + month;
            let year = d.getFullYear();
            let date_start_Array = ["mydate", "mydate2", "mydate3", "mydate4"];
            date_start_Array.forEach((id) => {
                document.getElementById(id).value =
                    year + "-" + month + "-" + "01";
            });
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
            let date_end_Array = [
                "mydate_1",
                "mydate_2",
                "mydate_3",
                "mydate_4",
            ];
            date_end_Array.forEach((item) => {
                document.getElementById(item).value =
                    year2 + "-" + month2 + "-" + "01";
            });
        },
        false
    );
    /*Фильтр общей статистики */
    function filtrAll() {
        let d_s = document.getElementById("mydate").value;
        let d_e = document.getElementById("mydate_1").value;
        let link = `?date_start=${d_s}&date_end=${d_e}`;
        getStatisticAllList(link).then((data) => {
            setSells(data);
        });
    }
    /*Фильтр по продуктам*/
    function filtrPropduct() {
        let d_s = document.getElementById("mydate2").value;
        let d_e = document.getElementById("mydate_2").value;
        let link = `?date_start=${d_s}&date_end=${d_e}`;
        getStatisticProductList(link).then((data) => {
            setPropduct(data);
        });
    }
    /*Фильтр по компаниям*/
    function filtrCompany() {
        let d_s = document.getElementById("mydate3").value;
        let d_e = document.getElementById("mydate_3").value;
        let link = `?date_start=${d_s}&date_end=${d_e}`;
        getStatisticCompanyList(link).then((data) => {
            setCompany(data);
        });
    }
    /*Фильтр по агентам*/
    function filtrAgent() {
        let d_s = document.getElementById("mydate4").value;
        let d_e = document.getElementById("mydate_4").value;
        let link = `?date_start=${d_s}&date_end=${d_e}`;
        getStatisticAgentsList(link).then((data) => {
            setAgent(data);
        });
    }
    /*Общий фильтр*/
    function filtrAllPage() {
        let d_s = document.getElementById("mydate").value;
        let d_e = document.getElementById("mydate_1").value;
        let date_start_Array = ["mydate", "mydate2", "mydate3", "mydate4"];
        date_start_Array.forEach((id) => {
            document.getElementById(id).value = d_s;
        });
        let date_end_Array = ["mydate_1", "mydate_2", "mydate_3", "mydate_4"];
        date_end_Array.forEach((item) => {
            document.getElementById(item).value = d_e;
        });

        let link = `?date_start=${d_s}&date_end=${d_e}`;
        getStatisticAllList(link).then((data) => {
            setSells(data);
        });
        getStatisticProductList(link).then((data) => {
            setPropduct(data);
        });
        getStatisticAgentsList(link).then((data) => {
            setAgent(data);
            getStatisticCompanyList(link).then((data) => {
                setCompany(data);
            });
        });
    }

    return (
        <>
            <div className="container">
                <h4>Общая статистика</h4>
                <input
                    className="input "
                    type="date"
                    name="mydate"
                    id="mydate"
                />
                <input
                    id="mydate_1"
                    className="input  container__input"
                    type="date"
                    name="mydate_1"
                />
                <button
                    id="salesFilter"
                    onClick={filtrAll}
                    className="btn container__btn"
                >
                    Фильтр
                </button>
                <button
                    id="salesFilter"
                    onClick={filtrAllPage}
                    className="btn container__btn"
                >
                    Общий Фильтр
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Общий обьём</th>
                            <th>Общая маржа</th>
                            <th>Средний чек</th>
                            <th>Средняя маржа</th>
                        </tr>
                    </thead>

                    <tbody>
                        <BySells sells={sells} />
                    </tbody>
                </table>
                <h4>Статистика по продуктам</h4>
                <input
                    className="input container__table"
                    id="mydate2"
                    name="mydate2"
                    type="date"
                />
                <input
                    className="input container__input"
                    id="mydate_2"
                    name="mydate_2"
                    type="date"
                />
                <button onClick={filtrPropduct} className="btn container__btn">
                    Фильтр
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th rowSpan={2}>Продукт</th>
                            <th colSpan={2}>Обьём</th>
                            <th rowSpan={2}>Средний чек</th>
                            <th rowSpan={2}>Маржа</th>
                            <th rowSpan={2}>Средняя маржа</th>
                        </tr>
                        <tr>
                            <th>Штук</th>
                            <th>&#8381;</th>
                        </tr>
                    </thead>

                    <tbody>
                        <ByProductList product={product} />
                    </tbody>
                </table>
                <h4>Статистика по компаниям</h4>
                <input
                    className="input  container__table"
                    id="mydate3"
                    name="mydate3"
                    type="date"
                />
                <input
                    className="input container__input"
                    id="mydate_3"
                    name="mydate_3"
                    type="date"
                />
                <button onClick={filtrCompany} className="btn container__btn">
                    Фильтр
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Компания</th>
                            <th>Обьём</th>
                            <th>Обьём продаж</th>
                            <th>ОСАГО &#8381;</th>
                            <th>ОСАГО %</th>
                            <th>Другие виды &#8381;</th>
                            <th>Другие виды %</th>
                        </tr>
                    </thead>

                    <tbody>
                        <ByInsCompanyList insCompany={company} />
                    </tbody>
                </table>
                <h4>Статистика по агентам</h4>
                <input
                    className="input  container__table"
                    id="mydate4"
                    name="mydate4"
                    type="date"
                />
                <input
                    className="input container__input"
                    id="mydate_4"
                    name="mydate_4"
                    type="date"
                />
                <button onClick={filtrAgent} className="btn container__btn">
                    Фильтр
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Агент</th>
                            <th>Продажа шт.</th>
                            <th>Продажа &#8381;</th>
                            <th>Комиссия</th>
                            <th>Комиссия агента</th>
                            <th>Комиссия &#128101;</th>
                        </tr>
                    </thead>

                    <tbody>
                        <ByAgentList agent={agent} />
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { Statistic };
