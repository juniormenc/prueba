declare var SERVICIOS;

let SERVER_PUERTO = (SERVICIOS.PUERTO == '') ? SERVICIOS.PUERTO : ':'+SERVICIOS.PUERTO;

SERVICIOS.URL="https://h-telemedica-bd.herokuapp.com";
//SERVICIOS.URL="http://localhost:3000";

export const urlServidor = SERVICIOS.URL + SERVER_PUERTO;