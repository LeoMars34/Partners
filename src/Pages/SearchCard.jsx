import { search } from "../api";
import { useEffect, useState } from "react";
import { SearchListComponent } from "../components/SearchComponent/SearchListComponent";

function SearchCard() {
    const [searchList, setSearchList] = useState();
    let youLink = "?";

    if (document.getElementById("searchInput").value != "0") {
        youLink =
            youLink + `search=${document.getElementById("searchInput").value}&`;
    }

    useEffect(() => {
        search(youLink).then((data) => {
            setSearchList(data);
        });
    }, []);

    return (
        <div className="container">
            <SearchListComponent searchList={searchList} />
        </div>
    );
}

export { SearchCard };
