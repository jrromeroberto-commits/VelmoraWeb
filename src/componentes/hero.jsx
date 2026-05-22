import heroVelmora from "../imagenes/Hero_img.jpeg";
function Hero(){
    return (
        <section className="hero"
         style={{ backgroundImage: `url(${heroVelmora})` }}>
                <div className="hero-text">
                <h1>
                    Tiendas <br />
                    más <br />
                    destacadas
                </h1>

                <p>
                    Conoce las tiendas y marcas más destacadas en nuestra comunidad.
                </p>

                <a href = "#tiendas" className="hero-button">
                    Explora ahora
                </a>
                </div>
        </section>
    );
}

export default Hero;