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
                carBrand: '',
                category: ''
            },
            optionGroups: {
                type: ['Товар', 'Ремонт/Услуга'],
                carBrand: [''],
                category: ['']
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
/**/
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
                                { type !== 'type' && <option key={0} value={null}>Все</option> }
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