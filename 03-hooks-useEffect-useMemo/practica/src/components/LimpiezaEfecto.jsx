import { useEffect } from "react"


export const LimpiezaEfecto = () => {

    useEffect(() => {

        console.log("Suscribiendo evento");

        return () => {
            console.log("Limpiando evento");
        };

    }, []);

    return (
        <div>LimpiezaEfecto</div>
    )
}