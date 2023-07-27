import { loadPolicies } from "../../api";
import { useState } from "react";
import { ModalLoadInfo } from "./ModalInfoLoad";

function ModalLoadFile({ active, setActive }) {
    const [modalInfoActive, setModalInfoActive] = useState();
    const [modalInfo, setModalInfo] = useState();
    function loadFilePolicy() {
        loadPolicies().then((data) => {
            setModalInfo(data);
        });
    }

    return (
        <div className="container">
            <div
                className={active ? "modalLoad active" : "modalLoad"}
                onClick={() => setActive(false)}
            >
                <div
                    className={
                        active ? "modalLoadContent active" : "modalLoadContent"
                    }
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        className="screenShot"
                        src="LoadPolicyExample.png"
                        alt=""
                    />
                    <p className="pHelp" style={{ textAlign: "center" }}>
                        В первой строке должны находиться заголовки
                        столбцов(заголовки должны идти подряд без пустых
                        полей).Импортировать можно только первый
                        лист.Поддерживаеыме форматы: .xl, .xlsx. Максимальный
                        размер файлов 50 mb или 5000 строк.
                    </p>

                    <input
                        className="input container__input"
                        type="file"
                        name="file"
                        id="loadFilePolicy"
                        onInput={loadFilePolicy}
                        onChange={() => setModalInfoActive(true)}
                        onClick={() => setActive(false)}
                    />
                    <button
                        className="btn container__btn"
                        onClick={() => setActive(false)}
                    >
                        Отмена
                    </button>
                </div>
            </div>{" "}
            <>
                <ModalLoadInfo
                    activate={modalInfoActive}
                    setActivate={setModalInfoActive}
                    props={modalInfo ? modalInfo : "Error"}
                />
            </>
        </div>
    );
}
export { ModalLoadFile };
