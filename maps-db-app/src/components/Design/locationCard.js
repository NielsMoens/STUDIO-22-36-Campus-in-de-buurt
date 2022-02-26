const LocationCard = ({location}) => {
    return(
        <div className="locationCard">
            <img src={location.imageLink ? location.imageLink : "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"}/>
            <article>
                <h5>{location.name}</h5>
                <p>{location.description}</p>
                <button>Read more</button>
            </article>
        </div>
    )
};

export default LocationCard;