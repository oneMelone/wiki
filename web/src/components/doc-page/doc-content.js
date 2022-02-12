import { Divider } from "antd";
import { Content } from "antd/lib/layout/layout";

function DocContent(props) {
  console.log("in docContent, props=", props)
  if (props.docInfo != undefined) {
    console.log("reach here")
    return (
      <Content style={{ padding: '50px' }}>
        <h1 className="doc-title">{props.docInfo.name}</h1>
        <div className="view-count-and-vote-count">
        <div className="view-count">阅读量：{props.docInfo.viewCount}</div>
        <div className="vote-count">点赞量：{props.docInfo.voteCount}</div>
        </div>
        <Divider />
        <div dangerouslySetInnerHTML={{__html: props.docContent}}></div>
      </Content>
    )
  }
  return (
    <Content style={{ padding: '50px' }}>
      <div dangerouslySetInnerHTML={{__html: props.docContent}}></div>
    </Content>
  )
}

export default DocContent;