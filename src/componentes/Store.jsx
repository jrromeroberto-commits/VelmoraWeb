import avantoLogo from "../imagenes/Logo_Avanto.png";
import nordaLogo from "../imagenes/Logo_nor.png";
import maisoneLogo from "../imagenes/Logo_M.png";
function Store(){
    const stores = [
        {
            id: 1,
            logo: avantoLogo,
            name: "AVANTO",
            description: "La más destacada", 
        },
        {
            id: 2,
            logo: nordaLogo,
            name: "NORDA",
            description: "Mejores Precios", 
        },
        {
            id: 3,
            logo: maisoneLogo,
            name: "MAISONE",
            description: "Mejores descuentos", 
        },
    ];
    return(
        <section className="store-section" id="tiendas">
            <div className="store-title">
                <span></span>
                <h2>Tiendas del momento</h2>
                <span></span>
            </div>

            <p className="store-subtitle">
                Descuble las tiendas más destacadas por calidad y precio.
            </p>

            <div className="store-grid">
                {stores.map((store) =>(
                    <article className="store-card-featured" key={stores.id}>
                        <img
                            src={store.logo}
                            alt={`Logo de ${store.name}`}
                            className="store-logo-img"
                        />
                        <h3>{store.name}</h3>
                        <div className="store-line"></div>
                        <p>{store.description}</p>
                        <a href="#" className="store-button">
                            Mira aquí
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
}
export default Store;