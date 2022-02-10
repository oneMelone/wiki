import { Modal, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';

import ResetPasswordForm from './reset-password-form.js';
import { hexMd5, KEY } from '../../../util/md5.js';

function ResetPasswordButton(props) {
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
    axios.post("/user/reset-password", {
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
        重置密码
      </Button>
      <Modal
        title="重置密码"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <ResetPasswordForm id={props.id} setForm={setForm} />
      </Modal>
    </>
  );
}

export default ResetPasswordButton;