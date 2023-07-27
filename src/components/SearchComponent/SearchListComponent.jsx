import { SearchAgent } from "./SearchAgent";
import { SearchBso } from "./SearchBso";
import { SearchFinancial } from "./SearchFinancial";
import { SearchSales } from "./SearchSales";

function SearchListComponent({ searchList }) {
    if (searchList) {
        return (
            <div className="container">
                {searchList.agents.length > 0 ? (
                    <div className="table container_table">
                        <h3>Агент</h3>
                        <table>
                            <tbody>
                                <SearchAgent searchList={searchList.agents} />
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p></p>
                )}
                {searchList.bso.length > 0 ? (
                    <div className="table container_table">
                        <h3>БСО</h3>
                        <table>
                            <tbody>
                                <SearchBso searchList={searchList.bso} />
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p></p>
                )}
                {searchList.financials.length > 0 ? (
                    <div className="table container_table">
                        <table>
                            <thead>
                                <th id="theadNone">Фин. Политика</th>
                            </thead>
                            <tbody>
                                <SearchFinancial
                                    searchList={searchList.financials}
                                />
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p></p>
                )}
                {searchList.sales.length > 0 ? (
                    <div className="table container_table">
                        <h3>Продажи</h3>

                        <tbody>
                            <SearchSales searchList={searchList.sales} />
                        </tbody>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        );
    }
}

export { SearchListComponent };
