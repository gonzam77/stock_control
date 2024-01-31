import React from "react";
import styles from "./Paginate.module.css"

export default function PaginateNative({ productsPerPage, products, paginate, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(products / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    function handlePrev(event) {
        if (currentPage > 1) {
            paginate(currentPage - 1)
        }
    }
    function handleNext(event) {
        if (currentPage < pageNumbers.length) {
            paginate(currentPage + 1)
        }
    }

    return (
        <div className={styles.container}>
            {
                pageNumbers.length ?
                    <button className={styles.prevPageButton} onClick={handlePrev}>Prev</button> :
                    null
            }
            {pageNumbers &&
                pageNumbers?.map((number, index) => {
                    return (
                        <button key={index} className={styles.paginate} onClick={() => paginate(number)}>{number}</button>
                    )
                })}
            {
                pageNumbers.length ?
                    <button className={styles.nextPageButton} onClick={handleNext}>Next</button> :
                    null
            }
        </div>
    )
}