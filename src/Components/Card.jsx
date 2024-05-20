import React from "react";
import DisplayCard from "./DisplayCard/DisplayCard";

// Function to find the least price among products
function findLeastPrice(products) {
    const leastPrice = products.reduce((minPrice, currProduct) => {
        const currMinPrice = currProduct
            ? Math.min(...currProduct.map((pharmacy) => pharmacy.selling_price))
            : Infinity;
        return Math.min(minPrice, currMinPrice);
    }, Infinity);
    return leastPrice === Infinity ? null : leastPrice;
}

export default function Card({ salt }) {
    // Destructuring salt_forms_json from salt object
    const { salt_forms_json: data } = salt;

    // Arrays to store strengths and packagings information
    const strengths = [];
    const packagings = [];

    // Generating forms, strengths, and packagings data from salt_forms_json
    const forms = Object.keys(data).map((form) => {
        const currFormPackagings = [];
        const currFormStrengths = Object.keys(data[form]).map((strength) => {
            const currStrengthPackagings = Object.keys(
                data[form][strength]
            ).map((packaging) => {
                const products = Object.values(data[form][strength][packaging]);
                const isAvailable = products.some((product) => product); // Checking if any product is available for the current packaging
                const leastPrice = findLeastPrice(products);
                return { packaging, isAvailable, leastPrice };
            });
            currFormPackagings.push(currStrengthPackagings);
            // Checking if any packaging is available for the current strength
            const isAvailable = currStrengthPackagings.some(
                (packaging) => packaging.isAvailable
            );
            return { strength, isAvailable };
        });
        packagings.push(currFormPackagings);
        strengths.push(currFormStrengths);
        // Checking if any strength is available for the current form
        const isAvailable = currFormStrengths.some(
            (strength) => strength.isAvailable
        );
        return { form, isAvailable };
    });

    return (
        <DisplayCard
            name={salt.salt}
            forms={forms}
            strengths={strengths}
            packagings={packagings}
        />
    );
}
