import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';

function DocMenu(props) {
  let onSelect = (selectedKeys) => {
    axios.get("/doc/findContent/"+selectedKeys).then(
      response => {
        props.setDocContent(response.data.content);
        // console.log("response: ", response)
      }
    )
  };

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
      treeData={props.data}
    />
  );
}

export default DocMenu;