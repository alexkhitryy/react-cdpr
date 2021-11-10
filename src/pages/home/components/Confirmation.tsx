import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  resetSelected,
} from "../../../store/actions/productsActions";
import { productsSelector } from "../../../store/selectors/productsSelector";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: any;
}

const ConfirmationModal: FunctionComponent<ModalProps> = ({
  modalOpen,
  setModalOpen,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { selected } = useSelector(productsSelector);

  const handleClose = (event: any) => {
    event.target.classList.contains("modal-shadow") && setModalOpen(false);
  };

  return (
    <div className="modal-shadow" onClick={handleClose}>
      <div className="confirmation-modal">
        <h3>Are you sure you want to remove {selected?.name}?</h3>
        <div>
          <button
            className="main-btn modal-btn"
            onClick={() => {
              dispatch(deleteProduct(selected?.id));
              setModalOpen(false);
            }}
          >
            yes
          </button>
          <button
            className="main-btn modal-btn"
            onClick={() => {
              dispatch(resetSelected());
              setModalOpen(false);
            }}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
