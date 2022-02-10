import React from 'react';
import { Form, Input, Button } from 'antd';
import InsertButton from './insert-button';
import axios from 'axios';

function QueryUser(props) {
  const [form] = Form.useForm();

  // let queryByName = () => {
  //   let name = form.getFieldsValue();
  //   console.log("name.condition =", name.condition);
  //   axios.get("/user/list", {
  //   params: {
  //     page: 1,
  //     size: 8,
  //     name: name.condition
  //   }
  //   }).then((response) => {
  //     let users = response.data.content.list;
  //       users.list.forEach(element => {
  //         element.key = element.id;
  //       });
  //     props.setData(users);
  //   })
  // }

  return (
    <Form
      name="query_user"
      form={form}
      layout="inline"
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      {/* <Form.Item
        name="condition"
      >
        <Input placeholder='按名称查询'/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={queryByName}>
          查询
        </Button>
      </Form.Item> */}
      <InsertButton />
    </Form>
  )
}

export default QueryUser;