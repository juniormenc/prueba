declare var SERVICIOS;

let SERVER_PUERTO = (SERVICIOS.PUERTO == '') ? SERVICIOS.PUERTO : ':'+SERVICIOS.PUERTO;

//SERVICIOS.URL="https://h-telemedica-bd.herokuapp.com";
SERVICIOS.URL="http://localhost:3000";
SERVICIOS.URL_1="https://ws-cie-1.herokuapp.com";
SERVICIOS.URL_2="https://ws-cie-2.herokuapp.com";
SERVICIOS.URL_3="https://ws-nac-ubi.herokuapp.com";

export const urlServidor = SERVICIOS.URL + SERVER_PUERTO;
export const urlServidor_1 = SERVICIOS.URL_1 + SERVER_PUERTO;
export const urlServidor_2 = SERVICIOS.URL_2 + SERVER_PUERTO;
export const urlServidor_3 = SERVICIOS.URL_3 + SERVER_PUERTO;