import { guardarEjemplo, obtenerEjemplos } from '../repository/ejemplo.repository';
import { EjemploDTO } from '../interfaces/ejemplo.dto';
import { Ejemplo } from '../models/ejemplo.model';

let idActual = 1;

export const crearEjemplo = (data: EjemploDTO): Ejemplo => {
  const nuevo: Ejemplo = {
    id: idActual++,
    ...data,
    creadoEn: new Date().toISOString(),
  };

  guardarEjemplo(nuevo);
  return nuevo;
};

export const listarEjemplos = (): Ejemplo[] => {
  return obtenerEjemplos();
};
