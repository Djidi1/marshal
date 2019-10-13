import React, {Component} from 'react';
import Picker from 'react-mobile-picker';
import {
    PageContent,
    Sheet,
    Toolbar,
    Link,
    Chip,
} from 'framework7-react';


export default class StoreSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPickerShow: false,
            valueGroups: {
                type: 'Товар',
                carBrand: '',
                category: ''
            },
            optionGroups: {
                type: ['Товар', 'Ремонт/Услуга'],
                carBrand: [''],
                category: ['']
            }
        };
    }

    componentDidUpdate(prevProps) {
        const { carbrands, categories } = this.props;
        if (carbrands !== prevProps.carbrands || categories !== prevProps.categories) {
            if (categories.length !== 0 && carbrands.length !== 0) {
                const names_only_brands = carbrands.map(item => item.car_brand);
                const names_only_categories = categories.map(item => item.category);
                this.setState(({valueGroups, optionGroups}) => ({
                    optionGroups: {
                        ...optionGroups,
                        carBrand: names_only_brands,
                        category: names_only_categories,
                    },
                    valueGroups: {
                        ...valueGroups,
                        carBrand: names_only_brands[0],
                        category: names_only_categories[0],
                    }
                }))
            }
        }
    }

    handleChange = (name, value) => {
        const { carbrands, categories, handleBrand, handleCategory } = this.props;
        if (carbrands) {
            this.setState(({valueGroups}) => ({
                valueGroups: {
                    ...valueGroups,
                    [name]: value
                }
            }));
            if (name === 'carBrand') {
                const item = carbrands.find(x => x.car_brand === value);
                if (item) {
                    handleBrand(item.id);
                }
            }
            if (name === 'category') {
                const item = categories.find(x => x.category === value);
                if (item) {
                    handleCategory(item.id);
                }
            }
        }
    };

    togglePicker = () => {
        this.setState(({isPickerShow}) => ({
            isPickerShow: !isPickerShow
        }));
    };

    render() {
        const {isPickerShow, optionGroups, valueGroups} = this.state;

        return (
            <>
                <span className="filter-title">Фильтр по магазинам</span>
                <div className="display-flex padding-horizontal-half" onClick={this.togglePicker}>
                    <Chip className="flex-direction-column" text={valueGroups.type} color="orange" />
                    <Chip className="flex-direction-column" text={valueGroups.carBrand} color="teal" />
                    <Chip className="flex-direction-column" text={valueGroups.category} color="blue" />
                </div>
                <Sheet className="demo-sheet" opened={isPickerShow} onSheetClosed={() => {this.setState({isPickerShow: false})}}>
                    <Toolbar>
                        <div className="left">
                            <span className="padding">Фильтр по магазинам</span>
                        </div>
                        <div className="right">
                            <Link onClick={this.togglePicker} sheetClose>OK</Link>
                        </div>
                    </Toolbar>
                    <PageContent>
                        <div className="display-flex padding-horizontal-half">
                            <span className="flex-direction-column">Тип</span>
                            <span className="flex-direction-column">Марка</span>
                            <span className="flex-direction-column">Категория</span>
                        </div>
                        <Picker
                            optionGroups={optionGroups}
                            valueGroups={valueGroups}
                            onChange={this.handleChange} />
                    </PageContent>
                </Sheet>

            </>
        );
    }
}