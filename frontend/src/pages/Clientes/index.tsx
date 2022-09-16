import { useState } from "react";
import { authApi } from "../../database/api";
 
interface ICliente {
  id: number;
  nome: string;
}

function Clientes() {
  const [clientes, setClientes] = useState([]);

  const token = localStorage.getItem("token");

  async function listarClientes() {
    
    await authApi(token).get(`/clientes`)
                      .then((response) => {
                        setClientes(response.data);
                      }).catch((error) => {
                        alert(`Erro = ${error}`);
                      });

  }

  return(
    <>

      <h1>CLientes</h1>
      
      <button onClick={() => listarClientes() }>Listar Clientes</button>

      <br />
      <div id="div-clientes">
        <ul>
          {clientes.map((cliente: ICliente) => {
            return(
              <li key={cliente.id}>{cliente.nome}</li>
            );
          })}
        </ul>
      </div>
    </>
  )
}

export default Clientes;