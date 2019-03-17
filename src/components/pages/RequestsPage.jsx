import React from 'react';
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Fab,
    Icon,
} from 'framework7-react';

export default class extends React.Component {

    edit_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate('open_request/'+reqId+'/');
    }

    reply() {
        const app = this.$f7;
        app.dialog.alert('Reply');
    }

    render() {
        return (
            <div>
                <h1>Заявки</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    <ListItem
                        swipeout
                        link="requests/1/"
                        after="17:14 08.03.2018"
                        subtitle="Предложений: 10"
                        text="Необходимо подобрать тормозные колодки на автомобиль такой-то марки такого-то года выпуска."
                    >
                        <span slot="title">
                            <Icon className={"status-icon"} material="access_time" color="blue"/> Колодки
                        </span>
                        <SwipeoutActions left>
                            <SwipeoutButton color="blue" onClick={() => this.edit_request(1)}>
                                <Icon material="edit"/> Редактировать
                            </SwipeoutButton>
                        </SwipeoutActions>
                        <SwipeoutActions right>
                            <SwipeoutButton
                                color="orange"
                                onClick={this.reply.bind(this)}
                                confirmText="Подтвердите отмену вашей заявки"
                            >
                               <Icon material="delete"/> Отменить заявку
                            </SwipeoutButton>
                        </SwipeoutActions>
                    </ListItem>
                    <ListItem
                        swipeout
                        link="requests/2/"
                        after="17:14 08.03.2018"
                        subtitle="Предложений: 7"
                        text="Требуется комплект запчастей для прохождения ТО-3 на автомобиле таком-то такого-то года выпуска. Пробег 40 000 км."
                    >
                        <span slot="title">
                            <Icon className={"status-icon"} material="new_releases" color="orange"/> TO-3
                        </span>
                        <SwipeoutActions left>
                            <SwipeoutButton color="blue" onClick={() => this.edit_request(2)}>
                                <Icon material="edit"/> Редактировать
                            </SwipeoutButton>
                        </SwipeoutActions>
                        <SwipeoutActions right>
                            <SwipeoutButton
                                color="orange"
                                onClick={this.reply.bind(this)}
                                confirmText="Подтвердите отмену вашей заявки"
                            >
                                <Icon material="delete"/> Отменить заявку
                            </SwipeoutButton>
                        </SwipeoutActions>
                    </ListItem>
                </List>
                <Fab
                    href="open_request/0/"
                    position="right-bottom"
                    slot="fixed"
                    color="blue"
                >
                    <Icon ios="f7:add" md="material:add"/>
                </Fab>
            </div>
        );
    }
};
