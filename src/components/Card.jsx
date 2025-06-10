function Card ({actor}){

    const {name,birth_year,nationality,biography,image,awards} = actor
    return (
        <>
        <div key={name} className="card">
              <div className="tCol">
                <h3>{name}</h3>
                <h4>{birth_year}</h4>
                <p><strong>Nazionalità:</strong> {nationality}</p>
                <p><strong>Biografia:</strong> {biography}</p>
              </div>
              <img src={image} alt={name} />
              <p><strong>Riconoscimenti:</strong> {awards}</p>
            </div>
        </>
    )
}

export default Card