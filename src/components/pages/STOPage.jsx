import React from 'react';
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
} from 'framework7-react';
import {connect} from "react-redux";

class STOPage extends React.Component {

    forward() {
        const app = this.$f7;
        app.dialog.alert('СТО добавлено в избранные', 'Избранное');
    }

    render() {
        const {sto} = this.props;
        return (
            <div>
                <h1>СТО</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        sto.map(item =>
                            <ListItem
                                key={item.id}
                                swipeout
                                after={item.updated_at.toLocaleString()}
                                subtitle={item.description}
                                text={item.address}
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material="build" color="purple"/> {item.name}
                                </span>
                                <SwipeoutActions left>
                                    <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>
                                        <Icon material="favorite"/> В избранное
                                    </SwipeoutButton>
                                </SwipeoutActions>
                            </ListItem>
                        )
                    }
                </List>
            </div>
        );
    }
};

const mapStateToProps = store => {
    return {
        sto: store.sto,
    }
}

export default connect(mapStateToProps)(STOPage)