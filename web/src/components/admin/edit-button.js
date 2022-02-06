import { Modal, Button } from 'antd';
import React from 'react';

import EbookForm from './ebook-form';

function EditButton(props) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('test');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('test');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        编辑
      </Button>
      <Modal
        title="电子书表单"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <EbookForm name={props.name} cover={props.cover} />
      </Modal>
    </>
  );
}

export default EditButton;