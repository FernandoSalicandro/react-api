import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card'

function App() {

  //STATI
  const [listaAttrici, setListaAttrici] = useState([]);
  const [listaAttori, setListaAttori] = useState([]);
  const [listaTotale, setListaTotale] = useState([])
  const [sceltaCorrente, setSceltaCorrente] = useState("Tutti")

  //Url API
  const apiUrlAttrici = "https://lanciweb.github.io/demo/api/actresses/"
  const apiUrlAttori = "https://lanciweb.github.io/demo/api/actors/"

  //Prelevo le 2 liste e ne creo una unica (modifico la chiave per i film più visti e creo una nuova chiave per il select, poi setto la lista unica)
  useEffect(() => {
    Promise.all([
      axios.get(apiUrlAttrici),
      axios.get(apiUrlAttori)
    ]).then(([resAttrici, resAttori]) => {
      const attrici = resAttrici.data.map(attrice => ({
        ...attrice,
        tipo: "Attrice"
      }));
      const attori = resAttori.data.map(attore => ({
        ...attore,
        most_famous_movies: attore.known_for,
        tipo: "Attore"



      }));

      setListaAttrici(attrici);
      setListaAttori(attori);
      setListaTotale([...attori, ...attrici]);
    });
  }, []);

  //creo il filtro in base alla selezione
  const listaFiltrata = listaTotale.filter(actor =>
    sceltaCorrente === "Tutti" || actor.tipo === sceltaCorrente
  );




  return (
    <>
      <h1>Benvenuti In Actors Land</h1>

      <div className="wrapper">

        <select name="" id="" value={sceltaCorrente} onChange={(e) => setSceltaCorrente(e.target.value)}>
          <option value="Tutti">Tutti</option>
          <option value="Attore">Attori</option>
          <option value="Attrice">Attrici</option>
        </select>

      </div>

      <div className="container">

        {listaFiltrata.map(attore => {
          return (
            <Card actor={attore} />
          )
        })}
      </div>
    </>
  )
}

export default App
