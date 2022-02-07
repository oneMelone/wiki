import { Form, Input, Button } from 'antd';

function EbookForm(props) {
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
      name="ebook-form"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        cover: props.cover,
        name: props.name,
        category1Id: props.category1Id,
        category2Id: props.category2Id,
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
        label="分类1"
        name="category1Id"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="分类2"
        name="category2Id"
      >
        <Input />
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