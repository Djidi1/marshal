import React from 'react';
import { connect } from "react-redux";

import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    Navbar,
    NavRight,
    Link,
    Page
} from 'framework7-react';
import {setData} from "../../axios/setData";
import {handleDeleteCar} from "../../actions/DataActions";



class carsPage extends React.Component {

    deleteCar = (car_id) => {
        const set_data = new setData();
        if (car_id > 0) {
            set_data.dataDelete('car-delete/'+car_id).then(() => {
               this.props.handleDeleteCar(car_id);
            });
        }
    };

    deleteHandle(car_id) {
        const app = this.$f7;
        app.dialog.confirm('Эта операция необратима', 'Удалить автомобиль?', () => this.deleteCar(car_id), () => {});
    }
    newCar() {
        const carId = 0;
        this.$f7.views.main.router.navigate('/open_car/' + carId + '/');
    }
    editHandle(carId) {
        this.$f7.views.main.router.navigate('/open_car/' + carId + '/');
    }

    render() {
        const {cars, brands, models} = this.props;
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title="Мои автомобили"
                    backLink="Back"
                >
                    <NavRight>
                        <Link iconMd="material:add" onClick={() => this.newCar()}/>
                    </NavRight>
                </Navbar>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        cars.map(car => (
                            <ListItem
                                key={'car_' + car.id}
                                swipeout
                                after={car.year}
                                subtitle={"VIN: " + car.vin}
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material="directions_car" color="blue"/>
                                    {
                                        ' ' + brands.find(brand => brand.id === car.car_brand_id).car_brand
                                        + ' ' + models.find(model => model.id === car.car_model_id).car_model
                                    }
                                </span>
                                <SwipeoutActions left>
                                    <SwipeoutButton close color="blue" onClick={() => this.editHandle(car.id)}>
                                        <Icon material="edit"/> Изменить
                                    </SwipeoutButton>
                                </SwipeoutActions>
                                <SwipeoutActions right>
                                    <SwipeoutButton close color="#cb2128" onClick={() => this.deleteHandle(car.id)}>
                                        <Icon material="delete"/> Удалить
                                    </SwipeoutButton>
                            </SwipeoutActions>
                            </ListItem>
                        ))
                    }

                </List>
            </Page>
        );
    }
}



const mapStateToProps = store => {
    return {
        cars: store.cars,
        models: store.carmodels,
        brands: store.carbrands,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        handleDeleteCar: data => dispatch(handleDeleteCar(data)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(carsPage)