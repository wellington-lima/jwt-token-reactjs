import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../database/api";

const valorInicial = {
  name: '',
  password: ''
}

function Login() {

  const [user, setUser] = useState(valorInicial);

  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();

    try {
      authApi("").post(`/login`, user)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/clientes");

      }).catch((error) => {
        alert("Usuário ou senha incorreto");
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  function updateUser(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser({...user, [name]: value})
  }

  return(
    <>
        <form action="" onSubmit={ handleSubmit }>
          <div id="div-login">
            <input type="text" name="name" id="name" placeholder="user" onChange={(e) => updateUser(e)}/>
          </div>
          <br />
          <div>
            <input type="password" name="password" id="password" placeholder="password" onChange={(e) => updateUser(e)}/>
          </div>
          
          <br />
          <button type="submit">Login</button>
        </form>
    </>
  )
}

export default Login;