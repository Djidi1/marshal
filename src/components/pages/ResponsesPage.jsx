import React, {Component} from 'react';
import {connect} from "react-redux";

import {Detector} from "react-detect-offline";
import {setData} from "../../axios/setData";
import {getData} from "../../axios/getData";
import {handleRequest, handleResponse} from "../../actions/DataActions";
import {get} from "idb-keyval";

import {
    Page,
    Navbar,
    List,
    Icon,
    ListItem,
    Block,
    Subnavbar,
    SwipeoutActions,
    SwipeoutButton,
} from 'framework7-react';

const getResponse = async (props, resp_id) => {
    let detect = new Detector();
    if (await detect.state.online) {
        let get_data = new getData();
        await get_data.data('answer/' + resp_id).then(value => value !== undefined && props.handleResponse(value));
    }else{
        await get('answer/' + resp_id).then(value => value !== undefined && props.handleResponse(value));
    }
};

class ResponsesPage extends Component {

    get_category(cat_id) {
        const cat = this.props.categories.find(x => x.id === cat_id);
        return cat !== undefined ? cat.category : "Без категории"
    }

    get_shop(shop_id) {
        const shop = this.props.shops.find(x => x.id === shop_id);
        return shop !== undefined ? shop.name : "Без категории"
    }

    open_response(resp_id) {
        this.$f7.dialog.preloader('Загружаем предложение...');
        getResponse(this.props, resp_id).then(() => {
            this.$f7.views.main.router.navigate('/requests/response/' + resp_id + '/');
            this.$f7.dialog.close();
        });
    }

    addToReserve = (answerId) => {
        const {request, handleRequest} = this.props;
        const set_data = new setData();
        const get_data = new getData();
        if (answerId > 0) {
            const date = new Date();
            date.setDate(date.getDate() + 3);
            const payload = {reserve_date: date.toISOString().split('T')[0]};
            set_data.dataPut('answer-update/' + answerId, payload).then(async () => {
                await get_data.data('request/' + request.id).then(value => value !== undefined && handleRequest(value));
                this.addFSSuccess.open();
            });
        }
        return true;
    };

    addFSSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Заказ добавлен в резерв на 3 дня',
        closeTimeout: 3000,
    });

    render() {
        const {request} = this.props;
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title="Предложения"
                    backLink="Back"
                >
                    <Subnavbar
                        inner={false}
                        className={"no-margin"}>
                        <List
                            mediaList
                            className={"no-margin list-title"}
                        >
                            <ListItem
                                swipeout
                                after={request.created_at.toLocaleString()}
                                subtitle={"Предложений: " + (request.answers.length || 0) + ""}
                                text={request.text}
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material="access_time" color="blue"/>
                                    {this.get_category(request.category_id)}
                                </span>
                            </ListItem>
                        </List>
                    </Subnavbar>
                </Navbar>
                <List
                    mediaList
                    className={"no-margin list-with-header"}
                >
                    {
                        request.answers.length === 0
                            ?
                            <Block>На ваш запрос пока нет ответов...</Block>
                            :
                            request.answers.map(item =>
                                <ListItem
                                    key={item.id}
                                    button
                                    swipeout
                                    onClick={() => this.open_response(item.id)}
                                    subtitle={this.get_shop(item.shop_id)}
                                    text={item.description}
                                >
                                    {/*after={item.created_at.toLocaleString()}*/}
                                    <span slot="after">
                                        {item.in_stock ?
                                            <Icon className={"status-icon"} material="check_circle" color="green"/> : null}
                                        {item.original ?
                                            <Icon className={"status-icon"} material="copyright" color="blue"/> : null}
                                        {item.reserve_date ?
                                            <Icon className={"status-icon"} material="event" color="orange"/> : null}
                                        </span>
                                    <b slot="title">
                                        {item.price} ₽</b>
                                    {!item.reserve_date
                                    ? <SwipeoutActions right>
                                            <SwipeoutButton close color="orange" onClick={() => this.addToReserve(item.id)}>
                                                <Icon material="event"/> Зарезервировать
                                            </SwipeoutButton>
                                        </SwipeoutActions>
                                    : null}
                                </ListItem>
                            )
                    }
                </List>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        request: store.request[0],
        categories: store.stores.categories,
        shops: store.stores.shops,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        handleRequest: request => dispatch(handleRequest(request)),
        handleResponse: request => dispatch(handleResponse(request)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsesPage)