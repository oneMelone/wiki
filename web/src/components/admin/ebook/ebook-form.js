import { Form, Input, Cascader } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Tool } from '../../../util/tool';

function EbookForm(props) {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios.get("/category/list?page=" + 1 + "&size=" + 100).then(
      (response) => {
        let categorys = response.data.content;
        categorys.list.forEach(element => {
          element.value = element.id;
          element.label = element.name;
          element.key = element.id;
        });
        categorys.list = Tool.array2Tree(categorys.list, 0);
        setCategories(categorys.list);
      }
    )
  }, [])
  
  props.setForm(form);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="ebook-form"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        cover: props.cover,
        name: props.name,
        category: [props.category1Id, props.category2Id],
        description: props.description,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="封面"
        name="cover"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="名称"
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="分类"
        name="category"
      >
        <Cascader options={categories} placeholder="请选择分类" />
      </Form.Item>

      <Form.Item
        label="描述"
        name="description"
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default EbookForm;