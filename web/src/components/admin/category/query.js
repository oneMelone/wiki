import React from 'react';
import { Form, Input, Button } from 'antd';
import InsertButton from './insert-button';
import axios from 'axios';

function QueryCategory(props) {
  const [form] = Form.useForm();

  // let query = () => {
  //   let name = form.getFieldsValue();
  //   console.log("name.condition =", name.condition);
  //   axios.get("/category/list", {
  //   params: {
  //     page: 1,
  //     size: 100,
  //   }
  //   }).then((response) => {
  //     let categorys = response.data.content;
  //       categorys.list.forEach(element => {
  //         element.key = element.id;
  //       });
  //     props.setData(categorys);
  //   })
  // }

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

      {/* <Form.Item>
        <Button type="primary" onClick={query}>
          查询
        </Button>
      </Form.Item> */}
      <InsertButton />
    </Form>
  )
}

export default QueryCategory;