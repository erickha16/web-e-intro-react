import { useMemo, useState } from 'react';

export function ExpensiveCalculationComponent() {

  const [input, setInput] = useState(0);

  // Función costosa

  const expensiveCalculation = (num) => {

    console.log('Calculando...');

    let result = 0;

    for (let i = 0; i < 1000000000; i++) {
      result += num * i;
    }

    return result;

  };

  // Usamos useMemo para memorizar el resultado de la función costosa

  const memoizedResult = useMemo( () => expensiveCalculation(input) , [input]);

  return (

    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(parseInt(e.target.value))}
      />

      <p>Resultado memorizado: {memoizedResult}</p>

    </div>

  );

}