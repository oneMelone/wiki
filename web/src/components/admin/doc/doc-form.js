import { Form, Input, TreeSelect, message } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { Tool } from '../../../util/tool';
import axios from 'axios';
import setTreeNodeDisabled from '../../../util/setTreeNodeDisabled';
import ReactWEditor from 'wangeditor-for-react';

function DocForm(props) {
  const [form] = Form.useForm();
  const [docList, setDocList] = useState([]);
  const editorRef = useRef();
  props.setEditor(editorRef);

  useEffect(() => {
    axios.get("/doc/list?page=" + 1 + "&size=" + 100).then(
      (response) => {
        let docs = response.data.content;
        docs.list.forEach(element => {
          element.key = element.id;
          element.title = element.name;
          element.value = element.id;
        });
        docs.list = Tool.array2Tree(docs.list, 0);

        if (props.id != undefined) {
          setTreeNodeDisabled(docs.list, props.id);
        }

        docs.list.unshift({
          key: "0",
          title: "无",
          id: '0',
          value: '0',
          children: [],
        })
        setDocList(docs.list);
      }
    )
    axios.get("/doc/findContent/" + props.id).then(
      (response) => {
        const data = response.data;
        if (data.success) {
          editorRef.current.editor.txt.html(data.content);
        }
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
      name="doc-form"
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
        <TreeSelect
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={docList}
          placeholder="Please select"
          treeDefaultExpandAll
        />
      </Form.Item>

      <Form.Item
        label="顺序"
        name="sort"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="内容"
        name="content"
      >
        <ReactWEditor
          ref={editorRef}
        />
      </Form.Item>
    </Form>
  );
};

export default DocForm;