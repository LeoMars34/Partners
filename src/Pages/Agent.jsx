import { useState, useEffect } from "react";
import { SmallCardList } from "../components/AgentsComponent/SmallCardList";
import { getAllAgents, addAgent } from "../api";
import { useNavigate } from "react-router-dom";

function Agent() {
    const [catalog, setCatalog] = useState([]);
    const [newCatalog, setNewCatalog] = useState([]);

    useEffect(() => {
        getAllAgents().then((data) => {
            setCatalog(data);
            setNewCatalog(data);
        });
    }, []);

    /*Добавление input фильтра агентов*/
    function createInput() {
        let hiddenInput = document.getElementById("hiddenInput");
        hiddenInput.classList.remove("input_none");
    }
    function createButton() {
        let hiddenButton = document.getElementById("hiddenButton");
        hiddenButton.classList.remove("hiddenButton");
    }
    function returnList() {
        let hiddenButton = document.getElementById("hiddenButton");
        hiddenButton.classList.add("btn_none");
        let hiddenInput = document.getElementById("hiddenInput");
        hiddenInput.classList.add("input_none");
        setNewCatalog(catalog);
    }

    function filterAgent() {
        if (document.getElementById("hiddenInput").value === "") {
            setNewCatalog(catalog);
            return;
        }

        const filterCatalog = catalog
            .filter((items) => items.location)
            .filter((items) =>
                items.location.includes(
                    document.getElementById("hiddenInput").value
                )
            );
        setNewCatalog(filterCatalog);
    }

    const navigate = useNavigate();
    function newAgent() {
        addAgent().then((data) => {
            navigate(`/AgentCard/${data.id}`);
        });
    }
    function closeRegionInput() {
        document.getElementById("hiddenInput").classList.add("input_none");
        document.getElementById("filterSelect").value = "0";
    }

    return (
        <div className="container">
            <div className="container-agents-cards" id="newDiv">
                <SmallCardList catalog={newCatalog} />
            </div>
            <select
                className="select container-agents-cards__select"
                id="filterSelect"
                onChange={createInput}
            >
                <option value="0">Фильтр</option>
                <option value="1">Регион</option>
            </select>
            <input
                onInput={filterAgent}
                onChange={createButton}
                autoComplete="off"
                type="text"
                id="hiddenInput"
                className="input_none container__input_region"
                placeholder="   Поиск агента по региону"
                onBlur={closeRegionInput}
            />
            <button
                onClick={newAgent}
                id="addAgent"
                className="btn container-agents-cards__btn"
            >
                Добавить
                <br />
                Агента
            </button>
            <button
                onClick={returnList}
                autoComplete="off"
                type="text"
                id="hiddenButton"
                className="btn btn_none"
            >
                X
            </button>
        </div>
    );
}

export { Agent };
