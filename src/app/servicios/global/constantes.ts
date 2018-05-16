declare var SERVICIOS;

let SERVER_PUERTO = (SERVICIOS.PUERTO == '') ? SERVICIOS.PUERTO : ':'+SERVICIOS.PUERTO;

//SERVICIOS.URL="https://healthinn-service.herokuapp.com/api/v1";
SERVICIOS.URL="http://localhost:3000";
//SERVICIOS.URL="http://192.168.1.3:3000";

export const urlServidor = SERVICIOS.URL + SERVER_PUERTO;