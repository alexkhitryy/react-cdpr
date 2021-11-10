import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProductsList,
  resetSelected,
} from "../../store/actions/productsActions";
import { productsSelector } from "../../store/selectors/productsSelector";
import { Product } from "../../typings/product";
import { ConfirmationModal, Pagination, ProductComponent } from "./components";
import "./style.css";

const Home: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all } = useSelector(productsSelector);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(all);
  const [sortingKey, setSortingKey] = useState<string>("id");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsNumberOnPage, setProductsNumberOnPage] = useState<number>(10);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const tableHeaderArray = [
    "Id",
    "Name",
    "Quantity",
    "Date",
    "Description",
    "Email",
    "",
    "",
  ];
  const productsNumberOnPageArray = [5, 10, 15, 20];

  const lastProduct = currentPage * productsNumberOnPage;
  const firstProduct = lastProduct - productsNumberOnPage;
  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  useEffect(() => {
    setSortedProducts(all);
  }, [all]);

  const compareObjects = (object1: any, object2: any, key: string) => {
    const obj1 = object1[key];
    const obj2 = object2[key];
    return obj1 > obj2 ? 1 : -1;
  };

  const handleSearch = useCallback(
    (event: any) => {
      setSortedProducts(
        all.filter((product: Product) =>
          Object.values(product).some((value) =>
            String(value)
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        )
      );
    },
    [all]
  );

  const renderProducts = useCallback(() => {
    if (sortedProducts?.length === 0) {
      return (
        <tr>
          <td colSpan={8} className="no-products">
            No products match your request
          </td>
        </tr>
      );
    }
    return sortedProducts
      ?.sort((product1, product2) => {
        return compareObjects(product1, product2, sortingKey);
      })
      ?.slice(firstProduct, lastProduct)
      ?.map(({ id, name, quantity, date, description, email }: Product) => (
        <ProductComponent
          date={date}
          description={description}
          email={email}
          id={id}
          key={id}
          name={name}
          quantity={quantity}
          setModalOpen={setModalOpen}
        />
      ));
  }, [sortedProducts, sortingKey, firstProduct, lastProduct]);

  return (
    <div className="page-container">
      <div className="top-container">
        <div className="search-component">
          <label htmlFor="search">Search:</label>
          <input
            className="searchbar"
            id="search"
            type="search"
            onChange={handleSearch}
          />
        </div>
        <button
          className="main-btn add-btn"
          onClick={() => {
            navigate("/product");
            dispatch(resetSelected());
          }}
        >
          Add a new product
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {tableHeaderArray.map((element, index) => (
                <th
                  className={`${
                    element.toLowerCase() === sortingKey ? "select" : ""
                  }`}
                  id={element.toLowerCase()}
                  key={index}
                  onClick={(event: any) => setSortingKey(event?.target.id)}
                >
                  {element}
                  {element.toLowerCase() === sortingKey && ` ↓`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>

      <div className="select-container">
        <select
          name="products-per-page"
          id="products-per-page"
          defaultValue={productsNumberOnPage}
          onChange={(event: any) => setProductsNumberOnPage(event.target.value)}
        >
          {productsNumberOnPageArray.map((number, index) => (
            <option key={index} value={number}>
              {number}
            </option>
          ))}
          <option
            value={all.length}
            onClick={() => setProductsNumberOnPage(all.length)}
          >
            all
          </option>
        </select>
      </div>

      <Pagination
        allProducts={sortedProducts.length}
        changePage={changePage}
        currentPage={currentPage}
        productsNumberOnPage={productsNumberOnPage}
      />
      {modalOpen && (
        <ConfirmationModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Home;
