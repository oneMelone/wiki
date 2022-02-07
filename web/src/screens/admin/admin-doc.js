import { Layout, Table, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

import EditButton from "../../components/admin/doc/edit-button";
import DeleteButton from "../../components/admin/doc/delete-button";
import QueryDoc from "../../components/admin/doc/query";
import { Content } from "antd/lib/layout/layout";
import { Tool } from "../../util/tool";
import getNameById from "../../util/getNameById";

function AdminDoc() {
  const PAGE_SIZE = 100;
  const [data, setData] = useState({});
  const [plainCategories, setPlainCategories] = useState();
  useEffect(() => {
    let params = {
      page: 1,
      size: PAGE_SIZE,
    }
    axios.get("/doc/list?page=" + params.page + "&size=" + params.size).then(
      (response) => {
        let docs = response.data.content;
        docs.list.forEach(element => {
          element.key = element.id;
        });
        setPlainCategories(docs.list);
        docs.list = Tool.array2Tree(docs.list, 0);
        setData(docs)
      }
    )
  }, [])

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '顺序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '父文档',
      dataIndex: 'parent',
      key: 'parent',
      render: (_, record) => (
        <div>{getNameById(plainCategories, record.parent)}</div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">  
          <EditButton docList={data.list} name={record.name} sort={record.sort} parent={record.parent} id={record.id} />
          <DeleteButton id={record.id} />
        </Space>
      ),
    },
  ];

  function getPageContent(page, pageSize) {
    axios.get("/doc/list?page=" + page + "&size=" + pageSize).then(
      (response) => {
        let docs = response.data.content;
        docs.list.forEach(element => {
          element.key = element.id;
        });
        setData(docs)
      }
    )
  }

  return (
    <Layout>
      <Content style={{ padding: '10px 30px' }}>
      <QueryDoc setData={setData}/>
      </Content >
      <Table columns={columns} dataSource={data.list} pagination={{total: data.total, pageSize: PAGE_SIZE, onChange: getPageContent}}/>
    </Layout>
  )
}

export default AdminDoc;