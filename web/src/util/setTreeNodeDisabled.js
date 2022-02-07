import { Tool } from "./tool";

function setTreeNodeDisabled(treeData, id) {
  // 将id及其子节点全部增加disabled: true属性
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node.id === id) {
      node.disabled = true;
    
      const children = node.children;
      if (Tool.isNotEmpty(children)) {
        for (let j = 0; j < children.length; j++) {
          setTreeNodeDisabled(children, children[j].id);
        }
      }
    } else {
      const children = node.children;
      if (Tool.isNotEmpty(children)) {
        setTreeNodeDisabled(children, id);
      }
    }
  }
}

export default setTreeNodeDisabled;