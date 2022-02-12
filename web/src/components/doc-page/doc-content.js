import { Button, Divider, message } from "antd";
import { Content } from "antd/lib/layout/layout";
import { LikeOutlined } from '@ant-design/icons';
import axios from "axios";
import { useEffect, useState } from "react";

function DocContent(props) {
  console.log("in docContent, props=", props)
  if (props.docInfo != undefined) {
    console.log("reach here")
    return (
      <Content style={{ padding: '50px' }}>
        <h1 className="doc-title">{props.docInfo.name}</h1>
        <div className="view-count-and-vote-count">
        <div className="view-count">阅读量：{props.docInfo.viewCount}</div>
        <div className="vote-count">点赞量：{props.voteCount}</div>
        </div>
        <Divider />
        <div dangerouslySetInnerHTML={{__html: props.docContent}}></div>
        <VoteButton id={props.docInfo.id} setVoteCount={props.setVoteCount} voteCount={props.docInfo.voteCount} />
      </Content>
    )
  }
  return (
    <Content style={{ padding: '50px' }}>
      <div dangerouslySetInnerHTML={{__html: props.docContent}}></div>
    </Content>
  )
}

function VoteButton(props) {
  const liked = () => {
    axios.get("/doc/vote/" + props.id).then(
      response => {
        if (response.data.success) {
          props.setVoteCount(props.voteCount + 1);
        } else {
          message.error(response.data.message);
        }
      }
    )
  }
  return (
    <Content className="like-outlined-button-box">
    <Button onClick={liked} type="primary" shape="round"><LikeOutlined />点赞</Button>
    </Content>
  )
}

export default DocContent;