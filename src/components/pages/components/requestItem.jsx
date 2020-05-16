import React from 'react';
import {connect} from "react-redux";
import {Detector} from "react-detect-offline";
import {setData} from "../../../axios/setData";
import {getData} from "../../../axios/getData";
import {get} from "idb-keyval";
import {handleDeleteRequest, handleRequest} from "../../../actions/DataActions";
import {Icon, ListItem, SwipeoutActions, SwipeoutButton} from "framework7-react";

const RequestListItem = (props) => {
  const {
    item,
    categories,
    handleDeleteRequest,
    handleRequest,
    f7,
  } = props;

  const getRequest = async (reqId) => {
    let detect = new Detector();
    if (await detect.state.online) {
      let get_data = new getData();
      await get_data.data('request/' + reqId).then(value => value !== undefined && handleRequest(value));
    } else {
      await get('request/' + reqId).then(value => value !== undefined && handleRequest(value));
    }
  };

  const deleteRequest = (req_id) => {
    const set_data = new setData();
    if (req_id > 0) {
      set_data.dataDelete('request-delete/' + req_id).then(() => {
        handleDeleteRequest(req_id);
      });
    }
  };

  const deleteHandle = (req_id) => {
    f7.dialog.confirm('Эта операция необратима',
      'Удалить заявку?',
      () => deleteRequest(req_id),
      () => {});
  }

  const edit_request = (reqId) => {
    f7.views.main.router.navigate('open_request/' + reqId + '/');
  }
  const open_request = (reqId) => {
    f7.dialog.preloader('Получаем предложения...');
    getRequest(reqId).then(() => {
      f7.views.main.router.navigate('requests/' + reqId + '/', { animate: false, props: { f7 } });
      f7.dialog.close();
    });
  }

  const get_category = (cat_id) => {
    const cat = categories ? categories.find(x => x.id === cat_id) : undefined;
    return cat !== undefined ? cat.category : "Без категории"
  }

  return (
    <ListItem
      swipeout
      onClick={() => open_request(item.id)}
      after={item.created_at.toLocaleString()}
      subtitle={"Предложений: " + (item.answers_count) + ""}
      text={item.text}
      className={'ripple'}
    >
      <span slot="title">
        <Icon
          className={"status-icon"}
          material={item.answers_count > 0 ? 'check_circle_outline' : 'access_time'}
          color="blue"
        />
        {get_category(item.category_id)}
      </span>
      <SwipeoutActions left>
        <SwipeoutButton close color="blue" onClick={() => edit_request(item.id)}>
          <Icon material="edit"/> Редактировать
        </SwipeoutButton>
      </SwipeoutActions>
      <SwipeoutActions right>
        <SwipeoutButton close color="#cb2128" onClick={() => deleteHandle(item.id)}>
          <Icon material="delete"/> Удалить
        </SwipeoutButton>
      </SwipeoutActions>
    </ListItem>
  );
}

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleRequest: request => dispatch(handleRequest(request)),
    handleDeleteRequest: data => dispatch(handleDeleteRequest(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestListItem);
