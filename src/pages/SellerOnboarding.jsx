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

import { isBlank } from "../utils/formValidation";

const createEmptyProduct = () => ({
  id: Date.now() + Math.random(),
  name: "",
  category: "",
  price: "",
  stock: "",
  description: "",
  sizes: "",
  colors: "",
  imagePreview: "",
});

function SellerOnboarding({ onStoreCreated }) {
  const navigate = useNavigate();
  const [storeType, setStoreType] = useState("interna");
  const [products, setProducts] = useState([createEmptyProduct()]);
  const [logoPreview, setLogoPreview] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeData, setStoreData] = useState({
    storeName: "",
    description: "",
    category: "",
    website: "",
    instagram: "",
    phone: "",
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
    setProducts((prev) => [...prev, createEmptyProduct()]);
  };

  const handleProductImageChange = (id, event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleProductChange(id, "imagePreview", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormMessage("");

    if (isBlank(storeData.storeName)) {
      setFormMessage("Ingresa el nombre de la tienda.");
      return;
    }

    if (isBlank(storeData.description)) {
      setFormMessage("Ingresa una descripcion para la tienda.");
      return;
    }

    if (isBlank(storeData.category)) {
      setFormMessage("Selecciona una categoria principal.");
      return;
    }

    if (storeType === "externa" && isBlank(storeData.website)) {
      setFormMessage("Ingresa el enlace de tu tienda externa.");
      return;
    }

    if (isBlank(storeData.phone)) {
      setFormMessage("Ingresa un numero de contacto.");
      return;
    }

    const completedProducts = products
      .filter((product) => product.name.trim())
      .map((product) => ({
        ...product,
        price: product.price.trim().startsWith("S/")
          ? product.price.trim()
          : `S/ ${product.price.trim() || "0.00"}`,
        sizes: product.sizes
          ? product.sizes.split(",").map((size) => size.trim()).filter(Boolean)
          : ["Unica"],
        colors: product.colors
          ? product.colors.split(",").map((color) => color.trim()).filter(Boolean)
          : ["Disponible"],
      }));

    setIsSubmitting(true);
    const result = await onStoreCreated({
      ...storeData,
      logoPreview,
      storeType,
      products: completedProducts,
    });
    setIsSubmitting(false);

    if (!result.success) {
      setFormMessage(result.message);
      return;
    }

    navigate("/panel");
  };

  return (
    <main className="seller-onboarding-page">
      <section className="seller-onboarding-header">
        <p>Registro de tienda</p>
        <h1>Configura tu espacio en Velmora</h1>
        <span>
          Completa la informacion comercial de tu tienda. Los datos se guardaran
          en el backend de Velmora.
        </span>
      </section>

      <form className="seller-onboarding-layout" onSubmit={handleSubmit} noValidate>
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
              {logoPreview ? (
                <img src={logoPreview} alt="Logo de la tienda" />
              ) : (
                <>
                  <FaCamera />
                  <span>Colocar logo aqui</span>
                </>
              )}
            </div>
            <p>PNG o JPG recomendado, fondo limpio y buena resolucion.</p>
            <input
              type="file"
              id="store-logo"
              accept="image/*"
              onChange={handleLogoChange}
            />
            <label htmlFor="store-logo">Seleccionar logo</label>
          </div>

          <label>
            Nombre de tienda
            <input
              name="storeName"
              value={storeData.storeName}
              onChange={handleStoreChange}
              placeholder="Nombre comercial de tu tienda"
            />
          </label>

          <label>
            Descripcion
            <textarea
              name="description"
              value={storeData.description}
              onChange={handleStoreChange}
              placeholder="Describe el estilo, productos y propuesta de tu tienda"
            />
          </label>

          <label>
            Categoria principal
            <select
              name="category"
              value={storeData.category}
              onChange={handleStoreChange}
            >
              <option value="">Selecciona una categoria</option>
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
                placeholder="@nombre_de_tienda"
              />
            </div>
          </label>

          <label>
            Contacto
            <input
              name="phone"
              value={storeData.phone}
              onChange={handleStoreChange}
              placeholder="+51 999 999 999"
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
                <div className="seller-product-image-upload">
                  {product.imagePreview ? (
                    <img src={product.imagePreview} alt={product.name || "Producto"} />
                  ) : (
                    <span>Imagen</span>
                  )}
                  <input
                    type="file"
                    id={`product-image-${product.id}`}
                    accept="image/*"
                    onChange={(event) => handleProductImageChange(product.id, event)}
                  />
                  <label htmlFor={`product-image-${product.id}`}>Subir</label>
                </div>

                <input
                  value={product.name}
                  onChange={(event) =>
                    handleProductChange(product.id, "name", event.target.value)
                  }
                  placeholder="Nombre de prenda"
                  aria-label="Nombre del producto"
                />
                <input
                  value={product.category}
                  onChange={(event) =>
                    handleProductChange(product.id, "category", event.target.value)
                  }
                  placeholder="Categoria"
                  aria-label="Categoria del producto"
                />
                <input
                  value={product.price}
                  onChange={(event) =>
                    handleProductChange(product.id, "price", event.target.value)
                  }
                  placeholder="Precio"
                  aria-label="Precio del producto"
                />
                <input
                  value={product.stock}
                  onChange={(event) =>
                    handleProductChange(product.id, "stock", event.target.value)
                  }
                  placeholder="Stock"
                  aria-label="Stock del producto"
                />
                <input
                  value={product.sizes}
                  onChange={(event) =>
                    handleProductChange(product.id, "sizes", event.target.value)
                  }
                  placeholder="Tallas: S, M, L"
                  aria-label="Tallas disponibles"
                />
                <input
                  value={product.colors}
                  onChange={(event) =>
                    handleProductChange(product.id, "colors", event.target.value)
                  }
                  placeholder="Colores: Negro, Blanco"
                  aria-label="Colores disponibles"
                />
                <textarea
                  value={product.description}
                  onChange={(event) =>
                    handleProductChange(product.id, "description", event.target.value)
                  }
                  placeholder="Descripcion de la prenda"
                  aria-label="Descripcion del producto"
                />
              </article>
            ))}
          </div>

          <button type="button" className="seller-add-product" onClick={addProduct}>
            <FaPlus />
            Agregar producto
          </button>

          <div className="seller-onboarding-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando tienda..." : "Finalizar registro de tienda"}
            </button>
          </div>
          {formMessage && <p className="auth-message error">{formMessage}</p>}
        </section>
      </form>
    </main>
  );
}

export default SellerOnboarding;
