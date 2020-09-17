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
  Button,
  Chip
} from 'framework7-react';
import {setData} from "../../axios/setData";
import {getData} from "../../axios/getData";
import {handleFavoriteShopDelete, handleFavoriteShops} from "../../actions/DataActions";

class StorePage extends React.Component {

  constructor() {
    super();
    this.state = {
      store: {
        type: {},
        categories: [],
        car_brands: [],
      },
      in_favorite: false
    }
  }

  componentDidMount() {
    const store_id = Number(this.$f7route.params.storeId);
    const shops = this.props.shops || [];
    const favorite_shops = this.props.favorite_shops || [];
    const store = shops.find(shop => shop.id === store_id);
    const in_favorite = !!favorite_shops.find(x => x.id === store.id);
    this.setState({store, in_favorite});
  }

  add = ($f7, shop_id) => {
    const set_data = new setData();
    const get_data = new getData();
    if (shop_id > 0) {
      set_data.dataPut('favorite-shop-add/'+shop_id, {}).then(async () => {
        await get_data.data('favorite-shops').then(value => {
          value !== undefined && this.props.handleFavoriteShops(value.result);
          $f7.notification.create({
            icon: '<i class="icon marshal-icon"> </i>',
            title: 'Маршал Сервис',
            subtitle: 'Магазин добавлен в избранные',
            closeTimeout: 3000,
          }).open();
          this.setState({in_favorite: !this.state.in_favorite});
        });
      });
    }
  };

  remove = ($f7, shop_id) => {
    const set_data = new setData();
    if (shop_id > 0) {
      set_data.dataPut('favorite-shop-remove/' + shop_id, {}).then(async () => {
        this.props.handleFavoriteShopDelete(shop_id);
        $f7.notification.create({
          icon: '<i class="icon marshal-icon"> </i>',
          title: 'Маршал Сервис',
          subtitle: 'Магазин удален из избранного',
          closeTimeout: 3000,
        }).open();
        this.setState({in_favorite: !this.state.in_favorite});
      });
    }
  };

  handleFavorite = async (type, store_id) => {
    const f7 = this.$f7;
    if (type === 'add') {
      await this.add(f7, store_id);
    } else {
      await this.remove(f7, store_id);
    }

  };

  render() {
    const { store, in_favorite } = this.state;
    const { storeId } = this.props;

    return (
      <Page>
        <Navbar
          title="Информация о магазине"
          backLink="Back"
        />
        <Block strong>
          <BlockTitle className={"center"}>
            <Icon
              size="128px"
              material="store"
              color="green"/>
            <div>{store.type.type}</div>
          </BlockTitle>
          <Card>
            <CardHeader
              className="no-border store-header"
              valign="bottom"
            >{store.name}
              {
                !in_favorite
                  ? <Button color="white" onClick={() => this.handleFavorite('add',store.id)}>
                    <Icon material="favorite_border" size="24px"/>
                  </Button>
                  : <Button color="orange" onClick={() => this.handleFavorite('remove',store.id)}>
                    <Icon material="favorite" size="24px"/>
                  </Button>
              }

            </CardHeader>
            <CardContent>
              <p>{store.description}.</p>
              <h4>Марки автомобилей</h4>
              {
                store.car_brands.length ?
                  store.car_brands.map(brand => {
                    return <Chip
                      key={brand.pivot.car_brand_id}
                      text={brand.car_brand}
                      media={brand.car_brand[0]}
                      mediaBgColor="main"
                    />
                  }) : <Chip
                    text={"Все"}
                  />
              }
              <h4>Категории</h4>
              {
                store.categories.map(cat => (
                  <Chip outline key={cat.id} text={cat.category} className="category-tag">
                    <span slot="media" className={'cat-icon-store'} dangerouslySetInnerHTML={{__html: cat.icon }} />
                  </Chip>
                ))
              }
            </CardContent>
            <CardContent>
              <Button
                href={`/open_request/0/${storeId}/`}
                fill
              >
                Написать в магазин
              </Button>
            </CardContent>
            <CardFooter>
              {store.address}
              {store.section}
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
    favorite_shops: store.stores.favorite_shops,
    shops: store.stores.shops,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleFavoriteShops: data => dispatch(handleFavoriteShops(data)),
    handleFavoriteShopDelete: data => dispatch(handleFavoriteShopDelete(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StorePage)
