import apiService from './../services/apiService';

export async function createTrip(
  driverId: string,
  vehicleId: string,
  origen: string,
  destino: string,
  fecha: string,
  hora: string,
  cupos_disponibles: number,
  descripcion: string
) {
  return apiService.create('trips', { driverId, vehicleId, origen, destino, fecha, hora, cupos_disponibles, descripcion });
}

export async function getTripsByDriverId(driverId: string) {
  return apiService.get(`trips/driver/${driverId}`);
}

export async function getAvailableTrips() {
  return apiService.get('trips/status/available');
}