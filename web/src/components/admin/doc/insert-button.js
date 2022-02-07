import { Modal, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';

import DocForm from './doc-form';

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
    axios.post("/doc/save", {
      ...form.getFieldsValue(),
      id: props.id,
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
        title="分类表单"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <DocForm setForm={setForm} />
      </Modal>
    </>
  );
}

export default InsertButton;