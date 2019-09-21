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
import FavoritesPage from "./FavoritesPage";

import {getData} from '../../axios/getData'
import {setData} from '../../axios/setData'
import {authorisation} from "../../axios/login";
import {handleLogin} from "../../actions/UserActions";
import {
    handleCategories,
    handleShops,
    handleFavoriteShops,
    handleRequests,
    handleCars,
    handleCarBrands,
    handleCarModels,
} from "../../actions/DataActions";

// Load data from indexedDB to Store
class initApplication {
    init = async (props) => {
        await get('user').then(value => value !== undefined && props.handleLogin(value));
        // from internet
        let detect = new Detector();
        if (detect.state.online) {
            let get_data = new getData();
            let set_data = new setData();
            await get_data.data('details').then( async value => {
                // if unregistered - register him
               if (value === 401) {
                   // 1. create unique user
                   const random = Math.random();
                   const login = `test${random}@test.ru`;
                   const password = 'abS34T3fSg4';
                   const payload = {
                       name: `tmp_user_${random}`,
                       email: login,
                       password: password,
                       c_password: password,
                       initial: true
                   };
                   await set_data.data('register', payload).then(async data => {
                       console.log(data);
                       // auth user
                       const auth = new authorisation();
                       await auth.login(login, password).then( async response => {
                           // записываем токен
                           const user = response.data.success;
                           await props.handleLogin(user);
                           // переименовываем
                           const id_user = response.data.success.id;
                           const new_name = {name: `User_${id_user}`, email: `user_${id_user}@marshal-service.ru`};
                           await set_data.dataPut(`user-update/${id_user}`, new_name).then( async () => {
                               // обновляем стор
                               user.name = new_name.name;
                               user.email = new_name.email;
                               await props.handleLogin(user);
                           });
                           // get data
                           await this.getDataFromDB(props);
                       });
                       // 2. rename user to specific ID (user_ID)
                   });
               } else {
                   await this.getDataFromDB(props);
               }
            });
        } else {
            await this.getDataFromLS();
        }
    };
    getDataFromDB = async (props) => {
        let get_data = new getData();
        const shops = get_data.data('shops').then(value => value !== undefined && props.handleShops(value));
        const favorite_shops = get_data.data('favorite-shops').then(value => value !== undefined && props.handleFavoriteShops(value.result));
        const categories = get_data.data('categories').then(value => value !== undefined && props.handleCategories(value));
        const userRequests = get_data.data('userRequests').then(value => value !== undefined && props.handleRequests(value));
        const cars = get_data.data('cars').then(value => value !== undefined && props.handleCars(value));
        const carbrands = get_data.data('carbrands').then(value => value !== undefined && props.handleCarBrands(value));
        const carmodels = get_data.data('carmodels').then(value => value !== undefined && props.handleCarModels(value));

        // wait all requests
        await Promise.all([shops, favorite_shops, categories,userRequests,cars,carbrands, carmodels]).then(() => {
            console.log('loaded from DB');
        });
    };
    getDataFromLS = async (props) => {
        const shops = get('shops').then(value => value !== undefined && props.handleShops(value));
        const favorite_shops = get('favorite-shops').then(value => value !== undefined && props.handleFavoriteShops(value.result));
        const categories = get('categories').then(value => value !== undefined && props.handleCategories(value));
        const userRequests = get('userRequests').then(value => value !== undefined && props.handleRequests(value));
        const cars = get('cars').then(value => value !== undefined && props.handleCars(value));
        const carbrands = get('carbrands').then(value => value !== undefined && props.handleCarBrands(value));
        const carmodels = get('carmodels').then(value => value !== undefined && props.handleCarModels(value));

        // wait all requests
        await Promise.all([shops, favorite_shops, categories,userRequests,cars,carbrands, carmodels]).then(() => {
            console.log('loaded from LS');
        });
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
        this.$f7.dialog.preloader('Пожалуйста подождите...');
        const initApp = new initApplication();
        await initApp.init(this.props);
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
                    <Link tabLink="#favorites" onClick={() => this.chgTitle('Избранное')} text="Избранное" iconMd="material:favorite"/>
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
                    <Tab id="favorites" className="page-content">
                        <FavoritesPage/>
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
        handleFavoriteShops: shops => dispatch(handleFavoriteShops(shops)),
        handleCategories: categories => dispatch(handleCategories(categories)),
        handleRequests: requests => dispatch(handleRequests(requests)),
        handleCars: cars => dispatch(handleCars(cars)),
        handleCarBrands: brands => dispatch(handleCarBrands(brands)),
        handleCarModels: models => dispatch(handleCarModels(models)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)