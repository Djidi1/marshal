import React from 'react';
import {connect} from "react-redux";
import {
    List,
    Icon,
    BlockTitle,
    Toolbar,
    Link,
} from 'framework7-react';
import {setData} from "../../axios/setData";
import {getData} from "../../axios/getData";
import {handleFavoriteShops} from "../../actions/DataActions";
import StoreItem from '../elements/StoreItem'

class StoresPage extends React.Component {
    constructor() {
        super();
        this.state = {
            category_id: 1,
            brand_id: 1,
        }
    }

    componentWillUpdate(prevProps) {
        const {categories, carbrands} = this.props;
        if (this.props.carbrands !== prevProps.carbrands) {
            if (categories[0] && carbrands[0]) {
                this.setState({
                    category_id: categories[0].id,
                    brand_id: carbrands[0].id
                });
            }
        }
    }

    handleBrand = (brand_id) => {
        this.setState({ brand_id });
    };
    handleCategory = (category_id) => {
        this.setState({ category_id });
    };

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


    editHandle(storeId) {
        this.$f7.views.main.router.navigate('/open_store/' + storeId + '/');
    };

    convertIcon = (data) => {
        data = data.replace(/"/g, '\'');
        data = data.replace(/>\s{1,}</g, "><");
        data = data.replace(/\s{2,}/g, " ");
        data = data.replace(/333333/g, "cb2128");
        const escaped = data.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
        return  `url("data:image/svg+xml,${escaped}")`;
    };

    render() {
        const {shops, favorite_shops, categories, carbrands} = this.props;
        const {category_id, brand_id} = this.state;

        const filtered_shops = shops.filter(x => {
            return x.categories.find(y => y.id === category_id)
                && (x.car_brands.find(y => y.pivot.car_brand_id === brand_id)
                    || !!x.car_brands)
        });

        return (
            <>
                <Toolbar themeDark tabbar scrollable position='top'>
                    {carbrands.map((brand) => (
                        <Link
                            key={brand.id}
                            tabLink={`#tab-${brand.id}`}
                            tabLinkActive={brand.id === brand_id}
                            onClick={() => this.handleBrand(brand.id)}
                        >{brand.car_brand}</Link>
                    ))}
                </Toolbar>
                <Toolbar tabbar labels scrollable position='top'>
                    {categories.sort((a, b) => {
                        return a.category < b.category ? -1 : 1
                    })
                        .map((cat) => {
                            return <Link
                                key={cat.id}
                                tabLink={`#tab-${cat.id}`}
                                tabLinkActive={cat.id === category_id}
                                onClick={() => this.handleCategory(cat.id)}
                            >
                                <Icon
                                    icon='category-icon'
                                    style={{background: this.convertIcon(cat.icon)}}
                                />
                                <span className='tabbar-label'>{cat.category}</span>
                            </Link>
                        }
                    )}
                </Toolbar>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    <ul>
                        {
                            (filtered_shops.length)
                                ? filtered_shops.map(item => {
                                    const in_favorite = !!favorite_shops.find(x => x.id === item.id);
                                    return <StoreItem in_favorite={in_favorite} key={item.id} item={item}/>
                                })
                                : <BlockTitle>Подходящие магазины не найдены</BlockTitle>
                        }
                    </ul>
                </List>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        shops: store.stores.shops,
        favorite_shops: store.stores.favorite_shops,
        categories: store.stores.categories,
        carbrands: store.carbrands
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleFavoriteShops: data => dispatch(handleFavoriteShops(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoresPage)
