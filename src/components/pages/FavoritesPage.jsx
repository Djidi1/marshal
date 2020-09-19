import React from 'react';
import {
    List,
    BlockTitle,
} from 'framework7-react';
import {connect} from "react-redux";
import StoreItem from "../elements/StoreItem";

class FavoritesPage extends React.Component {
    render() {
        const {favorite_shops, shops} = this.props;
        const fav_shops = shops.filter(x => favorite_shops.find(y => y.id === x.id));
        return (
            <>
                <h1>Избранное</h1>
                {
                    (fav_shops.length) ?
                        <List
                            mediaList
                            className={"no-margin"}
                        >
                            <ul>
                                {
                                    fav_shops.map(item =>
                                        <StoreItem in_favorite={true} key={item.id} item={item}/>
                                    )
                                }
                            </ul>
                        </List> : <BlockTitle
                            style={{whiteSpace: 'initial'}}
                        >Вы пока не добавили магазины в избранное</BlockTitle>
                }
            </>
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