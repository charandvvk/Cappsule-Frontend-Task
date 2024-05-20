import React, { useState } from "react";
import classes from "./Search.module.css";
import search from "../../assets/search.svg";
import back from "../../assets/back.svg";

export default function Search({
    hasSalts,
    setSalts,
    setIsSearching,
    setError,
}) {
    const [input, setInput] = useState(""); // State variable for input value

    // Function to fetch salts from backend API
    const getSalts = async () => {
        // Checking if input is provided
        if (input) {
            setIsSearching(true);
            setError(null);
            try {
                // Fetching data from backend API
                const response = await fetch(
                    `https://backend.cappsule.co.in/api/v1/new_search?q=${input}&pharmacyIds=1,2,3`
                );
                const { data } = await response.json();
                setSalts(data.saltSuggestions);
                // Handling case when no search results are found
                if (!data.saltSuggestions.length)
                    setError("No matching search results for your medicine.");
            } catch {
                // Handling network or server errors
                setError(
                    "Unable to search your medicine. Please check your internet connection or try again later as the server may be down."
                );
            } finally {
                setIsSearching(false);
            }
        } else setError("Medicine name can't be empty."); // Handling empty input case
    };

    // Function to handle input value change
    const handleChangeInput = (event) => {
        setInput(event.target.value);
        setError(null);
    };

    // Function to handle back button click
    const handleClickBack = () => {
        setInput("");
        setSalts([]);
        setError(null);
    };

    // Function to handle Enter key press in input field
    const handleKeyDownInput = (event) => {
        event.key === "Enter" && getSalts();
    };

    return (
        <div className={classes.search}>
            <div>
                <img
                    src={hasSalts ? back : search}
                    alt={hasSalts ? "back" : "search"}
                    onClick={hasSalts ? handleClickBack : getSalts}
                />
            </div>
            <input
                type="text"
                placeholder="Type your medicine name here"
                value={input}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDownInput}
            />
            <button onClick={getSalts}>Search</button>
        </div>
    );
}
