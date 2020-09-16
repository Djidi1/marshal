import React from 'react';
import {connect} from "react-redux";
import {Detector} from "react-detect-offline";
import {setData} from "../../../axios/setData";
import {getData} from "../../../axios/getData";
import {get} from "idb-keyval";
import {handleRequest, handleResponse} from "../../../actions/DataActions";
import {Icon, ListItem, SwipeoutActions, SwipeoutButton} from "framework7-react";

const Response = (props) => {
  const {
    f7,
    item,
    shops,
    request,
    handleRequest,
    handleResponse,
  } = props;

  const getResponse = async (resp_id) => {
    let detect = new Detector();
    if (await detect.state.online) {
      let get_data = new getData();
      await get_data.data('answer/' + resp_id).then(value => value !== undefined && handleResponse(value));
    }else{
      await get('answer/' + resp_id).then(value => value !== undefined && handleResponse(value));
    }
  };

  const get_shop = (shop_id) => {
    const shop = shops.find(x => x.id === shop_id);
    return shop !== undefined ? shop.name : "Без категории"
  }

  const open_response = (resp_id) => {
    f7.dialog.preloader('Загружаем предложение...');
    getResponse(resp_id).then(() => {
      f7.views.main.router.navigate('/requests/response/' + resp_id + '/');
      f7.dialog.close();
    });
  }

  const addToReserve = (answerId) => {
    const set_data = new setData();
    const get_data = new getData();
    if (answerId > 0) {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      const payload = {reserve_date: date.toISOString().split('T')[0]};
      set_data.dataPut('answer-update/' + answerId, payload).then(async () => {
        await get_data.data('request/' + request.id).then(value => value !== undefined && handleRequest(value));
        addFSSuccess.open();
      });
    }
    return true;
  };

  const addFSSuccess = f7.notification.create({
    icon: '<i class="icon marshal-icon"> </i>',
    title: 'Маршал Сервис',
    subtitle: 'Заказ добавлен в резерв на 3 дня',
    closeTimeout: 3000,
  });

  return (
    <ListItem
      button
      swipeout
      onClick={() => open_response(item.id)}
      subtitle={get_shop(item.shop_id)}
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
        {item.price} ₽
      </b>
      <div className="goods-description" slot="text">
          {item.reserve_date
            ? <span className="reserve">В резерве до {item.reserve_date.toLocaleString().slice(0,10)}</span>
            : null}
          {item.description}
      </div>
      {!item.reserve_date
        ? <SwipeoutActions right>
          <SwipeoutButton close color="orange" onClick={() => addToReserve(item.id)}>
            <Icon material="event"/> Зарезервировать
          </SwipeoutButton>
        </SwipeoutActions>
        : null}
    </ListItem>
  )
}

const mapStateToProps = store => {
  return {
    request: store.request[0],
    shops: store.stores.shops,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleRequest: request => dispatch(handleRequest(request)),
    handleResponse: request => dispatch(handleResponse(request)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Response);
