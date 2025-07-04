export interface CreateVehicleDto {
  placa: string;
  marca: string;
  numeroSerie: string;
  soat: string;
  modelo: string;
  tipo: 'carro' | 'SUV' | 'camioneta' | 'sedan';
  color: string;
  capacidad: number;
}
export interface updatedVehicleDto {
  placa?: string;
  marca?: string;
  numeroSerie?: string;
  soat?: string;
  modelo?: string;
  tipo?: 'carro' | 'SUV' | 'camioneta' | 'sedan';
  color?: string;
  capacidad?: number;
}