import axios from 'axios';
let basecyi = 'http://localhost:5002/librasapi';
//let basecyi = 'http://200.17.205.31:5002/librasapi';
const cyiapi = axios.create({
  baseURL: basecyi
});

export default cyiapi;
export { basecyi };
