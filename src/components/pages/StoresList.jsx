import React from 'react';
import {
    Page,
    Navbar,
    List,
    Subnavbar,
    Searchbar,
    Block,
    ListItem,
} from 'framework7-react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        const items = [];
        for (let i = 1; i <= 1000; i += 1) {
            items.push({
                title: `Магазин ${i}`,
                subtitle: `Описание и адрес ${i}`,
            });
        }
        this.state = {
            items,
            vlData: {
                items: [],
            },
        };
    }
    searchAll(query, items) {
        const found = [];
        for (let i = 0; i < items.length; i += 1) {
            if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
        }
        return found; // return array with mathced indexes
    }
    renderExternal(vl, vlData) {
        this.setState({ vlData });
    }
    render() {
        return (
            <Page
                className="stores-list">
                <Navbar title="Список магазинов"
                        backLink="Back"
                        bgColor="red"
                        textColor="white"
                        color="white"
                >
                    <Subnavbar inner={false} className={"search-bar"}>
                        <Searchbar
                            searchContainer=".virtual-list"
                            searchItem="li"
                            searchIn=".item-title"
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
                    virtualListParams={{ items: this.state.items, searchAll: this.searchAll, renderExternal: this.renderExternal.bind(this), height: this.$theme.ios ? 63 : 73}}
                >
                    <ul>
                        {this.state.vlData.items.map((item, index) => (
                            <ListItem
                                key={index}
                                mediaItem
                                checkbox
                                title={item.title}
                                subtitle={item.subtitle}
                                style={{top: `${this.state.vlData.topPosition}px`}}
                            />
                        ))}
                    </ul>
                </List>
            </Page>
        )
    }
}