import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function DocAdminButton(props) {
  return (
    <Link to={"/admin/doc?ebookId=" + props.ebookId}>
      <Button type="primary">
        文档管理
      </Button>
    </Link>
  );
}

export default DocAdminButton;