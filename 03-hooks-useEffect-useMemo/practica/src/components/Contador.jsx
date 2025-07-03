import React, { useState, useEffect } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador(prevContador => prevContador + 1);
    }, 1000); // cada 1 segundo

    // Función de limpieza: se ejecuta al desmontar o antes de volver a ejecutar el efecto
    return () => {
      clearInterval(intervalo);
      console.log('Intervalo limpiado');
    };
  }, []); // Dependencias vacías → solo se ejecuta al montar y desmontar

  return (
    <div>
      <h1>Contador: {contador}</h1>
    </div>
  );
}

export default Contador;