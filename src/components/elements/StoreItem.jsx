import React from 'react';
import {connect} from "react-redux";
import {
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
} from 'framework7-react';
import {setData} from "../../axios/setData";
import {getData} from "../../axios/getData";
import {handleFavoriteShops, handleFavoriteShopDelete} from "../../actions/DataActions";

class StoreItem extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            category_id: 1,
            brand_id: 1,
        }
    }

    toFavorite = (shop_id) => {
        const set_data = new setData();
        const get_data = new getData();
        if (shop_id > 0) {
            set_data.dataPut('favorite-shop-add/' + shop_id, {}).then(async () => {
                await get_data.data('favorite-shops').then(value => value !== undefined && this.props.handleFavoriteShops(value.result));
                // todo брать с сервера ответ с магазином, который был добавлен в избранное
                //this.props.handleFavoriteShopAdd(shop_id);
                this.addFSSuccess.open();
            });
        }
    };
    removeFavorite = (shop_id) => {
        const set_data = new setData();
        if (shop_id > 0) {
            set_data.dataPut('favorite-shop-remove/' + shop_id, {}).then(async () => {
                this.props.handleFavoriteShopDelete(shop_id);
                this.removeFSSuccess.open();
            });
        }
    };

    removeFSSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Магазин удален из избранного',
        closeTimeout: 3000,
    });

    addFSSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Магазин добавлен в избранные',
        closeTimeout: 3000,
    });

    editHandle(storeId) {
        this.$f7.views.main.router.navigate('/open_store/' + storeId + '/');
    };

    convertIcon = (data) => {
        data = data.replace(/"/g, '\'');
        data = data.replace(/>\s{1,}</g, "><");
        data = data.replace(/\s{2,}/g, " ");
        data = data.replace(/333333/g, "cb2128");
        const escaped = data.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
        return `url("data:image/svg+xml,${escaped}")`;
    };

    render() {
        const {item, in_favorite} = this.props;


        return (
            <ListItem
                key={item.id}
                button
                swipeout
                link={`/open_store/${item.id}/`}
                text={item.address}
            >
                <strong slot="title">
                    {item.name}
                </strong>
                <span slot="subtitle">
                    {item.categories.map(cat => {
                        return <Icon
                            key={`${item.id}_${cat.id}`}
                            icon='sub-title category-icon'
                            style={{background: this.convertIcon(cat.icon)}}
                        />
                    })} {item.description}
                </span>
                <span slot="after">
                    {item.phone}
                    {in_favorite ? <Icon className="fav-icon" color="orange" material="favorite"/> : null }
                </span>
                {
                    !in_favorite
                        ?
                        <SwipeoutActions left>
                            <SwipeoutButton color="blue" onClick={() => this.toFavorite(item.id)}>
                                <Icon material="favorite"/> В избранное
                            </SwipeoutButton>
                        </SwipeoutActions>
                        :
                        <SwipeoutActions right>
                            <SwipeoutButton color="orange" onClick={() => this.removeFavorite(item.id)}>
                                <Icon material="favorite"/> Из избранного
                            </SwipeoutButton>
                        </SwipeoutActions>
                }
            </ListItem>
        )
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        handleFavoriteShops: data => dispatch(handleFavoriteShops(data)),
        handleFavoriteShopDelete: data => dispatch(handleFavoriteShopDelete(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreItem)
