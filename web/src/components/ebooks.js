import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Ebooks() {
  const [ebooks, setEbooks] = useState([{name: "loading"}]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ebook/list?name=Spring").then(
      (response) => {
        setEbooks(response.data.content)
      }
    )
  }, [])

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List
    grid={{ gutter: 20, column: 2 }}
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={ebooks}
    renderItem={item => (
      <List.Item
        key={item.name}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        // extra={
        //   <img
        //     width={272}
        //     src={item.cover}
        //   />
        // }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.name}</a>}
          description={item.description}
        />
      </List.Item>
    )}
  />
  )
}

export default Ebooks;