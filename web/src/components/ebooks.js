import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Ebooks() {
  const PAGE_SIZE = 10;
  const [ebooks, setEbooks] = useState([]);
  useEffect(() => {
    axios.get("/ebook/list").then(
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
        axios.get("/ebook/list?page=" + page + "&size=" + PAGE_SIZE).then(
          (response) => {
            setEbooks(response.data.content)
          }
        )
      },
      total: ebooks.total,
      pageSize: PAGE_SIZE,
    }}
    dataSource={ebooks.list}
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