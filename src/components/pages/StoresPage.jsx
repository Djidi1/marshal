import React from 'react';
import {connect} from "react-redux";
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    AccordionContent,
    BlockTitle,
} from 'framework7-react';
import {setData} from "../../axios/setData";
import {getData} from "../../axios/getData";
import {handleFavoriteShops} from "../../actions/DataActions";

class StoresPage extends React.Component {
    toFavorite = (shop_id) => {
        const set_data = new setData();
        const get_data = new getData();
        if (shop_id > 0) {
            set_data.dataPut('favorite-shop-add/'+shop_id, {}).then(async () => {
                await get_data.data('favorite-shops').then(value => value !== undefined && this.props.handleFavoriteShops(value.result));
                // todo брать с сервера ответ с магазином, который был добавлен в избранное
                //this.props.handleFavoriteShopAdd(shop_id);
                this.addFSSuccess.open();
            });
        }
    };

    addFSSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Магазин добавлен в избранные',
        closeTimeout: 3000,
    });

    render() {
        const {shops, categories} = this.props;
        return (
            <React.Fragment>
                <BlockTitle>Выберите интересующую вас категорию автотоваров:</BlockTitle>
                <List accordionList>
                    {
                        categories.sort((a, b) => {
                            return a.category < b.category ? -1 : 1
                        })
                            .map((cat, index) =>
                            <ListItem
                                key={index}
                                accordionItem>
                                <span slot="title" className={'categories-list'}>
                                    <span className={'cat-icon'} dangerouslySetInnerHTML={{__html: cat.icon }} /> {cat.category}
                                </span>
                                <AccordionContent>
                                    <List
                                        mediaList
                                        className={"no-margin"}
                                    >
                                        { (shops.length) ?
                                            shops.filter(x => x.categories.find(y => y.id === cat.id)).map(item =>
                                                <ListItem
                                                    key={item.id}
                                                    swipeout
                                                    after={item.phone}
                                                    subtitle={item.description}
                                                    text={item.address}
                                                >
                                                    <span slot="title">
                                                        <Icon className={"status-icon"} material="store"
                                                              color="green"/> {item.name}
                                                    </span>
                                                    <SwipeoutActions left>
                                                        <SwipeoutButton color="blue" onClick={() => this.toFavorite(item.id)}>
                                                            <Icon material="favorite"/> В избранное
                                                        </SwipeoutButton>
                                                    </SwipeoutActions>
                                                </ListItem>
                                            )
                                            : null
                                        }
                                    </List>
                                </AccordionContent>
                            </ListItem>
                        )
                    }
                </List>
            </React.Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        shops: store.stores.shops,
        categories: store.stores.categories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleFavoriteShops: data => dispatch(handleFavoriteShops(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoresPage)
