import React from 'react';
import {connect} from "react-redux";
import {getData} from "../../axios/getData";
import {setData} from "../../axios/setData";
import {handleRequest,handleDeleteRequest} from "../../actions/DataActions";

import {Detector} from "react-detect-offline";
import {get} from "idb-keyval";
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    Block,
    BlockTitle
} from 'framework7-react';

const getRequest = async (props, reqId) => {
    let detect = new Detector();
    if (await detect.state.online) {
        let get_data = new getData();
        await get_data.data('request/' + reqId).then(value => value !== undefined && props.handleRequest(value));
    }else{
        await get('request/' + reqId).then(value => value !== undefined && props.handleRequest(value));
    }
};

class RequestsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteRequest = (req_id) => {
        const set_data = new setData();
        if (req_id > 0) {
            set_data.dataDelete('request-delete/'+req_id).then(() => {
                this.props.handleDeleteRequest(req_id);
            });
        }
    };

    deleteHandle(req_id) {
        const app = this.$f7;
        app.dialog.confirm('Эта операция необратима', 'Удалить заявку?', () => this.deleteRequest(req_id), () => {});
    }

    edit_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate('open_request/' + reqId + '/');
    }

    open_request(reqId) {
        this.$f7.dialog.preloader('Получаем предложения...');
        getRequest(this.props, reqId).then(() => {
            this.$f7.views.main.router.navigate('requests/' + reqId + '/');
            this.$f7.dialog.close();
        });
    }

    get_category(cat_id) {
        const cat = this.props.categories.find(x => x.id === cat_id);
        return cat !== undefined ? cat.category : "Без категории"
    }

    render() {
        const {requests} = this.props;
        return (
            <React.Fragment>
                <BlockTitle
                    style={{whiteSpace: 'initial'}}
                >Здесь вы можете подать заявку на подбор необходимого вам автотовара или запчасти.</BlockTitle>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        requests.length === 0
                            ?
                            <Block>Вы пока не создавали запросов... Настало время?</Block>
                            :
                            requests.map(item => {
                                return <ListItem
                                    key={item.id}
                                    swipeout
                                    onClick={() => this.open_request(item.id)}
                                    after={item.created_at.toLocaleString()}
                                    subtitle={"Предложений: " + (item.answers_count) + ""}
                                    text={item.text}
                                    className={'ripple'}
                                    >
                                    <span slot="title">
                                        <Icon
                                            className={"status-icon"}
                                            material={item.answers > 0 ? 'check_circle_outline' : 'access_time'}
                                            color="blue"
                                        />
                                        {this.get_category(item.category_id)}
                                    </span>
                                    <SwipeoutActions left>
                                        <SwipeoutButton color="blue" onClick={() => this.edit_request(item.id)}>
                                            <Icon material="edit"/> Редактировать
                                        </SwipeoutButton>
                                    </SwipeoutActions>
                                    <SwipeoutActions right>
                                        <SwipeoutButton color="#cb2128" onClick={() => this.deleteHandle(item.id)}>
                                            <Icon material="delete"/> Удалить
                                        </SwipeoutButton>
                                    </SwipeoutActions>
                                </ListItem>
                            })
                    }
                </List>
            </React.Fragment>
        );
    }
}


const mapStateToProps = store => {
    return {
        requests: store.requests,
        categories: store.stores.categories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleRequest: request => dispatch(handleRequest(request)),
        handleDeleteRequest: data => dispatch(handleDeleteRequest(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsPage)