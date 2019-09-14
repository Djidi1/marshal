import React from 'react';
import {
    List,
} from 'framework7-react';
import {connect} from "react-redux";
import StoreItem from "../elements/StoreItem";

class FavoritesPage extends React.Component {
    render() {
        const {favorite_shops, shops} = this.props;
        const fav_shops = shops.filter(x => favorite_shops.find(y => y.id === x.id));
        return (
            <div>
                <h1>Избранное</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    <ul>
                        {
                            (fav_shops.length) ?
                                fav_shops.map(item =>
                                    <StoreItem in_favorite={true} key={item.id} item={item}/>
                                ) : "Вы можете добавить любимые магазины в избранное."
                        }
                    </ul>
                </List>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        favorite_shops: store.stores.favorite_shops,
        shops: store.stores.shops,
    }
};


export default connect(mapStateToProps)(FavoritesPage)