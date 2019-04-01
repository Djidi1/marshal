import { set, get } from 'idb-keyval';
import { axios } from './init'


export class authorisation {

    login = async (...args) => {
        const url = '/login';
        const payload = {
            email: args[0],
            password: args[1],
            application: 'marshal'
        };
        let res = 'test';
        await get('AUTH_TOKEN').then( async value => {
            if (value === undefined) {
                try {
                    let response = await axios.post(url, payload);
                    let AUTH_TOKEN = response.data.access_token;
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
                    set('AUTH_TOKEN', AUTH_TOKEN).then();
                    res = await this.user_details();

                } catch (error) {
                    res = error.response;
                }
            }else{
                res = await this.user_details();
                console.log(res);
            }
        });
        return res;
    };

    user_details = async () => {
        const url = '/details';
        const payload = {};
        try {
            return await axios.get(url, payload);
        } catch (error) {
            return error.response;
        }
    }
}