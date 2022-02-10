import { useState, useEffect } from "react";
import { Layout, message, Table, Space } from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import EditButton from "../../components/admin/user/edit-button";
import DeleteButton from "../../components/admin/user/delete-button";
import QueryUser from "../../components/admin/user/query";
import ResetPasswordButton from "../../components/admin/user/reset-password-button";

function AdminUser() {
  const PAGE_SIZE = 8;
  const [userData, setUserData] = useState();
  const [totalUserNum, setTotalUserNum] = useState();
  useEffect(() => {
    axios.get("/user/list?page=" + 1 + "&size=" + PAGE_SIZE).then(
      response => {
        if (response.data.success) {
          response.data.content.list.forEach(element => {
            element.key = element.id;
          });
          setUserData(response.data.content.list);
          setTotalUserNum(response.data.content.total);
        } else {
          message(response.data.message);
        }
      }
    )
  }, []);

  const columns = [
    {
      title: '登入名称',
      dataIndex: 'loginName',
      key: 'loginName',
    },
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">  
          <EditButton name={record.name} loginName={record.loginName} password={record.password} id={record.id} />
          <ResetPasswordButton id={record.id} />
          <DeleteButton id={record.id} />
        </Space>
      ),
    },
  ];

  function getPageContent(page, pageSize) {
    axios.get("/user/list?page=" + page + "&size=" + pageSize).then(
      response => {
        if (response.data.success) {
          response.data.content.list.forEach(element => {
            element.key = element.id;
          });
          setUserData(response.data.content.list);
          setTotalUserNum(response.data.content.total);
        } else {
          message(response.data.message);
        }
      }
    )
  }

  return (
    <Layout>
      <Content style={{ padding: '10px 30px' }}>
      <QueryUser setData={setUserData}/>
      </Content >
      <Table columns={columns} dataSource={userData} pagination={{total: totalUserNum, pageSize: PAGE_SIZE, onChange: getPageContent}}/>
    </Layout>
  )
}

export default AdminUser;