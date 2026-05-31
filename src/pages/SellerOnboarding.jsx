import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaGlobe,
  FaInstagram,
  FaPlus,
  FaStore,
  FaTag,
} from "react-icons/fa";

function SellerOnboarding({ onStoreCreated }) {
  const navigate = useNavigate();
  const [storeType, setStoreType] = useState("interna");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Casaca urbana",
      category: "Prendas urbanas",
      price: "89.90",
      stock: "18",
    },
    {
      id: 2,
      name: "Polo oversize",
      category: "Polos",
      price: "49.90",
      stock: "32",
    },
  ]);
  const [storeData, setStoreData] = useState({
    storeName: "Urban Flow",
    description: "Moda urbana seleccionada para outfits diarios.",
    category: "Ropa urbana",
    website: "",
    instagram: "@urbanflow",
    phone: "+51 999 999 999",
  });

  const handleStoreChange = (event) => {
    const { name, value } = event.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Nueva prenda",
        category: "Categoria",
        price: "0.00",
        stock: "0",
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onStoreCreated({
      ...storeData,
      storeType,
      products,
    });
    navigate("/panel");
  };

  return (
    <main className="seller-onboarding-page">
      <section className="seller-onboarding-header">
        <p>Registro de tienda</p>
        <h1>Configura tu espacio en Velmora</h1>
        <span>
          Completa la informacion comercial de tu tienda. Por ahora esta vista
          es solo frontend y usa datos simulados.
        </span>
      </section>

      <form className="seller-onboarding-layout" onSubmit={handleSubmit}>
        <section className="seller-form-panel">
          <div className="seller-panel-title">
            <FaStore />
            <div>
              <h2>Datos de la tienda</h2>
              <p>Informacion que veran los compradores.</p>
            </div>
          </div>

          <div className="seller-logo-uploader">
            <div>
              <FaCamera />
              <span>Colocar logo aqui</span>
            </div>
            <p>PNG o JPG recomendado, fondo limpio y buena resolucion.</p>
          </div>

          <label>
            Nombre de tienda
            <input
              name="storeName"
              value={storeData.storeName}
              onChange={handleStoreChange}
            />
          </label>

          <label>
            Descripcion
            <textarea
              name="description"
              value={storeData.description}
              onChange={handleStoreChange}
            />
          </label>

          <label>
            Categoria principal
            <select
              name="category"
              value={storeData.category}
              onChange={handleStoreChange}
            >
              <option>Ropa urbana</option>
              <option>Ropa deportiva</option>
              <option>Calzado</option>
              <option>Accesorios</option>
              <option>Moda elegante</option>
            </select>
          </label>

          <div className="seller-type-selector">
            <button
              type="button"
              className={storeType === "interna" ? "active" : ""}
              onClick={() => setStoreType("interna")}
            >
              Tienda dentro de Velmora
            </button>
            <button
              type="button"
              className={storeType === "externa" ? "active" : ""}
              onClick={() => setStoreType("externa")}
            >
              Tengo web externa
            </button>
          </div>

          {storeType === "externa" && (
            <label>
              Enlace de tienda externa
              <div className="seller-input-icon">
                <FaGlobe />
                <input
                  name="website"
                  value={storeData.website}
                  onChange={handleStoreChange}
                  placeholder="https://mitienda.com"
                />
              </div>
            </label>
          )}

          <label>
            Instagram
            <div className="seller-input-icon">
              <FaInstagram />
              <input
                name="instagram"
                value={storeData.instagram}
                onChange={handleStoreChange}
              />
            </div>
          </label>

          <label>
            Contacto
            <input
              name="phone"
              value={storeData.phone}
              onChange={handleStoreChange}
            />
          </label>
        </section>

        <section className="seller-form-panel">
          <div className="seller-panel-title">
            <FaTag />
            <div>
              <h2>Catalogo inicial</h2>
              <p>Productos de ejemplo para visualizar gestion de tienda.</p>
            </div>
          </div>

          <div className="seller-products-editor">
            {products.map((product) => (
              <article className="seller-product-row" key={product.id}>
                <input
                  value={product.name}
                  onChange={(event) =>
                    handleProductChange(product.id, "name", event.target.value)
                  }
                  aria-label="Nombre del producto"
                />
                <input
                  value={product.category}
                  onChange={(event) =>
                    handleProductChange(product.id, "category", event.target.value)
                  }
                  aria-label="Categoria del producto"
                />
                <input
                  value={product.price}
                  onChange={(event) =>
                    handleProductChange(product.id, "price", event.target.value)
                  }
                  aria-label="Precio del producto"
                />
                <input
                  value={product.stock}
                  onChange={(event) =>
                    handleProductChange(product.id, "stock", event.target.value)
                  }
                  aria-label="Stock del producto"
                />
              </article>
            ))}
          </div>

          <button type="button" className="seller-add-product" onClick={addProduct}>
            <FaPlus />
            Agregar producto
          </button>

          <div className="seller-onboarding-actions">
            <button type="submit">Finalizar registro de tienda</button>
          </div>
        </section>
      </form>
    </main>
  );
}

export default SellerOnboarding;
