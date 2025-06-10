import { useState, useEffect } from 'react';
import axios from 'axios';

// Lista di Attrici:   [https://lanciweb.github.io/demo/api/actresses/](https://lanciweb.github.io/demo/api/actresses/)
// Lista di Attori:  [https://lanciweb.github.io/demo/api/actors/](https://lanciweb.github.io/demo/api/actors/)


function App() {
  const [listaAttrici, setListaAttrici] = useState([]);
  const [listaAttori, setListaAttori] = useState([]);
  const [listaTotale, setListaTotale] = useState([])
  const [sceltaCorrente, setSceltaCorrente] = useState("Tutti")


  const apiUrlAttrici = "https://lanciweb.github.io/demo/api/actresses/"
  const apiUrlAttori = "https://lanciweb.github.io/demo/api/actors/"


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
          console.log(attore)
          return (

            <div key={attore.name} className="card">
              <div className="tCol">
                <h3>{attore.name}</h3>
                <h4>{attore.birth_year}</h4>
                <p><strong>Nazionalità:</strong> {attore.nationality}</p>
                <p><strong>Biografia:</strong> {attore.biography}</p>
              </div>
              <img src={attore.image} alt={attore.name} />
              <p><strong>Riconoscimenti:</strong> {attore.awards}</p>
            </div>

          )
        })}
      </div>
    </>
  )
}

export default App
