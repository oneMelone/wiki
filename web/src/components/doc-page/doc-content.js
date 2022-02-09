import { Content } from "antd/lib/layout/layout";

function DocContent(props) {
  return (
    <Content style={{ padding: '50px' }}>
      <div dangerouslySetInnerHTML={{__html: props.docContent}}></div>
    </Content>
  )
}

export default DocContent;