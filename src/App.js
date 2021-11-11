import { userEffect, useState} from "react";
import { GlobalStyles } from "./GlobalStyles";
import { api } from "./services/api";
import { signIn }from "./services/security";

function App(){
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //efutar o login do usuario de forma fixa no codigo
  userEffect (()=> {
    const doLogin = async () => {
      try{
      let response = await api.pos("/sessions",{
  email: "rafanleme@gmail.com",
  password: "123456",
});

signIn(response.data);
  }catch (error){
  setError(true);
  alert(error.response.data.error);
  }finally{
  //setLoading(false);
  }
}

doLogin ();
}, []);
  return (
    <>
    <GlobalStyles />
    {
      loading  ? "Carregando ..." :
      error ? "Ops, algo deu errado" :
      <Router />
    }
  </>
  );
}

export default App;