import { Row, Col } from "antd";
import DocMenu from "../../components/doc-page/doc-menu";
import { parse } from "query-string"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tool } from "../../util/tool";
import DocContent from "../../components/doc-page/doc-content";

function DocPage() {
  let ebookId = parse(useLocation().search).id;

  let [docTree, setDocTree] = useState();
  let [docContent, setDocContent] = useState("选择左侧节点以浏览");

  useEffect(() => {
    axios.get("/doc/all/" + ebookId).then(
      (response) => {
        let list = response.data.content;
        list.forEach(element => {
          element.parent = parseInt(element.parent);
          element.key = element.id;
          element.title = element.name;
        });
        console.log("list=", list);
        let tree = Tool.array2Tree(list, 0);
        console.log("after to tree, tree=", tree);
        setDocTree(tree);
      }
    )
  }, [])

  return (
  <Row className="centerZone">
    <Col span={4}>
      <DocMenu data={docTree} setDocContent={setDocContent} />
    </Col>
    <Col span={20}>
      <DocContent docContent={docContent} />
    </Col>
  </Row>
  )
}

export default DocPage;