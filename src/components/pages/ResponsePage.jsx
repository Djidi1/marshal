import React, {Component} from 'react';
import {
    Page,
    Navbar,
    Subnavbar,
    Link,
    List,
    Icon,
    ListItem,
    NavRight,
} from 'framework7-react';

import Messages from './Messages'

export default class ResponsePage extends Component {
    render() {
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title="Предложение"
                    backLink="Back"
                >
                    <NavRight>
                        <Link iconMd="material:chat" href={"/messages/"}/>
                    </NavRight>
                    <Subnavbar
                        inner={false}
                        className={"no-padding"}
                    >
                        <List
                            mediaList
                            className={"no-margin list-request"}
                        >
                            <ListItem
                                after="17:14 08.03.2018"
                                subtitle="1000 запчастей"
                                text="У нас есть то что вам нужно"
                            >
                                <b slot="title"><Icon className={"status-icon"} material="fiber_new" color="green"/> 500р</b>
                            </ListItem>
                        </List>
                    </Subnavbar>
                </Navbar>
                <Messages/>
            </Page>
        );
    }
}