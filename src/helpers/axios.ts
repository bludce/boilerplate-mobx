import axios, { AxiosResponse } from 'axios';

const instance = axios.create();

instance.defaults.withCredentials = true;

export { AxiosResponse };
export default instance;
