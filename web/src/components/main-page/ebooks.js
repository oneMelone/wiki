import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';

function Ebooks(props) {
  const PAGE_SIZE = 10;

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
    // todo: fix this, add catigoryId
    pagination={{
      onChange: page => {
        axios.get("/ebook/list?page=" + page + "&size=" + PAGE_SIZE).then(
          (response) => {
            props.setEbooks(response.data.content)
          }
        )
      },
      total: props.ebooks.total,
      pageSize: PAGE_SIZE,
    }}
    dataSource={props.ebooks.list}
    renderItem={item => (
      <List.Item
        key={item.name}
        // actions={[
        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        // ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={"/doc?id="+item.id}>{item.name}</a>}
          description={item.description}
        />
      </List.Item>
    )}
  />
  )
}

export default Ebooks;