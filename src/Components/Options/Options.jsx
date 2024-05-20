import React, { useState } from "react";
import classes from "./Options.module.css";

export default function Options({
    options,
    type,
    handleClickOption,
    currIndex,
}) {
    const [showAll, setShowAll] = useState(false);
    const visibleOptions = showAll ? options : options.slice(0, 4);

    return (
        <>
            <div className={classes.options}>
                {visibleOptions.map((option, index) => (
                    <button
                        key={index}
                        className={`${classes.option}
                        } ${
                            classes[
                                `option--${
                                    index === currIndex ? "" : "not-"
                                }selected`
                            ]
                        } ${
                            classes[
                                `option--${
                                    option.isAvailable ? "" : "not-"
                                }available`
                            ]
                        }`}
                        onClick={() => handleClickOption(type, index)}
                    >
                        {option[type]}
                    </button>
                ))}
            </div>
            {options.length > 4 && (
                <button
                    className={classes.toggler}
                    onClick={() => setShowAll((prevState) => !prevState)}
                >
                    {showAll ? "hide" : "more"}..
                </button>
            )}
        </>
    );
}
