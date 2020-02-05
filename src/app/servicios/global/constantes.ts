declare var SERVICIOS;
declare var TIMER_SECONDS: any;

let SERVER_PUERTO = (SERVICIOS.PUERTO == '') ? SERVICIOS.PUERTO : ':'+SERVICIOS.PUERTO;

SERVICIOS.URL="http://localhost:3001";
// SERVICIOS.URL="http://192.168.1.5:3001";

export const urlServidor = SERVICIOS.URL + SERVER_PUERTO;

export const timerSeconds = TIMER_SECONDS;