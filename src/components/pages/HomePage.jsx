import React from 'react';
import { get, set } from 'idb-keyval';
import {connect} from "react-redux";
import { Offline, Detector } from "react-detect-offline";
import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';

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
            title: 'Мои заказы',
            current_tab: 'requests',
            loaded: false,
            stepsEnabled: false,
        }
    }

    async componentDidMount() {
        this.$f7.dialog.preloader('Пожалуйста подождите...');
        const initApp = new initApplication();
        await initApp.init(this.props);
        get('current_tab').then(current_tab => {
            current_tab !== undefined
            && this.setState({current_tab})
            && this.$f7.tab.show(`#${current_tab}`,`#${current_tab}`);
        });
        get('stepsEnabled').then(value => {
            const stepsEnabled = value === undefined;
            this.setState({stepsEnabled});
        });
        this.$f7.dialog.close();
    }

    handleTurnOffIntro = () => {
        set('stepsEnabled', false).then(() => {
            this.setState({stepsEnabled: false});
        });
    };

    new_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate('/open_request/' + reqId + '/');
        return false;
    }

    chgTitle = (title, tab) => {
        this.setState({title: title});
        set('current_tab', tab).then(() => {
            this.$f7.tab.show(`#${tab}`,`#${tab}`, true);
        });
    };


    render() {
        const { loaded, title, current_tab, stepsEnabled } = this.state;
        const steps = [
            {
                element: '.toolbar.tabbar',
                intro: 'В нижней части экрана расположена навигация по приложению.',
            },
            {
                element: '.btn-new-request',
                intro: 'Нажмите эту кнопку для добавления нового запроса.',
            },
        ];
        const options = {
            nextLabel: 'Далее',
            prevLabel: 'Назад',
            skipLabel: 'Пропустить',
            doneLabel: 'Завершить',
        };
        const initialStep = 0;
        return (
            <Page hideToolbarOnScroll pageContent={false}>
                <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={this.handleTurnOffIntro}
                    options={options}
                />
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
                    <Link
                        tabLink="#requests"
                        onClick={() => this.chgTitle('Мои заказы','requests')}
                        tabLinkActive={current_tab === 'requests'}
                        text="Мои заказы"
                        iconMd="material:important_devices"
                    />
                    <Link tabLink="#stores"
                          onClick={() => this.chgTitle('Магазины','stores')}
                          tabLinkActive={current_tab === 'stores'}
                          text="Магазины" iconMd="material:store"/>
                    <Link tabLink="#new" onClick={() => this.new_request(0)}
                          text=" " >
                        <Icon material="add"/>
                    </Link>
                    <Link tabLink="#favorites"
                          onClick={() => this.chgTitle('Избранное','favorites')}
                          tabLinkActive={current_tab === 'favorites'}
                          text="Избранное" iconMd="material:favorite"/>
                    <Link tabLink="#person"
                          onClick={() => this.chgTitle('Личный Кабинет','person')}
                          tabLinkActive={current_tab === 'person'}
                          text="Кабинет" iconMd="material:person"/>
                </Toolbar>
                <Fab
                    href="open_request/0/"
                    position="center-bottom"
                    slot="fixed"
                    color="red"
                    data-intro='Hello step one!'
                    className={"btn-new-request"}
                >
                    <Icon ios="f7:add" md="material:add"/>
                </Fab>

                <Tabs animated={loaded}>
                    <Tab id="requests" className="page-content" tabActive={current_tab === 'requests'}>
                        <RequestsPage/>
                    </Tab>
                    <Tab id="stores" className="page-content" tabActive={current_tab === 'stores'}>
                        <StoresPage/>
                    </Tab>
                    <Tab id="favorites" className="page-content" tabActive={current_tab === 'favorites'}>
                        <FavoritesPage/>
                    </Tab>
                    <Tab id="person" className="page-content" tabActive={current_tab === 'person'}>
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