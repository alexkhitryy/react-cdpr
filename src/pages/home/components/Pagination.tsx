import React, { FunctionComponent } from "react";

interface PaginationProps {
  allProducts: number;
  changePage: (pageNumber: number) => void;
  currentPage: number;
  productsNumberOnPage: number;
}
const Pagination: FunctionComponent<PaginationProps> = ({
  allProducts,
  changePage,
  currentPage,
  productsNumberOnPage,
}): JSX.Element => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(allProducts / productsNumberOnPage); i++) {
    pages.push(i);
  }

  return (
    <div className={"pagination"}>
      <div className={"pagination-container"}>
        {pages.map((number, index) => (
          <button
            className={`main-btn page-btn ${
              currentPage === number ? "active" : ""
            }`}
            key={index}
            onClick={() => changePage(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
