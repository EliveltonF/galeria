import './App.scss';
import api from './api/api';
import React, { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState();
  const [foto, setFoto] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [quad, setquad] = useState();
  const [totalLista, settotalLista] = useState(10);
  var dado = [];
  var dado2 = [];
  var contador;

  useEffect(() => {
    api
      .get(`?page=${pagina}&per_page=40`, { headers: { "Authorization": "563492ad6f91700001000001128b9b57a60a488083869badc019fcb7" } })
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [pagina]);


  useEffect(() => {
    if (user != null) {
      contador = user.total_results / 40;
      for (let i = 0; i < 40; i++) {
        dado.push([<img src={user.photos[i].src.medium} alt="imagem"></img>])
      }
      setFoto(dado)

    }
  }, [user])

  useEffect(() => {
    for (let i = totalLista - 9; i <= totalLista; i++) {
      console.log(i)
      dado2.push(<button onClick={() => { setPagina(i) }} className="num">{[i]}</button>)
    }
    setquad(dado2)
  }, [totalLista])


  return (
    <div className="App">
      <header>
      </header>
      <div className="botoes">
        <button onClick={() => {
          if (totalLista > 10) {
            settotalLista(totalLista - 10)
          }
        }} className="voltar">voltar</button>
        {quad}
        <button onClick={() => {
          console.log(totalLista)
          console.log(contador)
          console.log(totalLista <= contador)
          if (totalLista <  user.total_results / 40) {
            settotalLista(totalLista + 10)
          }
        }} className="avancar">Avançar</button>
      </div>
      <div className="ajuste">{foto}</div>

      <footer>
        fim?
      </footer>
    </div>
  );
}


export default App;
