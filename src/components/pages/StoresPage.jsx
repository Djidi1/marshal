import React from 'react';
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
} from 'framework7-react';

export default class extends React.Component {

    forward() {
        const app = this.$f7;
        app.dialog.alert('Favorite');
    }



    render() {
        return (
            <div>
                <h1>Магазины</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    <ListItem
                        swipeout
                        after="17:14 08.03.2018"
                        subtitle="Колодки, масла, колеса"
                        text="Автозапчасти для всех марок."
                    >
                        <span slot="title">
                            <Icon className={"status-icon"} material="store" color="blue"/> 1000 запчастей
                        </span>
                        <SwipeoutActions left>
                            <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>
                                <Icon material="favorite"/> В избранное
                            </SwipeoutButton>
                        </SwipeoutActions>
                    </ListItem>
                    <ListItem
                        swipeout
                        after="17:14 08.03.2018"
                        subtitle="В наличии и на заказ"
                        text="Автозапчасти для BMW."
                    >
                        <span slot="title">
                            <Icon className={"status-icon"} material="store" color="blue"/> Все для BMW
                        </span>
                        <SwipeoutActions left>
                            <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>
                                <Icon material="favorite"/> В избранное
                            </SwipeoutButton>
                        </SwipeoutActions>
                    </ListItem>
                </List>
            </div>
        );
    }
};
