import Constants from 'expo-constants';

const API_BASE = Constants.expoConfig?.extra?.PUBLIC_URL_API;

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
    try {
        const response = await fetch(`${API_BASE}/api/vehicles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                placa,
                marca,
                numeroSerie,
                soat,
                modelo,
                tipo,
                color,
                capacidad,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json(); // solo una vez
            throw new Error(errorData.message || 'Error al crear vehículo');
        }

        const newVehicle = await response.json(); // solo una vez aquí
        return newVehicle;

    } catch (error) {
        console.error('Error al crear el vehículo:', error);
        throw error;
    }
}

export async function updateVehicle(id: string, vehicleData: any) {
    try {
        const response = await fetch(`${API_BASE}/api/vehicles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicleData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar vehículo');
        }

        const updatedVehicle = await response.json();
        return updatedVehicle;

    } catch (error) {
        console.error('Error al actualizar el vehículo:', error);
        throw error;
    }
}
export async function getVehicleById(id: string) {
    try {
        const response = await fetch(`${API_BASE}/api/vehicles/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener vehículo');
        }

        const vehicle = await response.json();
        return vehicle;

    } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        throw error;
    }
}

export async function deleteVehicle(id: string) {
    try {
        const response = await fetch(`${API_BASE}/api/vehicles/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar vehículo');
        }

        return true; // Indica que la eliminación fue exitosa

    } catch (error) {
        console.error('Error al eliminar el vehículo:', error);
        throw error;
    }
    
}