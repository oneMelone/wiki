import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Content } from 'antd/lib/layout/layout';

function DocMenu(props) {
  let onSelect = (selectedKeys, info) => {
    props.setDocInfo(info.node);
    axios.get("/doc/findContent/"+selectedKeys).then(
      response => {
        props.setDocContent(response.data.content);
      }
    )
  };

  return (
    <Content style={{padding: "20px", backgroundColor: "white", height: "91vh"}}>
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
      treeData={props.data}
    />
    </Content>
  );
}

export default DocMenu;