import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import Ebooks from '../../components/main-page/ebooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Tool } from '../../util/tool';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function MainPage() {
  const [categories, setCategories] = useState({list: []});
  const [ebooks, setEbooks] = useState([]);
  useEffect(() => {
    axios.get("/category/list?page=" + 1 + "&size=" + 100).then(
      (response) => {
        let categorys = response.data.content;
        categorys.list.forEach(element => {
          element.key = element.id;
        });
        categorys.list = Tool.array2Tree(categorys.list, 0);
        setCategories(categorys)
      }
    )
    axios.get("/ebook/list").then(
      (response) => {
        setEbooks(response.data.content)
      }
    )  
  }, [])
  useEffect(() => {
    console.log("categories =", categories);
  })

  let handleClick = (e) => {
    if (e.key == 'all') {
      axios.get("/ebook/list").then(
        (response) => {
          setEbooks(response.data.content)
        }
      ) 
    } else {
      axios.get("/ebook/list" + "?categoryId2=" + e.key).then(
        (response) => {
          setEbooks(response.data.content)
        }
      ) 
    }
  }

  return (
    <div>
      <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              onClick={handleClick}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="all">所有资源</Menu.Item>
              {
                categories.list.map(element => {
                  return (
                    <SubMenu key={element.key} title={element.name}>
                      {
                        element.children.map(c => {
                          return (
                            <Menu.Item key={c.key}>{c.name}</Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Ebooks ebooks={ebooks} setEbooks={setEbooks} />
            </Content>
          </Layout>
        </Layout>
    </div>
  )
}

export default MainPage;