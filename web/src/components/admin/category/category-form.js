import { Form, Input, Button } from 'antd';

function CategoryForm(props) {
  const [form] = Form.useForm();
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
        <Input />
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