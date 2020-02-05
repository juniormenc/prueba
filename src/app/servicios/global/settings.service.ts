import { Injectable, EventEmitter } from '@angular/core';
declare var $:any;

@Injectable()
export class SettingsService {
  public sidebarImageIndex = 0;
  public sidebarImageIndexUpdate: EventEmitter<number> = new EventEmitter();
  public sidebarFilter = '#fff';
  public sidebarFilterUpdate: EventEmitter<string> = new EventEmitter();
  public sidebarColor = '#D80B0B';
  public sidebarColorUpdate: EventEmitter<string> = new EventEmitter();
  public ruta_user_not_found = "iniciar-sesion";
  public mensaje: any = {
    cita_finalizada:"¡Cita finalizada correctamente!",
    campos_vacios: "¡Al parecer hay campos obligatorios vacíos!",
    campo_doc_identidad: "Revise la cantidad de dígitos del Documento de Identidad",
    registrar_web:"¡Se ha registrado correctamente!",
    registrar:"¡Ha sido registrado correctamente!",
    modificar:"¡Ha sido modificado correctamente!",
    eliminar:"¡Ha sido eliminado correctamente!",
    cancelar:"¡Ha sido cancelado correctamente!",
    reservar:"¡Ha sido reservado correctamente!",
    enlazar: "Reserva enlazada correctamente",
    aprobar:"¡Ha sido aprobado correctamente!",
    debaja:"¡Ha sido dado de baja correctamente!",
    dealta:"¡Ha sido dado de alta correctamente!",
    usuario_correcto:"¡Bienvenido al sistema!",
    usuario_error:"¡Usuario y/o clave inconrrecta!",
    duplicidad:"¡Al parecer ya se encuentra registrado!",
    acceso_restringido: "¡Alto, usted no tiene acceso a esta parte del sistema!",
    varios_registros:"¡Al parecer no puede ingresar más registros!",
    atender:"¡La acción ha sido atendida satisfactoriamente!",
    no_eliminar:"¡No se puede eliminar este elemento!",
  }
  public nombre_dias: any[] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado","Domingo"];

  constructor() { }

  getSidebarImageIndex(): number {
    return this.sidebarImageIndex;
  }
  setSidebarImageIndex(id) {
    this.sidebarImageIndex = id;
    this.sidebarImageIndexUpdate.emit(this.sidebarImageIndex);
  }
  getSidebarFilter(): string {
    return this.sidebarFilter;
  }
  setSidebarFilter(color: string) {
    this.sidebarFilter = color;
    this.sidebarFilterUpdate.emit(this.sidebarFilter);
  }
  getSidebarColor(): string {
    return this.sidebarColor;
  }
  setSidebarColor(color: string) {
    this.sidebarColor = color;
    this.sidebarColorUpdate.emit(this.sidebarColor);
  }

  showNotification(from, align, m, color){
    const type = ['','info','success','warning','danger'];
    const ico = ['','add_alert','check','warning','error_outline'];
    $.notify({
        icon: ico[color],
        //message: '<i class="material-icons alert-icon" data-notify="icon">'+ico[color]+'</i> '+ '<span class="span-icon">'+m+'</span>',
        message: '<span class="span-icon">'+m+'</span>',
    },{
        type: type[color],
        timer: 300,
        placement: {
            from: from,
            align: align
        }
    });
  }

   public listarDias(): any[] {
      return [
          { value: 1, label: 'Lunes' },
          { value: 2, label: 'Martes' },
          { value: 3, label: 'Miercoles' },
          { value: 4, label: 'Jueves' },
          { value: 5, label: 'Viernes' },
          { value: 6, label: 'Sabado' },
          { value: 7, label: 'Domingo' },
      ];
  }

  public listarMeses(): any[] {
    return [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' },
    ];
  }

  public listarAnio(): any[] {
    var fecha = new Date();
    var anio = fecha.getFullYear()+1;
    var retorno = [];
    for(var i=anio; i>=2017; i--){
      retorno.push({ value: i, label: i });
    }
    return retorno;
  }

  public nombreMes(m: number): string{
    var mes = "";
    switch(m){
      case 1: 
        mes = "Enero";
        break;
      case 2:
        mes = "Febrero";
        break;
      case 3:
        mes = "Marzo";
        break;
      case 4:
        mes = "Abril";
        break;
      case 5: 
        mes = "Mayo";
        break;
      case 6:
        mes = "Junio";
        break;
      case 7:
        mes = "Julio";
        break;
      case 8:
        mes = "Agosto";
        break;
      case 9: 
        mes = "Septiembre";
        break;
      case 10:
        mes = "Octubre";
        break;
      case 11:
        mes = "Noviembre";
        break;
      case 12:
        mes = "Diciembre";
        break;
    }
    return mes;
  }

  public nombreDia(d: number): string{
    var dia = "";
    switch(d){
      case 1:
        dia = "Lunes";
        break;
      case 2:
        dia = "Martes";
        break;
      case 3:
        dia = "Miercoles";
        break;
      case 4:
        dia = "Jueves";
        break;
      case 5:
        dia = "Viernes";
        break;
      case 6:
        dia = "Sabado";
        break;
      case 7:
        dia = "Domingo";
        break;
    }
    return dia;
  }

  public cantidadDiasPorMes(mes: number, anio: number) {
    return new Date(anio || new Date().getFullYear(), mes, 0).getDate();
  }

  public nombreDiaPorFecha(dia: number, mes: number, anio: number) {
    var x = anio+'-'+this.pad(mes,2)+'-'+this.pad(dia,2);
    var date  = new Date(x);
    var retorno = this.nombre_dias[date.getDay()];
    return retorno;
  }

  public pad(n, length) {
    var  n = n.toString();
    while(n.length < length)
        n = "0" + n;
    return n;
  }

  public tareoProyectado(dias: any[], mes: number, anio: number){
      var cantidad: number = this.cantidadDiasPorMes(mes, anio);
      var retorno: any[] = [];
      var estado: number = 0;
      var mes_x: string = '', mes_y: string = '';

      for(var i=0; i<cantidad; i++){
          estado = 0;
          mes_x = this.nombreDiaPorFecha((i+1), mes, anio);
          
          for(var y=0; y<dias.length; y++){
              mes_y = this.nombre_dias[dias[y]-1];
              
              if(mes_x == mes_y){
                  estado = 1;
              }
          }
          retorno.push({dia: (i+1), estado: estado});
      }
      return retorno;
  }
}
