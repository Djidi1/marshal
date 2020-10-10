import React, {Component} from 'react';
import {
    Page,
    Navbar,
    List,
    ListInput,
    Block,
    BlockTitle,
    Button,
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";

import {setData} from "../../axios/setData";
import {
    handleAddRequests,
    handleUpdateRequest,
   // handleDeleteRequest
} from "../../actions/DataActions";

class NewRequestPage extends Component {
    constructor() {
        super();
        this.state = {
            selected_shops: [],
            shop_id: null,
            category_id: 0,
            car_id: 0,
            vin: '',
            text: '',
        }
    }

    handleShops = (shops) => {
        this.setState({ selected_shops: shops, shop_id: shops[0] });
    };

    handleData = (name, value) => {
        this.setState({[name]: value});
    };

    handleCarData = (value) => {
        const car_id = Number(value);
        const vin = car_id > 0 ? this.props.cars.find(car => car.id === car_id).vin : '';
        this.setState({car_id: car_id, vin: vin});
    };

    set_stores = () => {
        const app = this.$f7;
        app.views.main.router.navigate('/stores_list/', {
            props: {
                handleShops: this.handleShops,
                selected_shops: this.state.selected_shops
            }
        });
    };

    sendRequest = (req_id) => {
        let req_data = {...this.state};
        delete req_data.selected_shops;
        req_data["user_id"] = this.props.user.id;
        const set_data = new setData();
        if (req_id > 0) {
            set_data.dataPut('request-update/'+req_id, req_data).then(() => {
                req_data["id"] = req_id;
                this.props.handleUpdateRequest(req_data);
                this.updateRequestSuccess.open();
            });
        } else {
            set_data.data('request-add', req_data).then(data => {
                this.props.handleAddRequests(data.result);
                this.addRequestSuccess.open();
            });
        }
        this.$f7.views.main.router.navigate('/');
    };

    addRequestSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Заявка добавлена',
        text: 'В ближайшее время вам ответят.',
        closeTimeout: 3000,
    });
    updateRequestSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Заявка обновлена',
        closeTimeout: 3000,
    });

    componentDidMount() {
        const initData = {};
        const req_id = Number(this.$f7route.params.reqId);
        const store_id = Number(this.$f7route.params.storeId);

        if (req_id > 0) {
            const request = this.props.requests.find(request => request.id === req_id);
            // Set data to local state
            initData.category_id = request.category_id;
            initData.car_id = request.car_id;
            initData.vin = request.vin;
            initData.text = request.text;
            initData.shop_id = request.shop_id;
            initData.selected_shops = [request.shop_id];
            this.setState(initData);
        } else if (store_id > 0) {
            this.setState({shop_id: store_id, selected_shops: [store_id],});
        }
    }

    render() {
        const {selected_shops, category_id, car_id, vin, text} = this.state;
        const {shops, categories, cars, brands, models} = this.props;
        const selectedShops = shops.filter(x => selected_shops.indexOf(x.id) !== -1);
        const req_id = this.$f7route.params.reqId;

        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={req_id > 0 ? "Редактировать заявку" : "Новая заявка"}
                    backLink="Back"
                >
                </Navbar>
                <BlockTitle
                    style={{whiteSpace: 'initial'}}
                >Здесь вы можете оставить заявку на подбор необходимой вам запчасти или услуги.</BlockTitle>
                <List>
                    <ListInput
                        label="Категория товара"
                        type="select"
                        placeholder="Выберите..."
                        value={category_id}
                        onChange={(event) => this.handleData('category_id', event.target.value)}
                    >
                        <option key={0} value={null}>Выберите...</option>
                        {
                        categories.map((item) =>
                            <option key={item.id} value={item.id}>{item.category}</option>
                        )
                    }
                    </ListInput>
                    <ListInput
                        label="Автомобиль"
                        type="select"
                        info={cars.length === 0 ? "Для возможности выбора автомобиля добавьте его через Личный кабинет" : "Выберите из списка"}
                        value={car_id}
                        onChange={(event) => this.handleCarData( event.target.value)}
                        disabled={cars.length === 0}
                    >
                        <option key={0} value={null}>
                            {cars.length === 0 ? "Нет автомобилей в ЛК" : "Выберите..."}
                        </option>
                        {
                            cars.map(car => (
                                <option
                                    key={'car_'+car.id}
                                    value={car.id}
                                >{brands.find(brand => brand.id === car.car_brand_id).car_brand
                                + ' ' + models.find(model => model.id === car.car_model_id).car_model}</option>
                            ))
                        }
                    </ListInput>
                    <ListInput
                        outline
                        label="VIN"
                        floatingLabel
                        type="text"
                        placeholder="Для более быстрого поиска запчасти введите VIN номер автомобиля"
                        value={vin}
                        onChange={(event) => this.handleData('vin', event.target.value)}
                    />
                    <ListInput
                        outline
                        label="Описание"
                        floatingLabel
                        type="textarea"
                        placeholder="Дополнительная информация о требуемом товаре..."
                        value={text}
                        onChange={(event) => this.handleData('text', event.target.value)}
                    />
                    <Block>
                        <Button
                            small
                            fill
                            onClick={() => this.set_stores()}
                            style={{float: 'right', display: 'inline-block'}}
                        >{selectedShops.length ? 'Другой магазинн' : 'Выбрать'}</Button>
                        <p>
                            Заявка в магазин: {selectedShops.length ? '' : 'Любой'}
                            { selectedShops.map((item, index) => <b key={index}> {item.name}</b>) }
                        </p>
                    </Block>
                </List>
                <Block>
                    <Button
                        fill
                        onClick={() => this.sendRequest(req_id)}
                    >{req_id > 0 ? 'Сохранить изменения' : 'Отправить заявку'}</Button>
                </Block>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        user: store.user,
        cars: store.cars,
        models: store.carmodels,
        brands: store.carbrands,
        requests: store.requests,
        shops: store.stores.shops,
        categories: store.stores.categories,
    }
};
//handleAddRequests
const mapDispatchToProps = dispatch => {
    return {
        handleAddRequests: data => dispatch(handleAddRequests(data)),
        handleUpdateRequest: data => dispatch(handleUpdateRequest(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRequestPage)