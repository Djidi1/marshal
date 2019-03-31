const axios = require('axios');


export class auth {

    login = (...args) => {
        // const {login, password} = args;
        console.log(args);
        axios.post('https://marshal.bh-app.ru/api/login', {
            email: 'test@test.ru',
            password: '12345',
            application: 'marshal'
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}