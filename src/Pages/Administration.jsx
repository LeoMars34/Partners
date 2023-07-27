import { useState, useEffect } from "react";
import { AdminTableList } from "../components/AdminComponents/AdminTableList";
import {
    getChannelStock,
    getCompanyStock,
    getTypeStock,
    getBanksStock,
    getStatusStock,
    addType,
    addChannel,
    addCompany,
    addBank,
    addStatus,
} from "../api";

function Administration() {
    const [banks, setBanks] = useState([]);
    const [bsoCatalogType, setBsoCatalogType] = useState([]);
    const [bsoCatalogChannel, setBsoCatalogChannel] = useState([]);
    const [bsoCatalogCompany, setBsoCatalogCompany] = useState([]);
    const [bsoCatalogStatus, setBsoCatalogStatus] = useState([]);

    useEffect(() => {
        {
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
        }
    }, []);
    /*Добавление нового типа*/
    function showAdminTypeBtn() {
        document
            .getElementById("saveNewAdminType")
            .classList.remove("btn_none");
        document
            .getElementById("adminInputDelete")
            .classList.remove("input_none");
        document
            .getElementById("cancelNewAdminType")
            .classList.remove("btn_none");
        document.getElementById("addAdminType").classList.add("btn_none");
    }
    function addAdminType() {
        let addNewType = document.getElementById("adminInputDelete").value;
        addType(addNewType).then((response) => {
            getTypeStock().then((data) => {
                setBsoCatalogType(data.results);
                document
                    .getElementById("saveNewAdminType")
                    .classList.add("btn_none");
                document
                    .getElementById("adminInputDelete")
                    .classList.add("input_none");
                document
                    .getElementById("cancelNewAdminType")
                    .classList.add("btn_none");
                document
                    .getElementById("addAdminType")
                    .classList.remove("btn_none");
            });
        });
    }
    function closeAdminTypeBtn() {
        document.getElementById("saveNewAdminType").classList.add("btn_none");
        document.getElementById("adminInputDelete").classList.add("input_none");
        document.getElementById("cancelNewAdminType").classList.add("btn_none");
        document.getElementById("addAdminType").classList.remove("btn_none");
    }

    /*Добавление нового канала продаж*/
    function showAdminChannelBtn() {
        document
            .getElementById("saveNewAdminChannel")
            .classList.remove("btn_none");
        document
            .getElementById("adminInputDeleteC")
            .classList.remove("input_none");
        document
            .getElementById("cancelNewAdminChannel")
            .classList.remove("btn_none");
        document.getElementById("addAdminChannel").classList.add("btn_none");
    }
    function addAdminChannel() {
        let addNewChannel = document.getElementById("adminInputDeleteC").value;
        addChannel(addNewChannel).then((response) => {
            getChannelStock().then((data) => {
                setBsoCatalogChannel(data.results);
                document
                    .getElementById("saveNewAdminChannel")
                    .classList.add("btn_none");
                document
                    .getElementById("adminInputDeleteC")
                    .classList.add("input_none");
                document
                    .getElementById("cancelNewAdminChannel")
                    .classList.add("btn_none");
                document
                    .getElementById("addAdminChannel")
                    .classList.remove("btn_none");
            });
        });
    }
    function closeAdminChannelBtn() {
        document
            .getElementById("saveNewAdminChannel")
            .classList.add("btn_none");
        document.getElementById("adminInputDeleteC").classList.add("btn_none");
        document
            .getElementById("cancelNewAdminChannel")
            .classList.add("btn_none");
        document.getElementById("addAdminChannel").classList.remove("btn_none");
    }

    function showAdminCompanyBtn() {
        document
            .getElementById("saveNewAdminCompany")
            .classList.remove("btn_none");
        document
            .getElementById("adminInputDeleteCo")
            .classList.remove("input_none");
        document
            .getElementById("cancelNewAdminCompany")
            .classList.remove("btn_none");
        document.getElementById("addAdminCompany").classList.add("btn_none");
    }
    /*Добавление новой компании*/
    function addAdminCompany() {
        let addNewCompany = document.getElementById("adminInputDeleteCo").value;
        addCompany(addNewCompany).then((response) => {
            getCompanyStock().then((data) => {
                setBsoCatalogCompany(data.results);
                document
                    .getElementById("saveNewAdminCompany")
                    .classList.add("btn_none");
                document
                    .getElementById("adminInputDeleteCo")
                    .classList.add("input_none");
                document
                    .getElementById("cancelNewAdminCompany")
                    .classList.add("btn_none");
                document
                    .getElementById("addAdminCompany")
                    .classList.remove("btn_none");
            });
        });
    }
    function closeAdminCompanyBtn() {
        document
            .getElementById("saveNewAdminCompany")
            .classList.add("btn_none");
        document
            .getElementById("adminInputDeleteCo")
            .classList.add("input_none");
        document
            .getElementById("cancelNewAdminCompany")
            .classList.add("btn_none");
        document.getElementById("addAdminCompany").classList.remove("btn_none");
    }

    /*Добавление нового банка*/
    function showAdminBankBtn() {
        document
            .getElementById("saveNewAdminBank")
            .classList.remove("btn_none");
        document
            .getElementById("adminInputDeleteB")
            .classList.remove("input_none");
        document
            .getElementById("cancelNewAdminBank")
            .classList.remove("btn_none");
        document.getElementById("addAdminBank").classList.add("btn_none");
    }
    function addAdminBank() {
        let addNewBank = document.getElementById("adminInputDeleteB").value;
        addBank(addNewBank).then((response) => {
            getBanksStock().then((data) => {
                setBanks(data.results);
                document
                    .getElementById("saveNewAdminBank")
                    .classList.add("btn_none");
                document
                    .getElementById("adminInputDeleteB")
                    .classList.add("btn_none");
                document
                    .getElementById("cancelNewAdminBank")
                    .classList.add("btn_none");
                document
                    .getElementById("addAdminBank")
                    .classList.remove("btn_none");
            });
        });
    }
    function closeAdminBankBtn() {
        document.getElementById("saveNewAdminBank").classList.add("btn_none");
        document.getElementById("adminInputDeleteB").classList.add("btn_none");
        document.getElementById("cancelNewAdminBank").classList.add("btn_none");
        document.getElementById("addAdminBank").classList.remove("btn_none");
    }

    /*Добавление нового статуса*/
    function showAdminStatusBtn() {
        document
            .getElementById("saveNewAdminStatus")
            .classList.remove("btn_none");
        document
            .getElementById("adminInputDeleteS")
            .classList.remove("input_none");
        document
            .getElementById("cancelNewAdminStatus")
            .classList.remove("btn_none");
        document.getElementById("addAdminStatus").classList.add("btn_none");
    }
    function addAdminStatus() {
        let addNewStatus = document.getElementById("adminInputDeleteS").value;
        addStatus(addNewStatus).then((response) => {
            getStatusStock().then((data) => {
                setBsoCatalogStatus(data.results);
                document
                    .getElementById("saveNewAdminStatus")
                    .classList.add("btn_none");
                document
                    .getElementById("adminInputDeleteS")
                    .classList.add("input_none");
                document
                    .getElementById("cancelNewAdminStatus")
                    .classList.add("btn_none");
                document
                    .getElementById("addAdminStatus")
                    .classList.remove("btn_none");
            });
        });
    }
    function closeAdminStatusBtn() {
        document.getElementById("saveNewAdminStatus").classList.add("btn_none");
        document
            .getElementById("adminInputDeleteS")
            .classList.add("input_none");
        document
            .getElementById("cancelNewAdminStatus")
            .classList.add("btn_none");
        document.getElementById("addAdminStatus").classList.remove("btn_none");
    }

    return (
        <>
            <div className="container">
                <table className="table container__table">
                    <thead>
                        <th>Тип</th>
                    </thead>
                    <tbody>
                        <AdminTableList
                            props={bsoCatalogType}
                            setBsoCatalogType={setBsoCatalogType}
                            text="type"
                        />
                        <button
                            id="addAdminType"
                            onClick={showAdminTypeBtn}
                            className="btn container__btn"
                        >
                            Добавить
                        </button>
                        <input
                            id="adminInputDelete"
                            className="input input_none container__input"
                            type="text"
                        />
                        <button
                            id="saveNewAdminType"
                            onClick={addAdminType}
                            className="btn btn_none container__btn"
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={closeAdminTypeBtn}
                            id="cancelNewAdminType"
                            className="btn btn_none container__btn"
                        >
                            Отмена
                        </button>
                    </tbody>
                </table>

                <table className="table container__table">
                    <thead>
                        <th>Канал Продаж</th>
                    </thead>
                    <tbody>
                        <AdminTableList
                            props={bsoCatalogChannel}
                            text="channel"
                            setBsoCatalogChannel={setBsoCatalogChannel}
                        />
                        <button
                            onClick={showAdminChannelBtn}
                            id="addAdminChannel"
                            className="btn container__btn"
                        >
                            Добавить
                        </button>
                        <input
                            id="adminInputDeleteC"
                            className="input input_none container__input"
                            type="text"
                        />
                        <button
                            id="saveNewAdminChannel"
                            onClick={addAdminChannel}
                            className="btn btn_none container__btn"
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={closeAdminChannelBtn}
                            id="cancelNewAdminChannel"
                            className="btn btn_none container__btn"
                        >
                            Отмена
                        </button>
                    </tbody>
                </table>
                <table className="table container__table">
                    <thead>
                        <th>Компания</th>
                    </thead>
                    <tbody>
                        <AdminTableList
                            props={bsoCatalogCompany}
                            text="company"
                            setBsoCatalogCompany={setBsoCatalogCompany}
                        />
                        <button
                            id="addAdminCompany"
                            onClick={showAdminCompanyBtn}
                            className="btn container__btn"
                        >
                            Добавить
                        </button>
                        <input
                            id="adminInputDeleteCo"
                            className="input input_none container__input"
                            type="text"
                        />
                        <button
                            id="saveNewAdminCompany"
                            onClick={addAdminCompany}
                            className="btn btn_none container__btn"
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={closeAdminCompanyBtn}
                            id="cancelNewAdminCompany"
                            className="btn btn_none container__btn"
                        >
                            Отмена
                        </button>
                    </tbody>
                </table>
                <table className="table container__table">
                    <thead>
                        <th>Банк</th>
                    </thead>
                    <tbody>
                        <AdminTableList
                            props={banks}
                            text="banks"
                            setBanks={setBanks}
                        />
                        <button
                            id="addAdminBank"
                            onClick={showAdminBankBtn}
                            className="btn container__btn"
                        >
                            Добавить
                        </button>
                        <input
                            id="adminInputDeleteB"
                            className="input input_none container__input"
                            type="text"
                        />
                        <button
                            id="saveNewAdminBank"
                            onClick={addAdminBank}
                            className="btn btn_none container__btn"
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={closeAdminBankBtn}
                            id="cancelNewAdminBank"
                            className="btn btn_none container__btn"
                        >
                            Отмена
                        </button>
                    </tbody>
                </table>
                <table className="table container__table">
                    <thead>
                        <th>Статус</th>
                    </thead>
                    <tbody>
                        <AdminTableList
                            props={bsoCatalogStatus}
                            text="sbv"
                            setBsoCatalogStatus={setBsoCatalogStatus}
                        />
                        <button
                            id="addAdminStatus"
                            onClick={showAdminStatusBtn}
                            className="btn container__btn"
                        >
                            Добавить
                        </button>
                        <input
                            id="adminInputDeleteS"
                            className="input input_none container__input"
                            type="text"
                        />
                        <button
                            id="saveNewAdminStatus"
                            onClick={addAdminStatus}
                            className="btn btn_none container__btn"
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={closeAdminStatusBtn}
                            id="cancelNewAdminStatus"
                            className="btn btn_none container__btn"
                        >
                            Отмена
                        </button>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { Administration };
