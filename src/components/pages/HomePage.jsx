import React from 'react';
import {
    Page,
    Navbar,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button,
    Tabs,
    Tab
} from 'framework7-react';

export default () => (
  <Page>
      <Navbar
          title="Маршал"
          backLink="Back"
          color="white"
          textColor="white"
          bgColor="red"
      />
    <Toolbar
        bottom
        tabbar
        labels
    >
        <Link tabLink="#tab-1" tabLinkActive text="Главная"  iconMd="material:store"/>
        <Link tabLink="#tab-2" text="Магазины"  iconMd="material:store"/>
        <Link tabLink="#tab-3" text="Заказы" iconMd="material:today"/>
        <Link tabLink="#tab-4" text="Личный кабинет" iconMd="material:file_upload"/>
    </Toolbar>

      <Tabs>
          <Tab id="tab-1" className="page-content" tabActive>
              <Block>
                  <p>Tab 1 content</p>
                  ...
              </Block>
          </Tab>
          <Tab id="tab-2" className="page-content">
              <Block>
                  <p>Tab 2 content</p>
                  ...
              </Block>
          </Tab>
          <Tab id="tab-3" className="page-content">
              <Block>
                  <p>Tab 3 content</p>
                  ...
              </Block>
          </Tab>
          <Tab id="tab-4" className="page-content">
              <Block>
                  <p>Tab 4 content</p>
                  ...
              </Block>
          </Tab>
      </Tabs>

    <Block strong>
      <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem link="/about/" title="About"/>
      <ListItem link="/form/" title="Form"/>
    </List>
    <BlockTitle>Modals</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill raised popupOpen="#popup">Popup</Button>
        </Col>
        <Col width="50">
          <Button fill raised loginScreenOpen="#login-screen">Login Screen</Button>
        </Col>
      </Row>
    </Block>
    <BlockTitle>Panels</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill raised panelOpen="left">Left Panel</Button>
        </Col>
        <Col width="50">
          <Button fill raised panelOpen="right">Right Panel</Button>
        </Col>
      </Row>
    </Block>
    <List>
      <ListItem link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></ListItem>
      <ListItem link="/load-something-that-doesnt-exist/" title="Default Route (404)"></ListItem>
    </List>
  </Page>
);
