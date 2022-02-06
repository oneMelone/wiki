import { Layout, Table, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

import EditButton from "../../components/admin/edit-button";
import InsertButton from "../../components/admin/insert-button";

function AdminEbook() {
  const PAGE_SIZE = 8;
  const [data, setData] = useState([])
  useEffect(() => {
    let params = {
      page: 1,
      size: PAGE_SIZE,
    }
    axios.get("/ebook/list?page=" + params.page + "&size=" + params.size).then(
      (response) => {
        let ebooks = response.data.content;
        ebooks.list.forEach(element => {
          element.key = element.id;
        });
        setData(ebooks)
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
      render: (_, record, index) => (
        <Space size="middle">  
          <EditButton name={record.name} cover={record.cover} category1Id={record.category1Id} docCount={record.docCount} category2Id={record.category2Id} description={data.list[index].description} viewCount={data.list[index].viewCount} voteCount={data.list[index].viewCount} id={data.list[index].id} />
          <a>删除</a>
        </Space>
      ),
    },
  ];

  function getPageContent(page, pageSize) {
    axios.get("/ebook/list?page=" + page + "&size=" + pageSize).then(
      (response) => {
        let ebooks = response.data.content;
        ebooks.list.forEach(element => {
          element.key = element.id;
        });
        setData(ebooks)
      }
    )
  }

  return (
    <Layout>
      <Table columns={columns} dataSource={data.list} pagination={{total: data.total, pageSize: PAGE_SIZE, onChange: getPageContent}}/>
      <InsertButton />
    </Layout>
  )
}

export default AdminEbook;