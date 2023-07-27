import { Agent } from "./Pages/Agent";
import { Bso } from "./Pages/Bso";
import { FinPolitic } from "./Pages/FinPolitic";
import { Administration } from "./Pages/Administration";
import { Sales } from "./Pages/Sales";
import { Statistic } from "./Pages/Statistic";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Search } from "./components/Search.jsx";
import { AgentCard } from "./Pages/AgentCard";
import { SalesCard } from "./Pages/SalesCard";
import { SearchCard } from "./Pages/SearchCard";

function App() {
    return (
        <div className="App">
            <Router>
                <Search />
                <Header />
                <Routes>
                    <Route path="/agents/Agent" element={<Agent />} />
                    <Route path="/agents/SearchCard" element={<SearchCard />} />
                    <Route
                        path="/agents/AgentCard/:id"
                        element={<AgentCard />}
                    />
                    <Route
                        path="/agents/SalesCard/:id"
                        element={<SalesCard />}
                    />
                    <Route path="/agents/SalesCard" element={<SalesCard />} />
                    <Route path="/agents/Bso" element={<Bso />} />
                    <Route path="/agents/FinPolitic" element={<FinPolitic />} />
                    <Route
                        path="/agents/Administration"
                        element={<Administration />}
                    />
                    <Route path="/agents/Sales" element={<Sales />} />
                    <Route path="/agents/Statistic" element={<Statistic />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
