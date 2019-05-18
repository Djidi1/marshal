import { set } from 'idb-keyval';
import { axios } from './init'


export class getData {
    data = async (type) => {
        const url = '/' + type;
        const payload = {};
        try {
            let res =  await axios.get(url, payload);
            if (res.status === 200) {
                set(type, res.data).then();
                return res.data;
            }
            return undefined;
        } catch (error) {
            if (error.response.status === 401) {
                return 401
            }
            return undefined;
        }
    };
}