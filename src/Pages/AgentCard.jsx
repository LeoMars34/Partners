import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { BsoDeadLineAgentsList } from "../components/AgentsComponent/BsoDeadLineAgentsList";

import {
    deleteAgent,
    getAgent,
    addAgentLogo,
    getAgentAllBsoDeadLine,
    getBsoDeadLine,
    getBsoList,
    addComment,
    changeAgent,
} from "../api";
import { useNavigate } from "react-router-dom";
import { BsoAgentList } from "../components/AgentsComponent/BsoAgentList";

function AgentCard() {
    const [agentName, setAgentName] = useState();
    const [agentPhone, setAgentPhone] = useState();
    const [agentEmail, setAgentEmail] = useState();
    const [agentLocation, setAgentLocation] = useState();
    const [agentStorageTime, setAgentStorageTime] = useState();
    const [agentType, setAgentType] = useState();
    const [agentFinancialName, setAgentFinancialName] = useState();
    const [agentFinancial, setAgentFinancial] = useState();
    const [agentLogo, setAgentLogo] = useState();
    const [showModal, setShowModal] = useState(false);
    const [bsoDeadLineAgent, setBsoDeadLineAgent] = useState([]);
    const [allBsoAgent, setAllBsoAgent] = useState([]);
    const [bsoList, setBsoList] = useState([]);
    const [idFP, setIdFp] = useState([]);
    const [comments, setComments] = useState();
    const [agent, setAgent] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getAgentAllBsoDeadLine(id).then((data) => {
            setAllBsoAgent(data.filter((element) => element.agent.id == id));
        });
        getBsoDeadLine().then((data) => {
            setBsoDeadLineAgent(
                data.filter((element) => element.agent.id == id)
            );
        });

        getBsoList().then((data) => {
            setBsoList(
                data.results.filter((element) => element.agent.id == id)
            );
        });

        getAgent(id).then((data) => {
            setAgent(data);
            setAgentName(data.name);
            setAgentPhone(data.phone);
            setAgentEmail(data.email);
            setAgentLocation(data.location);
            setAgentStorageTime(data.storage_time);
            setAgentType(data.type);
            setAgentLogo(data.logo);
            setAgentFinancial(data.financial);
            changeButton();
            setAgentFinancialName(data.financial.name);
            setIdFp(data.financial.id);
            setComments(data.comments);
        });
    }, []);

    /* Функция смены загрузки логотипа на удаление логотипа*/
    function changeButton() {
        const loadLogo = document.getElementById("imgLogo");
        const atribute = loadLogo.getAttribute("src");
        if (atribute.includes("defaultLogo")) {
            document.getElementById("loadInput").classList.remove("input_none");
        } else {
            document.getElementById("deleteLogo").classList.remove("btn_none");
        }
    }

    /*Удаление агента и переход на страницу всех агентов*/
    const navigate = useNavigate();
    function deleteAgentCard() {
        deleteAgent(id);
        navigate("/agents/Agent");
    }

    function remakeAgent() {
        let agentChanges = {
            phone: document.getElementById("agentInputPhone").value,
            email: document.getElementById("agentInputEmail").value,
            location: document.getElementById("agentInputLocation").value,
            type: document.getElementById("agentType").value,
            storage_time: document.getElementById("agentInputStorageTime")
                .value,
        };
        changeAgent(id, agentChanges).then((data) => {
            getAgent(id).then((data) => {
                setAgent(data);
                setAgentName(data.name);
                setAgentPhone(data.phone);
                setAgentEmail(data.email);
                setAgentLocation(data.location);
                setAgentStorageTime(data.storage_time);
                setAgentType(data.type);
                setAgentLogo(data.logo);
                setAgentFinancial(data.financial);
                changeButton();
                setAgentFinancialName(data.financial.name);
                setIdFp(data.financial.id);
                setComments(data.comments);
            });
        });
    }

    /*Изменение данных агента */
    function handleChange() {
        setAgentName(document.getElementById("agentInputName").value);
        setAgentPhone(document.getElementById("agentInputPhone").value);
        setAgentEmail(document.getElementById("agentInputEmail").value);
        setAgentLocation(document.getElementById("agentInputLocation").value);
        setAgentType(document.getElementById("agentType").value);
        setAgentStorageTime(
            document.getElementById("agentInputStorageTime").value
        );
    }

    /*Добавление кнопок загрузки лого и отмены*/
    function createTwoButton() {
        document
            .getElementById("createTwoButtonYesHidden")
            .classList.remove("btn_none");
        document
            .getElementById("createTwoButtonNoHidden")
            .classList.remove("btn_none");
    }

    /*Добавление инпута загрузки логотипа*/
    function closeFileInput() {
        document

            .getElementById("createTwoButtonYesHidden")
            .classList.add("btn_none");
        document
            .getElementById("createTwoButtonNoHidden")
            .classList.add("btn_none");
    }
    /*Смена(удаление) логотипа на дефолтное*/
    function changeLogo() {
        const changeLogotip = (document.getElementById("imgLogo").src =
            "http://151.248.122.207/static/agents/img/defaultLogo.jpg");
        document.getElementById("deleteLogo").classList.add("btn_none");
        changeButton();
    }

    /*Загрузка нового логотипа*/
    function loadFile() {
        let inputFile = document.getElementById("loadInput").files[0];
        addAgentLogo(id, inputFile).then((data) => {
            setAgentLogo(data.logo);
        });
    }
    function showNewRedactor(e) {
        sessionStorage.setItem("fid", e.target.dataset.id);
    }
    function addNewComment() {
        let newComment = {
            comments: document.getElementById("agentComments").value,
        };

        addComment(id, newComment).then((data) => {});
    }

    return (
        <div className="container">
            <div className="container-agent">
                <input
                    className="input_Agent-Name"
                    id="agentInputName"
                    onChange={handleChange}
                    type="text"
                    value={agentName}
                />
                <p className="container-agent__p">
                    Телефон:{" "}
                    <input
                        className="input container-agent__input"
                        id="agentInputPhone"
                        onChange={handleChange}
                        type="text"
                        value={agentPhone}
                    />
                </p>
                <p className="container-agent__p">
                    Почта:{" "}
                    <input
                        className="input container-agent__input"
                        id="agentInputEmail"
                        onChange={handleChange}
                        type="text"
                        value={agentEmail}
                    />
                </p>
                <p className="container-agent__p">
                    Местоположение:{" "}
                    <input
                        className="input container-agent__input"
                        id="agentInputLocation"
                        onChange={handleChange}
                        type="text"
                        value={agentLocation}
                    />
                </p>
                <p className="container-agent__p">
                    Зарегестрирован:{" "}
                    <input
                        className="input container-agent__input "
                        type="text"
                        value={agent.date_at}
                    />
                </p>
                <p className="container-agent__p">
                    Фин.Политика:{" "}
                    <Link
                        onClick={showNewRedactor}
                        to={`/FinPolitic`}
                        data-id={idFP}
                        className="link container-agent__link"
                    >
                        {agentFinancialName}
                    </Link>
                </p>
                <p className="container-agent__p">
                    Срок хранения:{" "}
                    <input
                        className="input container-agent__input"
                        id="agentInputStorageTime"
                        onChange={handleChange}
                        type="text"
                        value={agentStorageTime}
                    />
                </p>
                <p className="container-agent__p">
                    {" "}
                    Тип агента:{" "}
                    <select
                        value={agentType}
                        id="agentType"
                        className="select container-agent__input "
                        onChange={handleChange}
                    >
                        <option value="C">Физ.Лицо</option>
                        <option value="B">Юр.Лицо</option>
                    </select>
                </p>
                <p className="container-agent__p"> Комментарии: </p>

                <p>
                    <textarea
                        className="container-agent__textarea"
                        id="agentComments"
                        cols="60"
                        rows="10"
                        onBlur={addNewComment}
                        value={comments}
                    ></textarea>
                </p>
                <div className="">
                    <img
                        className="container-agent__logo"
                        id="imgLogo"
                        src={agentLogo}
                        alt="Agent-Logo"
                    />
                    <button
                        onClick={changeLogo}
                        id="deleteLogo"
                        className=" btn container__btn"
                    >
                        Удалить логотип
                    </button>
                    <input
                        onInput={createTwoButton}
                        type="file"
                        id="loadInput"
                        className="input"
                    ></input>
                    <button
                        onClick={loadFile}
                        id="createTwoButtonYesHidden"
                        className="btn btn_none container__btn"
                    >
                        Загрузить
                    </button>
                    <button
                        onClick={closeFileInput}
                        id="createTwoButtonNoHidden"
                        className="btn btn_none container__btn"
                    >
                        Отмена
                    </button>
                </div>
                <button
                    className="btn container__btn"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Удалить агента
                </button>
                <button onClick={remakeAgent} className="btn container__btn">
                    Сохранить
                </button>

                <ReactModal
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    Вы уверены?
                    <button
                        className="btn container__btn"
                        onClick={deleteAgentCard}
                    >
                        Да
                    </button>
                    <button
                        className="btn container__btn"
                        onClick={() => setShowModal(false)}
                    >
                        Нет
                    </button>
                </ReactModal>
            </div>

            <table className="table container__table">
                <thead>
                    <tr>
                        <th>Общее колличество БСО</th>
                        <th>Закончится через: 7 дней</th>
                        <th>Закончится через: 2 дня</th>
                        <th>Просрочен</th>
                    </tr>
                </thead>
                <tbody>
                    <BsoDeadLineAgentsList
                        bsoDeadLineAgent={bsoDeadLineAgent}
                    />
                </tbody>
            </table>

            <table className="table container__table">
                <thead>
                    <tr>
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
                    <BsoAgentList bsoList={bsoList} />
                </tbody>
            </table>
        </div>
    );
}

export { AgentCard };
