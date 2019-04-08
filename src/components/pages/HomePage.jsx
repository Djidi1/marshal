import React from 'react';
import { get } from 'idb-keyval';
import {connect} from "react-redux";
import { Offline, Detector } from "react-detect-offline";

import {
    Page,
    Navbar,
    NavRight,
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

import {getData} from '../../axios/getData'
import {handleLogin} from "../../actions/UserActions";
import {handleCategories, handleShops, handleRequests} from "../../actions/DataActions";

// Load data from indexedDB to Store
class initApplication {
    init = async (props) => {
        // from idb
        await get('user').then(value => value !== undefined && props.handleLogin(value));
        await get('shops').then(value => value !== undefined && props.handleShops(value));
        await get('categories').then(value => value !== undefined && props.handleCategories(value));
        await get('requests').then(value => value !== undefined && props.handleRequests(value));

        // from internet
        let detect = new Detector();
        if (detect.state.online) {
            console.log(detect.state.online);
            let get_data = new getData();
            get_data.data('shops').then(value => value !== undefined && props.handleShops(value));
            get_data.data('categories').then(value => value !== undefined && props.handleCategories(value));
            get_data.data('requests').then(value => value !== undefined && props.handleRequests(value));
        } else {
            console.log(detect.state);
        }
    }
}


class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Заявки",
        }
    }

    async componentDidMount() {
        this.$f7.dialog.preloader('Загрузка...');
        const initApp = new initApplication();
        await initApp.init(this.props).then();
        this.$f7.dialog.close();
    }

    new_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate('/open_request/' + reqId + '/');
        return false;
    }

    chgTitle = (title) => {
        this.setState({title: title});
    };

    render() {
        const { title } = this.state;
        return (
            <Page hideToolbarOnScroll pageContent={false}>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={"Маршал Сервис" + (title !== '' ? (' / ' + title) : "")}
                >
                    <NavRight>
                        <Offline>
                            <Link iconMd="material:signal_wifi_off" />
                        </Offline>
                    </NavRight>
                </Navbar>
                <Toolbar
                    bottom
                    tabbar
                    labels
                    color="main"
                >
                    <Link tabLink="#requests" onClick={() => this.chgTitle('Заявки')} tabLinkActive text="Заявки" iconMd="material:important_devices"/>
                    <Link tabLink="#stores" onClick={() => this.chgTitle('Магазины')} text="Магазины" iconMd="material:store"/>
                    <Link tabLink="#new" onClick={() => this.new_request(0)} text=" " >
                        <Icon material="add"/>
                    </Link>
                    <Link tabLink="#sto" onClick={() => this.chgTitle('СТО')} text="СТО" iconMd="material:build"/>
                    <Link tabLink="#person" onClick={() => this.chgTitle('Личный Кабинет')} text="Кабинет" iconMd="material:person"/>
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
        handleShops: shops => dispatch(handleShops(shops)),
        handleCategories: categories => dispatch(handleCategories(categories)),
        handleRequests: requests => dispatch(handleRequests(requests)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)