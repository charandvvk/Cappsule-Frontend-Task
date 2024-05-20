import React, { useState } from "react";
import classes from "./DisplayCard.module.css";
import Options from "../Options/Options";

export default function DisplayCard({ name, forms, strengths, packagings }) {
    // State variables for managing selected indices
    const [currFormIndex, setCurrFormIndex] = useState(0);
    const [currStrengthIndex, setCurrStrengthIndex] = useState(0);
    const [currPackagingIndex, setCurrPackagingIndex] = useState(0);

    // Extracting display data based on selected indices
    const displayStrengths = strengths[currFormIndex];
    const displayPackagings = packagings[currFormIndex][currStrengthIndex];

    // Extracting current form, strength, packaging, and least price
    const currForm = forms[currFormIndex].form;
    const currStrength = displayStrengths[currStrengthIndex].strength;
    const currPackaging = displayPackagings[currPackagingIndex].packaging;
    const leastPrice = displayPackagings[currPackagingIndex].leastPrice;

    // Function to handle option click
    const handleClickOption = (type, index) => {
        if (type === "form") {
            // Updating current form index and resetting other indices
            setCurrFormIndex(index);
            setCurrStrengthIndex(0);
            setCurrPackagingIndex(0);
        } else if (type === "strength") {
            // Updating current strength index and resetting packaging index
            setCurrStrengthIndex(index);
            setCurrPackagingIndex(0);
        } else setCurrPackagingIndex(index); // Updating current packaging index
    };

    return (
        <div className={classes.card}>
            <div className={classes["column-1"]}>
                <div className={classes.row}>
                    <div className={classes.label}>Form :</div>
                    <Options
                        options={forms}
                        type="form"
                        handleClickOption={handleClickOption}
                        currIndex={currFormIndex}
                    />
                </div>
                <div className={classes.row}>
                    <div className={classes.label}>Strength :</div>
                    <Options
                        options={displayStrengths}
                        type="strength"
                        handleClickOption={handleClickOption}
                        currIndex={currStrengthIndex}
                    />
                </div>
                <div className={classes.row}>
                    <div className={classes.label}>Packaging :</div>
                    <Options
                        options={displayPackagings}
                        type="packaging"
                        handleClickOption={handleClickOption}
                        currIndex={currPackagingIndex}
                    />
                </div>
            </div>
            <div className={classes["column-2"]}>
                <div className={classes.name}>{name}</div>
                <div className={classes.combination}>
                    {currForm} | {currStrength} | {currPackaging}
                </div>
            </div>
            {leastPrice ? (
                <div
                    className={`${classes["column-3"]} ${classes["column-3--available"]}`}
                >
                    From<span className={classes.rupee}>₹</span>
                    {leastPrice}
                </div>
            ) : (
                <div
                    className={`${classes["column-3"]} ${classes["column-3--unavailable"]}`}
                >
                    No stores selling this product near you
                </div>
            )}
        </div>
    );
}
