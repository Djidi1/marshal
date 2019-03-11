import React, {Component} from 'react';
import {
    Page,
    Navbar,
    Subnavbar,
    List,
    Icon,
    ListItem,
} from 'framework7-react';


export default class RequestPage extends Component {
    render() {
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="red"
                    title="Предложения"
                    backLink="Back"
                >
                    <Subnavbar
                        inner={false}
                        className={"no-padding"}
                    >
                        <List
                            mediaList
                            className={"no-margin list-request"}
                        >
                            <ListItem
                                swipeout
                                after="17:14 08.03.2018"
                                subtitle="Предложений: 10"
                                text="Необходимо подобрать тормозные колодки на автомобиль такой-то марки такого-то года выпуска."
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material="access_time" color="blue"/> Колодки
                                </span>
                                <span slot="sub-title">
                                    <b>Ford</b> Fiesta
                                </span>
                            </ListItem>
                        </List>
                        {/*<Block strong>
                    <ul>
                        {Object.keys(this.$f7route.params).map(key => (
                            <li key={key}><b>{key}:</b> {this.$f7route.params[key]}</li>
                        ))}
                    </ul>
                </Block>*/}
                    </Subnavbar>
                </Navbar>
                <List
                    mediaList
                    noHairlinesMd
                >
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="fiber_new" color="green"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="fiber_new" color="green"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="remove_circle" color="red"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="remove_circle" color="red"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="remove_circle" color="red"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title">500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title">500р</b>
                    </ListItem>

                </List>
            </Page>
        );
    }
}