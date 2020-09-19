import React, {Component} from 'react';
import {
  Page,
  Navbar,
  List,
  ListInput,
  Block,
  Card,
  Button,
  ListItem,
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";
import {setData} from "../../axios/setData";
import {handleAddCar, handleUpdateCar} from "../../actions/DataActions";

const date = new Date();

class NewCarPage extends Component {
  constructor() {
    super();
    this.state = {
      car_brand_id: 1,
      car_model_id: 1,
      car_id: 0,
      vin: '',
      years: [],
      year: date.getFullYear(),
    }
  }

  handleBrand = (brand_id) => {
    // find and set first available model
    const models = this.props.models.filter(x => x.car_brand_id === Number(brand_id));
    this.setState({ car_brand_id: Number(brand_id) }, () => {
      this.modelSelectComponent.f7SmartSelect.setValue(models[0].id);
      this.handleModel(models[0].id);
    });
  };
  handleModel = (model_id) => {
    this.setState({ car_model_id: Number(model_id) });
  };
  handleYear = (year) => {
    this.setState({ year: Number(year) });
  };

  handleData = (name, value) => {
    this.setState({[name]: value});
  };

  sendCar = (car_id) => {
    // prepare payload
    let req_data = {...this.state};
    delete req_data.years;
    delete req_data.car_id;
    req_data["user_id"] = this.props.user.id;

    const set_data = new setData();

    if (car_id > 0) {
      set_data.dataPut('car-update/'+car_id, req_data).then(() => {
        req_data["id"] = car_id;
        this.props.handleUpdateCar(req_data);
        this.updCarSuccess.open();
      });
    }else {
      set_data.data('car-add', req_data).then(data => {
        this.props.handleAddCar(data.result);
        this.addCarSuccess.open();
      });
    }

    this.$f7.views.main.router.navigate('/cars/');
  };


  addCarSuccess = this.$f7.notification.create({
    icon: '<i class="icon marshal-icon"> </i>',
    title: 'Маршал Сервис',
    subtitle: 'Автомобиль добавлен',
    text: 'Теперь вы можете использовать его в запросах.',
    closeTimeout: 3000,
  });

  updCarSuccess = this.$f7.notification.create({
    icon: '<i class="icon marshal-icon"> </i>',
    title: 'Маршал Сервис',
    subtitle: 'Автомобиль отредактирован',
    text: 'Теперь вы можете использовать новые данные.',
    closeTimeout: 3000,
  });

  componentDidMount() {
    let years = [];
    for (let i = date.getFullYear(); i > 1900; i--) {
      years.push(i)
    }
    let year = years[0];

    const initData = {years: years};
    const car_id = Number(this.$f7route.params.carId);

    if (car_id > 0) {
      const car = this.props.cars.find(car => car.id === car_id);
      // Set data to local state
      initData.car_id = car.id;
      initData.car_brand_id = car.car_brand_id;
      initData.car_model_id = car.car_model_id;
      initData.vin = car.vin;
      initData.year = car.year;

      this.setState(initData, () => {
        // Set data to fields
        this.brandSelectComponent.f7SmartSelect.setValue(car.car_brand_id);
        this.modelSelectComponent.f7SmartSelect.setValue(car.car_model_id);
        this.yearSelectComponent.f7SmartSelect.setValue(car.year);
      });

    } else{
      this.setState(initData, () => {
        this.yearSelectComponent.f7SmartSelect.setValue(year);
      });
    }
  }

  render() {
    const {brands, models} = this.props;
    const {car_id, car_brand_id, years, vin} = this.state;
    const self = this;

    return (
      <Page>
        <Navbar
          color="white"
          textColor="white"
          bgColor="main"
          title={car_id > 0 ? "Редактировать машину" : "Добавление машины"}
          backLink="Back"
        >
        </Navbar>
        <Card
          content="Здесь вы можете добавить ваш автомобиль(и) для более быстрого подбора услуг"
        />
        <List>
          <ListItem
            title="Марка автомобиля"
            smartSelect
            ref={(el) => {this.brandSelectComponent = el}}
            smartSelectParams={{
              openIn: 'popup',
              searchbar: true,
              searchbarPlaceholder: 'Найти марку',
              closeOnSelect: true,
              on: {
                closed: function () {
                  self.handleBrand(this.getValue())
                }
              }
            }}
          >
            <select>
              {brands.map(brand => (
                <option
                  key={'brand_' + brand.id}
                  value={brand.id}
                >{brand.car_brand}</option>
              ))}
            </select>
          </ListItem>
          <ListItem
            title="Модель"
            smartSelect
            ref={(el) => {this.modelSelectComponent = el}}
            smartSelectParams={{
              openIn: 'popup',
              searchbar: true,
              searchbarPlaceholder: 'Найти модель',
              closeOnSelect: true,
              on: {
                closed: function () {
                  self.handleModel(this.getValue())
                }
              }
            }}
          >
            <select>
              {models.filter(x => x.car_brand_id === car_brand_id).map(model => (
                <option
                  key={'model_' + model.id}
                  value={model.id}
                >{model.car_model}</option>
              ))}
            </select>
          </ListItem>
          <ListItem
            title="Год выпуска"
            ref={(el) => {this.yearSelectComponent = el}}
            smartSelect
            smartSelectParams={{
              openIn: 'sheet',
              closeOnSelect: true,
              on: {
                closed: function () {
                  self.handleYear(this.getValue())
                }
              }
            }}
          >
            <select>
              {years.map(year => (<option key={'year_' + year} value={year}>{year}</option>))}
            </select>
          </ListItem>
          <ListInput
            label="VIN"
            floatingLabel
            type="text"
            placeholder="Введите VIN номер автомобиля"
            value={vin}
            onChange={(event) => this.handleData('vin', event.target.value)}
          />
        </List>
        <Block>
          <Button
            fill
            onClick={() => this.sendCar(car_id)}
          >{car_id > 0 ? 'Изменить' : 'Добавить'}</Button>
        </Block>
      </Page>
    );
  }
}


const mapStateToProps = store => {
  return {
    user: store.user,
    cars: store.cars,
    brands: store.carbrands,
    models: store.carmodels,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleAddCar: data => dispatch(handleAddCar(data)),
    handleUpdateCar: data => dispatch(handleUpdateCar(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCarPage)