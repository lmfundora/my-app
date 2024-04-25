export interface AxiosErrorInterface {
  config: any; // Puedes reemplazar 'any' con una interfaz más específica si lo deseas
  code?: string; // Opcional, dependiendo de tu implementación
  request?: any; // Puedes reemplazar 'any' con una interfaz más específica si lo deseas
  response?: {
    data: any; // Puedes reemplazar 'any' con una interfaz más específica si lo deseas
    status: number;
    statusText: string;
    headers: any; // Puedes reemplazar 'any' con una interfaz más específica si lo deseas
    config: any; // Puedes reemplazar 'any' con una interfaz más específica si lo deseas
  };
}

interface AxiosConfig {
 timeout: number;
 xsrfCookieName: string;
 xsrfHeaderName: string;
 // Añade aquí cualquier otra propiedad específica de la configuración que necesites
}

// Definición de la interfaz para los headers de la respuesta
interface AxiosResponseHeaders {
 "content-length": string;
 "content-type": string;
 // Añade aquí cualquier otro header que pueda estar presente
}

// Definición de la interfaz para el objeto de respuesta de Axios
interface AxiosResponse {
 data: string; // Puedes ajustar este tipo según la estructura de tus datos
 status: number;
 statusText: string;
 headers: AxiosResponseHeaders;
 config: AxiosConfig;
 request: XMLHttpRequest; // Asumiendo que estás trabajando en un entorno que soporta XMLHttpRequest
}

// Definición de la interfaz para el error de Axios
// interface AxiosError extends Error {
//  config: AxiosConfig;
//  response?: AxiosResponse; // La respuesta es opcional porque puede no estar presente en todos los errores
// }
