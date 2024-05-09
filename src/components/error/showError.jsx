import { Modal } from "antd";
import { useState } from "react";

const useShowError = () => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const showError = (err) => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return {
    showError,
    closeModal,
    render: <Modal open={open}></Modal>,
  };
};

export default useShowError;
