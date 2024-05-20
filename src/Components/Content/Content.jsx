import React from "react";
import classes from "./Content.module.css";
import Card from "../Card";

export default function Cards({ salts }) {
    return (
        <>
            {salts.length ? (
                <div className={classes.cards}>
                    {salts.map((salt, index) => (
                        <Card key={index} salt={salt} />
                    ))}
                </div>
            ) : (
                <div className={classes.text}>
                    <i>"</i> Find medicines with amazing discount
                    <i>"</i>
                </div>
            )}
        </>
    );
}
