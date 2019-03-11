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

    forward() {
        const app = this.$f7;
        app.dialog.alert('Forward');
    }

    reply() {
        const app = this.$f7;
        app.dialog.alert('Reply');
    }

    render() {
        return (
            <div>
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
                            <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>
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
                            <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>
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
                <Fab position="right-bottom" slot="fixed" color="blue">
                    <Icon ios="f7:add" md="material:add"/>
                    <Icon ios="f7:close" md="material:close"/>
                </Fab>
            </div>
        );
    }
};
