import { Layout, Table, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

import EditButton from "../../components/admin/ebook/edit-button";
import DeleteButton from "../../components/admin/ebook/delete-button";
import QueryEbook from "../../components/admin/ebook/query";
import { Content } from "antd/lib/layout/layout";
import getNameById from "../../util/getNameById";
import DocAdminButton from "../../components/admin/ebook/doc-admin-button";

function AdminEbook() {
  const PAGE_SIZE = 8;
  let [data, setData] = useState([]);
  let [plainCategories, setPlainCategories] = useState([]);
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
    axios.get("/category/list?page=" + 1 + "&size=" + 100).then(
      (response) => {
        let categorys = response.data.content;
        categorys.list.forEach(element => {
          element.key = element.id;
        });
        plainCategories = categorys.list;
        setPlainCategories(categorys.list);
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
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => (
        <div>{getNameById(plainCategories, record.category1Id)} / {getNameById(plainCategories, record.category2Id)}</div>
      )
    },
    {
      title: '文档数',
      key: 'docCount',
      dataIndex: 'docCount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">  
          <EditButton name={record.name} cover={record.cover} category1Id={record.category1Id} docCount={record.docCount} category2Id={record.category2Id} description={record.description} viewCount={record.viewCount} voteCount={record.viewCount} id={record.id} />
          <DocAdminButton ebookId={record.id}/>
          <DeleteButton id={record.id} />
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
      <Content style={{ padding: '10px 30px' }}>
      <QueryEbook setData={setData}/>
      </Content >
      <Table columns={columns} dataSource={data.list} pagination={{total: data.total, pageSize: PAGE_SIZE, onChange: getPageContent}}/>
    </Layout>
  )
}

export default AdminEbook;