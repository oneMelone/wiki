import { Layout, Table, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminEbook() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get("/ebook/list").then(
      (response) => {
        let content = response.data.content;
        content.forEach(element => {
          element.key = element.id;
        });
        setData(content)
      }
    )
  }, [])

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: cover => (
        <img src={cover} />
      )
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类1',
      dataIndex: 'category1Id',
      key: 'category1Id',
    },
    {
      title: '分类2',
      dataIndex: 'category2Id',
      key: 'category2Id',
    },
    {
      title: '文档数',
      key: 'docCount',
      dataIndex: 'docCount',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  return (
    <Layout>
      <Table columns={columns} dataSource={data} />
    </Layout>
  )
}

export default AdminEbook;