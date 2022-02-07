import { Layout, Table, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

import EditButton from "../../components/admin/category/edit-button";
import DeleteButton from "../../components/admin/category/delete-button";
import QueryCategory from "../../components/admin/category/query";
import { Content } from "antd/lib/layout/layout";
import { Tool } from "../../util/tool";
import getCategoryNameById from "../../util/getCategoryNameById";

function AdminCategory() {
  const PAGE_SIZE = 100;
  const [data, setData] = useState({});
  const [plainCategories, setPlainCategories] = useState();
  useEffect(() => {
    let params = {
      page: 1,
      size: PAGE_SIZE,
    }
    axios.get("/category/list?page=" + params.page + "&size=" + params.size).then(
      (response) => {
        let categorys = response.data.content;
        categorys.list.forEach(element => {
          element.key = element.id;
        });
        setPlainCategories(categorys.list);
        categorys.list = Tool.array2Tree(categorys.list, 0);
        setData(categorys)
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
      title: '父分类',
      dataIndex: 'parent',
      key: 'parent',
      render: (_, record) => (
        <div>{getCategoryNameById(plainCategories, record.parent)}</div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">  
          <EditButton categoryList={data.list} name={record.name} sort={record.sort} parent={record.parent} id={record.id} />
          <DeleteButton id={record.id} />
        </Space>
      ),
    },
  ];

  function getPageContent(page, pageSize) {
    axios.get("/category/list?page=" + page + "&size=" + pageSize).then(
      (response) => {
        let categorys = response.data.content;
        categorys.list.forEach(element => {
          element.key = element.id;
        });
        setData(categorys)
      }
    )
  }

  return (
    <Layout>
      <Content style={{ padding: '10px 30px' }}>
      <QueryCategory setData={setData}/>
      </Content >
      <Table columns={columns} dataSource={data.list} pagination={{total: data.total, pageSize: PAGE_SIZE, onChange: getPageContent}}/>
    </Layout>
  )
}

export default AdminCategory;