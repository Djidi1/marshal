import React from 'react';
import {connect} from "react-redux";
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
} from 'framework7-react';

class StoresPage extends React.Component {

    forward() {
        const app = this.$f7;
        app.dialog.alert('Магазин добавлен в избранные', 'Избранное');
    }

    render() {
        const {stores} = this.props;
        return (
            <div>
                <h1>Магазины</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        stores.map(item =>
                            <ListItem
                                key={item.id}
                                swipeout
                                after={item.phone}
                                subtitle={item.description}
                                text={item.address}
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material="store" color="green"/> {item.name}
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
}

const mapStateToProps = store => {
    console.log(store);
    return {
        stores: store.stores.shops,
    }
};

export default connect(mapStateToProps)(StoresPage)
