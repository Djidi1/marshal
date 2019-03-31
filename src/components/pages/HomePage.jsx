import React from 'react';
import { get } from 'idb-keyval';
import {connect} from "react-redux";

import {
    Page,
    Navbar,
    Link,
    Toolbar,
    Tabs,
    Tab,
    Icon,
    Fab
} from 'framework7-react';

import RequestsPage from './RequestsPage';
import StoresPage from './StoresPage';
import SettingsPage from './SettingsPage';
import STOPage from './STOPage';
import {handleLogin} from "../../actions/UserActions";


class initApplication {
    init = async (props) => {
        await get('user').then(value => {
            if (value !== undefined) {
                props.handleLogin(value);
            }
        });
    }
}


class HomePage extends React.Component {

    async componentDidMount() {
        this.$f7.dialog.preloader('Загрузка...');
        const initApp = new initApplication();
        await initApp.init(this.props).then();
        this.$f7.dialog.close();
    }

    new_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate('open_request/' + reqId + '/');
        return false;
    }

    render() {
        return (
            <Page hideToolbarOnScroll pageContent={false}>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title="Маршал Сервис"
                />
                <Toolbar
                    bottom
                    tabbar
                    labels
                    color="main"
                >
                    <Link tabLink="#requests" tabLinkActive text="Заявки" iconMd="material:important_devices"/>
                    <Link tabLink="#stores" text="Магазины" iconMd="material:store"/>
                    <Link tabLink="#new"
                          onClick={() => this.new_request(0)} text=" "
                    >
                        <Icon material="add"/>
                    </Link>
                    <Link tabLink="#sto" text="СТО" iconMd="material:build"/>
                    <Link tabLink="#person" text="Кабинет" iconMd="material:person"/>
                </Toolbar>
                <Fab
                    href="open_request/0/"
                    position="center-bottom"
                    slot="fixed"
                    color="blue"
                    className={"btn-new-request"}
                >
                    <Icon ios="f7:add" md="material:add"/>
                </Fab>

                <Tabs animated>
                    <Tab id="requests" className="page-content" tabActive>
                        <RequestsPage/>
                    </Tab>
                    <Tab id="stores" className="page-content">
                        <StoresPage/>
                    </Tab>
                    <Tab id="sto" className="page-content">
                        <STOPage/>
                    </Tab>
                    <Tab id="person" className="page-content">
                        <SettingsPage/>
                    </Tab>
                </Tabs>
            </Page>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: user => dispatch(handleLogin(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)