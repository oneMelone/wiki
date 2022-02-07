import React from 'react';
import { Form, Input, Button } from 'antd';
import InsertButton from './insert-button';
import axios from 'axios';

function QueryDoc(props) {
  const [form] = Form.useForm();

  // let query = () => {
  //   let name = form.getFieldsValue();
  //   console.log("name.condition =", name.condition);
  //   axios.get("/doc/list", {
  //   params: {
  //     page: 1,
  //     size: 100,
  //   }
  //   }).then((response) => {
  //     let docs = response.data.content;
  //       docs.list.forEach(element => {
  //         element.key = element.id;
  //       });
  //     props.setData(docs);
  //   })
  // }

  return (
    <Form
      name="query_doc"
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

export default QueryDoc;