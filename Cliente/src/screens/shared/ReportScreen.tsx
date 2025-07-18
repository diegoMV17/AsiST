import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/styles';
import { getReportes } from '../../api/UserApi';

export default function ReportesScreen() {
  const [reportes, setReportes] = useState<{
    usuarios: number;
    viajes: number;
    calificacionPromedio: number;
  }>({ usuarios: 0, viajes: 0, calificacionPromedio: 0 });

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await getReportes();
        setReportes(data);
      } catch {
        console.log('Error al obtener reportes');
      }
    };
    fetchReportes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes</Text>
      <View >
        <Text>Total de usuarios: {reportes.usuarios}</Text>
        <Text>Viajes realizados: {reportes.viajes}</Text>
        <Text>Calificación promedio: {reportes.calificacionPromedio.toFixed(2)}</Text>
      </View>
    </View>
  );
}
