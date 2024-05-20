import { useState } from "react";
import classes from "./App.module.css";
import Search from "./Components/Search/Search";
import Content from "./Components/Content/Content";

function App() {
    const [salts, setSalts] = useState([]); // Stores the list of salts
    const [isSearching, setIsSearching] = useState(false); // Indicates whether a search is in progress
    const [error, setError] = useState(null); // Stores error message, if any

    return (
        <>
            <div className={classes.title}>Cappsule web development test</div>
            <Search
                hasSalts={salts.length}
                setSalts={setSalts}
                setIsSearching={setIsSearching}
                setError={setError}
            />
            <div className={classes.line}></div>
            {isSearching ? "Searching your medicine..." : error}
            <Content salts={salts} />
        </>
    );
}

export default App;
