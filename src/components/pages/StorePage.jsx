import React from 'react';
import {connect} from "react-redux";
import {
    Icon,
    Block,
    BlockTitle,
    Navbar,
    Page,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    Button
} from 'framework7-react';
import {setData} from "../../axios/setData";
import {getData} from "../../axios/getData";
import {handleFavoriteShops} from "../../actions/DataActions";

class StorePage extends React.Component {

    constructor() {
        super();
        this.state = {
            store: {}
        }
    }

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
    componentDidMount() {
        const store_id = Number(this.$f7route.params.storeId);
        const store = this.props.shops.find(shop => shop.id === store_id);
        this.setState({store});
    }

    render() {
        const {store} = this.state;
        return (
            <Page>
                <Navbar
                    title="Информация о магазине"
                    backLink="Back"
                />
                <Block strong>
                    <BlockTitle className={"center"}>
                        <Icon className={"status-icon"}
                              size="128px"
                              material="store"
                              color="green"/>
                    </BlockTitle>
                    <Card>
                        <CardHeader
                            className="no-border store-header"
                            valign="bottom"
                        >{store.name}
                            <Button
                                color="yellow"
                                onClick={() => this.toFavorite(store.id)}
                            >
                                <Icon
                                    material="favorite"
                                    size="24px"
                                />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <p>{store.description}.</p>
                        </CardContent>
                        <CardFooter>
                            {store.address}
                            <a
                                className={"external"}
                                href={`tel:${store.phone}`}
                                target={"_system"}
                            >{store.phone}</a>
                        </CardFooter>
                    </Card>
                </Block>
            </Page>
        );
    }
}

const mapStateToProps = store => {
    return {
        shops: store.stores.shops,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleFavoriteShops: data => dispatch(handleFavoriteShops(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StorePage)
