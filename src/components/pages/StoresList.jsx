import React from 'react';
import { connect } from "react-redux";
import {
    Page,
    Navbar,
    List,
    Subnavbar,
    Searchbar,
    Block,
    ListItem,
    Link,
    NavRight
} from 'framework7-react';

class ShopsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vlData: {
                items: [],
            },
            selectedShops: [],
        };
    }

    searchAll = (query, items) => {
        const found = [];
        for (let i = 0; i < items.length; i += 1) {
            if (items[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
        }
        return found; // return array with mathced indexes
    };

    renderExternal(vl, vlData) {
        this.setState({ vlData });
    }

    handleToggle = (item) => {
        this.setState({selectedShops: [item.id]});
        /*
        let selectedShops = this.state.selectedShops;
        item.checked = (item.hasOwnProperty('checked')) ? !item.checked : true;
        if (item.checked) {
            selectedShops.push(item.id);
        } else {
            selectedShops = selectedShops.filter(x => x !== item.id);
        }
        this.setState({selectedShops: selectedShops});
        */
    };

    setShops = () => {
        this.props.handleShops(this.state.selectedShops);
        this.$f7router.back();
    };

    componentDidMount() {
        const {shops, selected_shops} = this.props;
        this.setState({selectedShops: [...selected_shops]});
        shops.forEach((item) => {
            item.checked = [...selected_shops].indexOf(item.id) !== -1;
        })
    }

    render() {
        const {shops} = this.props;
        const {vlData, selectedShops} = this.state;
        return (
            <Page
                className="stores-list">
                <Navbar title="Список магазинов"
                        backLink="Back"
                        bgColor="main"
                        textColor="white"
                        color="white"
                >
                    <NavRight>
                        <Link iconIos="material:done" onClick={() => this.setShops()}/>
                    </NavRight>
                    <Subnavbar inner={false} className={"search-bar"}>
                        <Searchbar
                            searchContainer=".virtual-list"
                            searchItem="li"
                            searchIn=".item-title"
                            placeholder="Поиск"
                        />
                    </Subnavbar>
                </Navbar>
                <Block>
                    <p>Здесь вы можете выбрать в какой магазин хотите отправить запрос</p>
                </Block>
                <List className="searchbar-not-found">
                    <ListItem title="Магазины не найдены..."/>
                </List>
                <List
                    className="searchbar-found"
                    medialList
                    virtualList
                    virtualListParams={
                        {
                            items: shops,
                            searchAll: this.searchAll,
                            renderExternal: this.renderExternal.bind(this),
                            height: this.$theme.ios ? 63 : 73
                        }
                    }
                >
                    <ul>
                        {vlData.items.map((item, index) => (
                            <ListItem
                                key={index}
                                mediaItem
                                radio
                                checked={selectedShops.indexOf(item.id) !== -1 /*item.checked*/}
                                onClick={() => this.handleToggle(item)}
                                title={item.name}
                                subtitle={item.address}
                                after={item.phone}
                                style={{top: `${vlData.topPosition}px`}}
                            />
                        ))}
                    </ul>
                </List>
            </Page>
        )
    }
}

const mapStateToProps = store => {
    return {
        shops: store.stores.shops,
    }
};

export default connect(mapStateToProps)(ShopsList)