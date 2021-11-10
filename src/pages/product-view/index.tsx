import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  checkProducts,
  replaceProduct,
  resetSelected,
} from "../../store/actions/productsActions";
import { DateTime } from "luxon";
import "./style.css";
import { productsSelector } from "../../store/selectors/productsSelector";

interface Errors {
  email: string;
  name: string;
  quantity: string;
}

const ProductView: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alreadyExists, selected } = useSelector(productsSelector);
  const [newProduct, setNewProduct] = useState<any>({
    description: selected?.description || "",
    email: selected?.email || "",
    name: selected?.name || "",
    quantity: selected?.quantity || 0,
    date: DateTime.fromISO(selected?.date).toISODate() || "",
  });
  const [error, setError] = useState<Errors>({
    email: "",
    name: "",
    quantity: "",
  });

  useEffect(() => {
    !selected.id && dispatch(checkProducts(newProduct.name));
  }, [dispatch, newProduct.name, selected]);

  const handleNameValidation = useCallback(
    (event: any) => {
      event.target.value.length === 0 &&
        setError({ ...error, name: "Name must not be empty" });
      event.target.value.length > 0 &&
        event.target.value.length < 5 &&
        setError({ ...error, name: "Name must contain at least 5 characters" });
      alreadyExists && setError({ ...error, name: "Name already exists" });
      event.target.value.length > 5 &&
        !alreadyExists &&
        setError({ ...error, name: "" });
    },
    [alreadyExists, error]
  );

  const handleQuantityValidation = useCallback(() => {
    return typeof newProduct.quantity !== "number"
      ? setError({ ...error, quantity: "Quantity must be a number" })
      : setError({ ...error, quantity: "" });
  }, [newProduct.quantity, error]);

  const handleEmailValidation = useCallback(
    (event: any) => {
      return event.target.value.length === 0
        ? setError({ ...error, email: "Email must not be empty" })
        : setError({ ...error, email: "" });
    },
    [error]
  );

  const handleInput = (event: any) => {
    if (event.target.name === "quantity") {
      setNewProduct({ ...newProduct, quantity: Number(event.target.value) });
    } else
      setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const isFormValid = (): boolean =>
    !alreadyExists &&
    error.name === "" &&
    error.email === "" &&
    error.quantity === "";

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (isFormValid()) {
      selected.id
        ? dispatch(replaceProduct(selected.id, newProduct))
        : dispatch(
            addProduct({
              ...newProduct,
              date: DateTime.fromISO(newProduct.date).toUTC().toString(),
            })
          );
      setNewProduct({
        description: "",
        email: "",
        name: "",
        quantity: 0,
      });
      dispatch(resetSelected());
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="block">
        <label htmlFor="name">Name*:</label>
        <input
          disabled={selected.name ? true : false}
          id="name"
          name="name"
          type="text"
          onBlur={handleNameValidation}
          onChange={handleInput}
          value={newProduct.name}
        />
        <span>{error.name}</span>
      </div>

      <div className="block">
        <label htmlFor="quantity">Quantity*:</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          onBlur={handleQuantityValidation}
          onChange={handleInput}
          value={newProduct.quantity}
        />
        <span>{error.quantity}</span>
      </div>

      <div className="block">
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          name="date"
          type="date"
          onChange={handleInput}
          value={newProduct.date}
        />
        <span>{error.quantity}</span>
      </div>

      <div className="block">
        <label htmlFor="email">Email*:</label>
        <input
          id="email"
          name="email"
          type="email"
          onBlur={handleEmailValidation}
          onChange={handleInput}
          value={newProduct.email}
        />
        <span>{error.email}</span>
      </div>

      <div className="block">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={handleInput}
          value={newProduct.description}
        />
      </div>

      <div className="btn-block">
        <button
          className="main-btn"
          onClick={() => {
            navigate("/");
            dispatch(resetSelected());
          }}
        >
          Back
        </button>
        <button className="main-btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProductView;
