const citas = [
  {
    id: '1',
    paciente: 'Juan Pérez',
    doctor: 'Dra. García',
    fecha: '2023-05-15',
    hora: '10:00',
    motivo: 'Consulta general',
    estado: 'Confirmada'
  },
  {
    id: '2',
    paciente: 'María López',
    doctor: 'Dr. Martínez',
    fecha: '2023-05-16',
    hora: '15:30',
    motivo: 'Control anual',
    estado: 'Pendiente'
  },
  {
    id: '3',
    paciente: 'Carlos Sánchez',
    doctor: 'Dra. Rodríguez',
    fecha: '2023-05-17',
    hora: '09:15',
    motivo: 'Dolor de espalda',
    estado: 'Cancelada'
  }
];

// Simula una API call
export const getCitas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(citas);
    }, 500);
  });
};

export const getCitaById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cita = citas.find(c => c.id === id);
      if (cita) {
        resolve(cita);
      } else {
        reject(new Error('Cita no encontrada'));
      }
    }, 300);
  });
};

export default citas;