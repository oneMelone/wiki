import { Form, Input, Button } from 'antd';

function EbookForm(props) {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="封面"
        name="cover"
      >
        <Input placeholder={props.cover} />
      </Form.Item>

      <Form.Item
        label="名称"
        name="name"
      >
        <Input placeholder={props.name} />
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EbookForm;