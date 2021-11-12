


// import io from 'socket.io-client';

// const LOCALHOST = 'http://10.8.204.192:8080';
const LOCALHOST = 'http://192.168.100.148:8080';

const apiVersion = 'v1';

let isProduction = false;

const prod = "" + '/api/';

const dev = LOCALHOST + '/api/';

const http = isProduction ? prod : dev;

const SOCKET_SERVER = isProduction ? prod : LOCALHOST;

// export const socket = io(SOCKET_SERVER);

export const baseURL = http + apiVersion;
