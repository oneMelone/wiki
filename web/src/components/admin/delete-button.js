import { Button, Popconfirm } from 'antd';
import React from 'react';
import axios from 'axios';

function DeleteButton(props) {
  function confirm(e) {
    console.log(e);
    deleteEbook();
  }

  function cancel(e) {
    console.log(e);
  }

  function deleteEbook() {
    axios.delete("/ebook/delete/" + props.id).then(
      (response) => {
        const data = response.data;
        if (data.success) {
          window.location.reload();
        }
      }
    )
  }

  return (
    <>
    <Popconfirm
      title="Are you sure to delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>
        删除
      </Button>
    </Popconfirm>
    </>
  );
}

export default DeleteButton;