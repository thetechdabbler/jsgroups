import Axios from "axios";
import * as ApiConstants from './apiUrlConstants';

let headers = {};

if( localStorage.getItem('token') ) {
    headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export const AxiosInstance = Axios.create({
    baseURL: ApiConstants.BASE_URL,
    headers
});
