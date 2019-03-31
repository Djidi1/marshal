import React from 'react';
import {
    Page,
    List,
    ListInput,
    Button,
    BlockFooter,
    Link,
    LoginScreenTitle
} from 'framework7-react';

import {auth} from '../../axios/login'

class LoginPage extends React.Component {

    authentication() {
        const test = new auth();
        test.login('login', 'password');
    }
    render() {
        return (
            <Page loginScreen>
                <LoginScreenTitle>Войти</LoginScreenTitle>
                <List form>
                    <ListInput
                        label="Email"
                        name="username"
                        placeholder="Email"
                        type="email"
                    />
                    <ListInput
                        label="Password"
                        name="password"
                        placeholder="Password"
                        type="password"
                    />

                    <BlockFooter>
                        <Button fill onClick={()=>this.authentication()}>Войти</Button>
                    </BlockFooter>
                </List>

                <List>
                    <BlockFooter>
                        <p><Link>Зарегистрироваться</Link></p>
                        <p>Для восстановления пароля нажмите <Link>ссылку</Link></p>
                    </BlockFooter>
                </List>
            </Page>
        )
    }
}

export default (LoginPage)