import apiService from './../services/apiService';

export async function createVehicle(
  placa: string,
  marca: string,
  numeroSerie: string,
  soat: string,
  modelo: string,
  tipo: 'carro' | 'SUV' | 'camioneta' | 'sedan',
  color: string,
  capacidad: number,
) {
  return apiService.create('vehicles', { placa, marca, numeroSerie, soat, modelo, tipo, color, capacidad });
}

export async function updateVehicle(id: string, vehicleData: any) {
  return apiService.update('vehicles', id, vehicleData);
}

export async function getVehicleById(id: string) {
  return apiService.get(`vehicles/${id}`);
}

export async function deleteVehicle(id: string) {
  await apiService.remove('vehicles', id);
  return true;
}