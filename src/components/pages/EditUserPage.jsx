import React, {Component} from 'react';
import {
    Page,
    Navbar,
    List,
    ListInput,
    Block,
    BlockTitle,
    Button,
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";
import {handleLogin} from "../../actions/UserActions";

import {setData} from "../../axios/setData";

class EditUserPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            password: '',
        }
    }

    handleData = (name, value) => {
        this.setState({[name]: value});
    };

    updateUser = async () => {
        if (this.state.name === '') {
            this.$f7.toast.create({ text: 'Введите ваше имя',closeTimeout: 2000 }).open();
            return;
        }
        if (this.state.email === '') {
            this.$f7.toast.create({ text: 'Введите почтовый адрес',closeTimeout: 2000 }).open();
            return;
        }
        if (this.props.user.initial === 1 && this.state.password === '') {
            this.$f7.toast.create({ text: 'Введите пароль', closeTimeout: 2000 }).open();
            return;
        }

        this.$f7.dialog.preloader('Пожалуйста подождите...');
        const set_data = new setData();
        const user = this.props.user;
        user.name = this.state.name;
        user.email = this.state.email;
        const new_data = {email: user.email, name: user.name};
        if (this.state.password !== '') {
            new_data.password = this.state.password;
        }
        if (this.props.user.initial === 1) {
            new_data.initial = 0;
            user.initial = 0;
        }
        await set_data.dataPut(`user-update/${user.id}`, new_data).then(() => {
            this.props.handleLogin(user);
            this.$f7.views.main.router.navigate('/');
            this.$f7.dialog.close();
        });
    };

    async componentDidMount() {
        const {email, name, initial} = this.props.user;
        if (initial !== 1) {
            this.$f7.dialog.preloader('Пожалуйста подождите...');
            this.setState({email: email, name: name});
            this.$f7.dialog.close();
        }
    }

    render() {
        const {email, name, password} = this.state;
        const {initial} = this.props.user;

        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={initial === 1 ? "Регистрация" : "Редактировать пользователя"}
                    backLink="Back"
                >
                </Navbar>
                <BlockTitle
                    style={{whiteSpace: 'initial'}}
                >{initial === 1
                    ? "После регистрации станут доступны дополнительные возможности."
                    : "Здесь вы можете отредактировать параметры своего профиля."}</BlockTitle>
                <List>
                    <ListInput
                        label="Имя пользователя"
                        floatingLabel
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(event) => this.handleData('name', event.target.value)}
                    />
                    <ListInput
                        label="Почта / Логин"
                        floatingLabel
                        type="email"
                        placeholder="Ваша почта"
                        value={email}
                        onChange={(event) => this.handleData('email', event.target.value)}
                    />
                    <ListInput
                        label="Пароль"
                        floatingLabel
                        type="text"
                        placeholder={initial === 1 ? "Введите пароль" : "Введите новый, если хотите сменить"}
                        value={password}
                        onChange={(event) => this.handleData('password', event.target.value)}
                    />
                </List>
                <Block>
                    <Button
                        fill
                        onClick={() => this.updateUser()}
                    >{initial === 1 ? "Зарегистрироваться" : "Изменить"}</Button>
                </Block>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        user: store.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: user => dispatch(handleLogin(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage)