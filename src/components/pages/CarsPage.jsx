import React from 'react';
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    Navbar,
    Page
} from 'framework7-react';

export default class extends React.Component {

    forward() {
        const app = this.$f7;
        app.dialog.alert('Favorite');
    }



    render() {
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title="Мои автомобили"
                    backLink="Back"
                >
                </Navbar>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    <ListItem
                        swipeout
                        after="17:14 08.03.2018"
                        subtitle="VIN: 0000000000000"
                        text="Пробег: 40 000 км"
                    >
                        <span slot="title">
                            <Icon className={"status-icon"} material="directions_car" color="blue"/> BMW X5
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
                        subtitle="VIN: 0000000000000"
                        text="Пробег: 10 000 км"
                    >
                        <span slot="title">
                            <Icon className={"status-icon"} material="directions_car" color="blue"/> Mercedes 600
                        </span>
                        <SwipeoutActions left>
                            <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>
                                <Icon material="favorite"/> В избранное
                            </SwipeoutButton>
                        </SwipeoutActions>
                    </ListItem>
                </List>
            </Page>
        );
    }
};