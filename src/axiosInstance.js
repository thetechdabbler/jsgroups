import Axios from "axios";
import * as ApiContants from './apiUrlConstants';

let headers = {};

if( localStorage.getItem('token') ) {
    headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export const AxiosInstance = Axios.create({
    baseURL: ApiContants.BASE_URL,
    headers
});
