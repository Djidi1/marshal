import React, {Component} from 'react';
import {
    Page,
    Navbar,
    Subnavbar,
    List,
    Icon,
    ListItem,
} from 'framework7-react';

import Messages from './Messages'
import connect from "react-redux/es/connect/connect";



class ResponsePage extends Component {

    get_shop(shop_id) {
        const shop = this.props.shops.find(x => x.id === shop_id);
        return shop !== undefined ? shop.name : "Без категории"
    }

    render() {
        const {response, user} = this.props;
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title="Предложение"
                    backLink="Back"
                >
                   {/* <NavRight>
                        <Link iconMd="material:chat" href={"/messages/"}/>
                    </NavRight>*/}
                    <Subnavbar
                        inner={false}
                        className={"no-padding"}
                    >
                        <List
                            mediaList
                            className={"no-margin list-request"}
                        >
                            <ListItem
                                key={response.id}
                                onClick={() => this.open_response(response.id)}
                                after={response.created_at.toLocaleString()}
                                subtitle={this.get_shop(response.shop_id)}
                                text={response.description}
                            >
                                <b slot="title">
                                    {
                                        response.is_new ? <Icon className={"status-icon"} material="fiber_new"
                                                            color="green"/> : null
                                    }
                                    {response.price}</b>
                            </ListItem>
                        </List>
                    </Subnavbar>
                </Navbar>
                <Messages user={user}/>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        response: store.response[0],
        shops: store.stores.shops,
        user: store.user,
    }
};

export default connect(mapStateToProps)(ResponsePage)