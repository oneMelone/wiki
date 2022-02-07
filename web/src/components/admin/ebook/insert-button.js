import { Modal, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';

import EbookForm from './ebook-form';

function InsertButton(props) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  let form;
  const setForm = (data) => {
    form = data;
  }
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    axios.post("/ebook/save", {
      ...form.getFieldsValue(),
      id: props.id,
      docCount: 0,
      viewCount: 0,
      voteCount: 0,
    }).then(
      (response) => {
        const data = response.data;
        if (data.success) {
          setVisible(false);
          setConfirmLoading(false);

          window.location.reload();
        } else {
          message.error(data.message);
          setConfirmLoading(false);
        }
      }
    )
  };

  const handleCancel = () => {
    setVisible(false);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        新增
      </Button>
      <Modal
        title="电子书表单"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <EbookForm setForm={setForm} />
      </Modal>
    </>
  );
}

export default InsertButton;