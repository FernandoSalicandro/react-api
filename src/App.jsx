import { useState, useEffect } from 'react';
import axios from 'axios';

// Lista di Attrici:   [https://lanciweb.github.io/demo/api/actresses/](https://lanciweb.github.io/demo/api/actresses/)
// Lista di Attori:  [https://lanciweb.github.io/demo/api/actors/](https://lanciweb.github.io/demo/api/actors/)


function App() {
  const [listaAttrici, setListaAttrici] = useState([]);
  const [listaAttori, setListaAttori] = useState([]);
  const [listaTotale, setListaTotale] = useState([])
  const apiUrlAttrici = "https://lanciweb.github.io/demo/api/actresses/"
  const apiUrlAttori = "https://lanciweb.github.io/demo/api/actors/"


  useEffect(() => {
    Promise.all([
      axios.get(apiUrlAttrici),
      axios.get(apiUrlAttori)
    ]).then(([resAttrici, resAttori]) => {
      const attrici = resAttrici.data;
      const attori = resAttori.data.map(attore => ({
        ...attore,
        most_famous_movies: attore.known_for,
        awards: typeof attore.awards === 'string' ? [attore.awards] : attore.awards


      }));

      setListaAttrici(attrici);
      setListaAttori(attori);
      setListaTotale([...attori, ...attrici]);
    });
  }, []);

  return (
    <>
      <h1>Benvenuti A MovieLandia</h1>
      <div className="container">

        {listaTotale.map(attore => {
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
