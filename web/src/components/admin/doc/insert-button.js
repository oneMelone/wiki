import { Modal, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';

import DocForm from './doc-form';
import { parse } from "query-string"
import { useLocation } from 'react-router-dom';

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

  let ebookId = parse(useLocation().search).ebookId
  const handleOk = () => {
    setConfirmLoading(true);
    let postParams = {
      ...form.getFieldsValue(),
      id: props.id,
      ebookId: ebookId,
    }
    console.log("postParams =", postParams);
    axios.post("/doc/save", postParams).then(
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