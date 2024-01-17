import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import Card from "../cards/card/card";
import styles from "./pagination.module.css";
import { useSelector } from "react-redux";

function AdvancedExample() {
  const products = useSelector((state) => state.products);
  const itemsPerPage = 8; // Puedes ajustar esto según tus necesidades
  const totalItems = products.length; // Puedes ajustar esto según tus necesidades
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const forrr = () => {
    for (let i = 0; i < products.length; i++) { 
      return(
          <Card
            id={products[i].id}
            code={products[i].code}
            name={products[i].name}
            image={products[i].image}
            price={products[i].price}
            stock={products[i].stock}
            marca={products[i].marca}
            description={products[i].description}
            supplier={products[i].supplier}
          />
      )    
    }
  }

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Puedes realizar acciones adicionales cuando cambia la página, como cargar datos para la página actual
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cards}>
          {forrr()}
        </div>
      </div>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {renderPaginationItems()}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </>
  );
}

export default AdvancedExample;
