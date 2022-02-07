import { Form, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import { Tool } from '../../../util/tool';
import axios from 'axios';

const { Option } = Select;
function CategoryForm(props) {
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    axios.get("/category/list?page=" + 1 + "&size=" + 100).then(
      (response) => {
        let categorys = response.data.content;
        categorys.list.forEach(element => {
          element.key = element.id;
        });
        categorys.list = Tool.array2Tree(categorys.list, 0);
        setCategoryList(categorys.list);
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
      name="category-form"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        name: props.name,
        parent: props.parent,
        sort: props.sort,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item
        label="名称"
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="父分类"
        name="parent"
      >
        <Select style={{ width: 120 }}>
          <Option value="0">无</Option>
          {
            categoryList.map(element => {
              if (props.name != element.name)
                return (
                  <Option value={element.id} key={element.id}>{element.name}</Option>
                )
              else
                return (
                  <Option disabled value={element.id} key={element.id}>{element.name}</Option>
                ) 
            })
          }
        </Select>
      </Form.Item>

      <Form.Item
        label="顺序"
        name="sort"
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;