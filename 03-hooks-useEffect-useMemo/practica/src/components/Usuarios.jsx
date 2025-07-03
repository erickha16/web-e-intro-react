import { useEffect, useState } from "react"


export const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsuarios(data))
    }, [])

    //console.log(usuarios)
    
    return (
        <div>
          <h2>Usuarios2</h2>
          <ul>
            {
              usuarios.map( (item, index) => {
                  return (
                    <li key={index}>{item.name}</li>
                  )
              })
            }
          </ul>
        </div>
    )
}