declare var SERVICIOS;

let SERVER_PUERTO = (SERVICIOS.PUERTO == '') ? SERVICIOS.PUERTO : ':'+SERVICIOS.PUERTO;

//SERVICIOS.URL="https://healthinn-service.herokuapp.com/api/v1";
//SERVICIOS.URL="https://bd2018.herokuapp.com";
SERVICIOS.URL="http://localhost:3000";

export const urlServidor = SERVICIOS.URL + SERVER_PUERTO;