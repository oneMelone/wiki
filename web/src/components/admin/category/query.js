import React from 'react';
import { Form, Input, Button } from 'antd';
import InsertButton from './insert-button';
import axios from 'axios';

function QueryCategory(props) {
  const [form] = Form.useForm();

  let queryByName = () => {
    let name = form.getFieldsValue();
    console.log("name.condition =", name.condition);
    axios.get("/category/list", {
    params: {
      page: 1,
      size: 8,
      name: name.condition
    }
    }).then((response) => {
      let categorys = response.data.content;
        categorys.list.forEach(element => {
          element.key = element.id;
        });
      props.setData(categorys);
    })
  }

  return (
    <Form
      name="query_category"
      form={form}
      layout="inline"
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      <Form.Item
        name="condition"
      >
        <Input placeholder='按名称查询'/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={queryByName}>
          查询
        </Button>
      </Form.Item>
      <InsertButton />
    </Form>
  )
}

export default QueryCategory;