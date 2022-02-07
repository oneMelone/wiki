import { Modal, Button, message } from 'antd';
import React from 'react';
import axios from 'axios';

import EbookForm from './ebook-form';

function EditButton(props) {
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
      docCount: props.docCount,
      viewCount: props.viewCount,
      voteCount: props.voteCount,
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
        编辑
      </Button>
      <Modal
        title="电子书表单"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <EbookForm name={props.name} cover={props.cover} category1Id={props.category1Id} category2Id={props.category2Id} description={props.description} setForm={setForm} />
      </Modal>
    </>
  );
}

export default EditButton;