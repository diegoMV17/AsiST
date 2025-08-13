import Constants from 'expo-constants';

const API_BASE = Constants.expoConfig?.extra?.PUBLIC_URL_API;

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
  try {
    const response = await fetch(`${API_BASE}/api/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        driverId,
        vehicleId,
        origen,
        destino,
        fecha,
        hora,
        cupos_disponibles,
        descripcion,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear viaje');
    }

    const newTrip = await response.json();
    return newTrip;
  } catch (error) {
    console.error('Error al crear el viaje:', error);
    throw error;
  }
}
export async function getTripsByDriverId(driverId: string) {
  try {
    const response = await fetch(`${API_BASE}/api/trips/driver/${driverId}`);
    if (!response.ok) {
      throw new Error('Error al obtener viajes del conductor');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener viajes por conductor:', error);
    throw error;
  }
}

export async function getAvailableTrips() {
  try {
    const response = await fetch(`${API_BASE}/api/trips/status/available`)
    if (!response.ok){
      throw new Error('Error al obtener viajes disponibles');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener viajes por disponibilidad:', error);
    throw error;
  }
  
}