import React from 'react';
import { Form, Input, Button } from 'antd';
import InsertButton from './insert-button';
import axios from 'axios';

function QueryEbook(props) {
  const [form] = Form.useForm();

  let queryByName = () => {
    let name = form.getFieldsValue();
    console.log("name.condition =", name.condition);
    axios.get("/ebook/list", {
    params: {
      page: 1,
      size: 8,
      name: name.condition
    }
    }).then((response) => {
      let ebooks = response.data.content;
        ebooks.list.forEach(element => {
          element.key = element.id;
        });
      props.setData(ebooks);
    })
  }

  return (
    <Form
      name="query_ebook"
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

export default QueryEbook;