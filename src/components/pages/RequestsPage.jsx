import React from 'react';
import {connect} from "react-redux";
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
} from 'framework7-react';

class RequestsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    edit_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate('open_request/'+reqId+'/');
    }

    reply() {
        const app = this.$f7;
        app.dialog.alert('Reply');
    }

    render() {
        const {requests} = this.props;

        return (
            <div>
                <h1>Заявки</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        requests.map( item => {
                            return <ListItem
                                key={item.id}
                                swipeout
                                link={"requests/" + item.id + "/"}
                                after={item.date.toLocaleString()}
                                subtitle={"Предложений: " + item.answers + ""}
                                text={item.text}
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material={item.status} color="blue"/> {item.category}
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
                        })
                    }
                </List>
            </div>
        );
    }
};


const mapStateToProps = store => {
    return {
        requests: store.requests,
    }
}

export default connect(mapStateToProps)(RequestsPage)