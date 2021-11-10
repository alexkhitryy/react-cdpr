import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectProduct } from "../../../store/actions/productsActions";

interface ProductProps {
  date: string;
  description: string;
  email: string;
  id: number;
  name: string;
  quantity: number;
  setModalOpen: any;
}

const ProductComponent: FunctionComponent<ProductProps> = ({
  id,
  name,
  quantity,
  date,
  description,
  email,
  setModalOpen,
}): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{date}</td>
        <td>{description}</td>
        <td>{email}</td>
        <td className="btn-cell">
          <button
            className="main-btn table-btn"
            onClick={() => {
              dispatch(selectProduct(id));
              navigate(`/product?id=${id}`);
            }}
          >
            EDIT
          </button>
        </td>
        <td className="btn-cell">
          <button
            className="main-btn table-btn"
            onClick={() => {
              setModalOpen(true);
              dispatch(selectProduct(id));
            }}
          >
            DELETE
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductComponent;
