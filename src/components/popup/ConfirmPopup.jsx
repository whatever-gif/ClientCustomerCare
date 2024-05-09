import { Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const ConfirmPopup = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    show: (content) => {
      setContent(content);
      setOpen(true);
    },
    hide: () => {
      setOpen(false);
    },
  }));

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {};

  return (
    <Modal open={open} onCancel={handleClose} onOk={handleSave}>
      <strong>{content}</strong>
    </Modal>
  );
});

export default ConfirmPopup;
