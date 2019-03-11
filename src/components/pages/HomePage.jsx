import React from 'react';
import {
    Page,
    Navbar,
    NavRight,
    // NavLeft,
    NavTitle,
    Link,
    Toolbar,
    Block,
    Tabs,
    Tab
} from 'framework7-react';

import RequestsPage from './RequestsPage';

export default () => (
    <Page hideToolbarOnScroll pageContent={false}>
        <Navbar
            color="white"
            textColor="white"
            bgColor="red"
        >
            {/*<NavLeft backLink="Back"/>*/}
            <NavTitle>Маршал</NavTitle>
            <NavRight>
                <Link iconMd="material:account_circle" loginScreenOpen="#login-screen"/>
            </NavRight>
        </Navbar>
        <Toolbar
            bottom
            tabbar
            labels
        >
            <Link tabLink="#requests" tabLinkActive text="Заявки" iconMd="material:important_devices"/>
            <Link tabLink="#stores" text="Магазины" iconMd="material:store"/>
            <Link tabLink="#cars" text="Автомобили" iconMd="material:directions_car"/>
            <Link tabLink="#settings" text="Настройки" iconMd="material:settings"/>
        </Toolbar>

        <Tabs animated>
            <Tab id="requests" className="page-content" tabActive>
                <RequestsPage/>
            </Tab>
            <Tab id="stores" className="page-content">
                <Block>
                    <p>Tab 2 content</p>
                    ...
                </Block>
            </Tab>
            <Tab id="cars" className="page-content">
                <Block>
                    <p>Tab 3 content</p>
                    ...
                </Block>
            </Tab>
            <Tab id="settings" className="page-content">
                <Block>
                    <p>Tab 4 content</p>
                    ...
                </Block>
            </Tab>
        </Tabs>
    </Page>
);
