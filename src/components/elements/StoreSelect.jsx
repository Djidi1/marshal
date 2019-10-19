import React, {Component} from 'react';
import {
    ListInput
} from 'framework7-react';


export default class StoreSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueGroups: {
                type: 'Товар',
                carBrand: 'Все',
                category: 'Все'
            },
            optionGroups: {
                type: ['Товар', 'Ремонт/Услуга'],
                carBrand: ['Все'],
                category: ['Все']
            },
            colorsGroups: {
                type: 'orange',
                carBrand: 'teal',
                category: 'blue'
            },
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
            }), () => {
                if (name === 'carBrand') {
                    const item = carbrands.find(x => x.car_brand === value);
                    if (item || Number(value) === 0) {
                        handleBrand(Number(value) === 0 ? 0 : item.id);
                    }
                }
                if (name === 'category') {
                    const item = categories.find(x => x.category === value);
                    if (item || Number(value) === 0) {
                        handleCategory(Number(value) === 0 ? 0 : item.id);
                    }
                }
            });
        }
    };

    render() {
        const {optionGroups, valueGroups, colorsGroups} = this.state;

        return (
            <>
                <span className="filter-title">Фильтр по магазинам</span>
                <div className="display-flex padding-horizontal-half">
                    {Object.keys(optionGroups).map((type) => {
                        const group = optionGroups[type];
                        return (
                            <ListInput
                                key={`group_${type}`}
                                className={`chip flex-direction-column color-${colorsGroups[type]}`}
                                type="select"
                                placeholder="Выберите..."
                                value={valueGroups[type]}
                                onChange={(event) => this.handleChange(type, event.target.value)}
                            >
                                { type !== 'type' && <option key={0} value={0}>Все</option> }
                                {
                                    group.map((item, index) => (
                                        <option
                                            key={`select_${type}_${index}`}
                                            value={item}
                                        >{item}</option>
                                    ))
                                }
                            </ListInput>
                        )
                    })
                    }
                </div>
            </>
        );
    }
}