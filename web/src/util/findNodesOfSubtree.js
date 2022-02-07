import { Tool } from "./tool";

function findNodesOfSubTree(treeData, id, ids) {
  // 对树形数据，将id及其子节点的id作为列表返回; 传入空数组ids，结果都push到ids中
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node.id === id) {
      ids.push(node.id);
    
      const children = node.children;
      if (Tool.isNotEmpty(children)) {
        for (let j = 0; j < children.length; j++) {
          findNodesOfSubTree(children, children[j].id, ids);
        }
      }
    } else {
      const children = node.children;
      if (Tool.isNotEmpty(children)) {
        findNodesOfSubTree(children, id, ids);
      }
    }
  }
}

export default findNodesOfSubTree;