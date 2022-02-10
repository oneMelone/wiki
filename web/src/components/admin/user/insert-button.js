import { Modal, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';

import UserForm from './user-form';
import { hexMd5, KEY } from '../../../util/md5';

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
    let md5Password = hexMd5(form.getFieldsValue().password + KEY);
    axios.post("/user/save", {
      ...form.getFieldsValue(),
      password: md5Password,
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
        title="电子书表单"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <UserForm setForm={setForm} />
      </Modal>
    </>
  );
}

export default InsertButton;