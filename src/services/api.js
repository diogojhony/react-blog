import axions from 'axios';

const api = axions.create({ baseURL: 'https://jsonplaceholder.typicode.com' });

export default api;