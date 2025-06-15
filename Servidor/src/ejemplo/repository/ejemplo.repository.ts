import { Ejemplo } from '../models/ejemplo.model';

let ejemplos: Ejemplo[] = [];

export const guardarEjemplo = (ejemplo: Ejemplo) => {
  ejemplos.push(ejemplo);
};

export const obtenerEjemplos = (): Ejemplo[] => {
  return ejemplos;
};
