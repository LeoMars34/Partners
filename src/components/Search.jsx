import { useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    /*Переход на страницу поиска */
    function enterSearch() {
        navigate("/agents/SearchCard");
    }

    return (
        <div className="container-search">
            <input
                id="searchInput"
                type="text"
                placeholder="  Поиск..."
                className="input_search container-search__input"
            />
            <button
                id="btnSearch"
                className="btn container-search__btn container-search__btn_back"
                onClick={enterSearch}
            >
                Поиск
            </button>
            <button className="btn btn container-search__btn " onClick={goBack}>
                Назад
            </button>
        </div>
    );
}

export { Search };
