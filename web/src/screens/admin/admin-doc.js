import { Layout, Table, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

import EditButton from "../../components/admin/doc/edit-button";
import DeleteButton from "../../components/admin/doc/delete-button";
import QueryDoc from "../../components/admin/doc/query";
import { Content } from "antd/lib/layout/layout";
import { Tool } from "../../util/tool";
import getNameById from "../../util/getNameById";
import { useLocation } from "react-router-dom";
import {parse} from "query-string"

function AdminDoc(props) {
  const PAGE_SIZE = 100;
  let [data, setData] = useState();
  let [plainCategories, setPlainCategories] = useState();
  let ebookIdTemp = parse(useLocation().search).ebookId;
  useEffect(() => {
    axios.get("/doc/all/" + ebookIdTemp).then(
      (response) => {
        let list = response.data.content;
        for (let i in list) {
          list[i].key = list[i].id;
        }
        setPlainCategories(list);
        let treeData = Tool.array2Tree(list, 0);
        setData(treeData);
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
          <EditButton docList={data} name={record.name} sort={record.sort} parent={record.parent} id={record.id} />
          <DeleteButton id={record.id} docList={data} />
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: '10px 30px' }}>
      <QueryDoc setData={setData}/>
      </Content >
      <Table columns={columns} dataSource={data} />
    </Layout>
  )
}

export default AdminDoc;