import {
  FaBoxOpen,
  FaChartLine,
  FaClock,
  FaMousePointer,
  FaShoppingBag,
  FaStore,
} from "react-icons/fa";

function SellerDashboard({ store }) {
  const storeName = store?.storeName || "Urban Flow";
  const products =
    store?.products ||
    [
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
    ];
  const dashboardStats = store?.stats || {};

  const stats = [
    {
      icon: <FaMousePointer />,
      label: "Clicks a tienda",
      value: dashboardStats.catalogClicks || 0,
      change: "desde backend",
    },
    {
      icon: <FaShoppingBag />,
      label: "Ventas estimadas",
      value: `S/ ${Number(dashboardStats.revenue || 0).toFixed(2)}`,
      change: `${dashboardStats.orders || 0} ordenes`,
    },
    {
      icon: <FaBoxOpen />,
      label: "Productos activos",
      value: dashboardStats.products || products.length,
      change: `${dashboardStats.totalStock || 0} en stock`,
    },
    {
      icon: <FaChartLine />,
      label: "Vistas",
      value: dashboardStats.views || 0,
      change: `${dashboardStats.lowStock || 0} bajo stock`,
    },
  ];

  const visits = [
    { month: "Oct", value: 48 },
    { month: "Nov", value: 34 },
    { month: "Dic", value: 72 },
  ];

  return (
    <main className="seller-dashboard-page">
      <aside className="seller-sidebar">
        <div className="seller-sidebar-brand">
          <FaStore />
          <div>
            <strong>{storeName}</strong>
            <span>{store?.category || "Ropa urbana"}</span>
          </div>
        </div>

        <nav>
          <a href="#dashboard" className="active">Dashboard</a>
          <a href="#catalogo">Catalogo</a>
          <a href="#ventas">Ventas</a>
          <a href="#promociones">Promociones</a>
          <a href="#configuracion">Configuracion</a>
        </nav>
      </aside>

      <section className="seller-dashboard-content" id="dashboard">
        <div className="seller-dashboard-top">
          <div>
            <p>Panel de tienda</p>
            <h1>{storeName}</h1>
          </div>

          <button type="button">
            <FaClock />
            Mes actual
          </button>
        </div>

        <div className="seller-stats-grid">
          {stats.map((stat) => (
            <article className="seller-stat-card" key={stat.label}>
              <div>{stat.icon}</div>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.change} vs mes anterior</p>
            </article>
          ))}
        </div>

        <div className="seller-dashboard-grid">
          <section className="seller-analytics-card">
            <div className="seller-card-heading">
            <h2>Resumen de ventas</h2>
              <button type="button">Filtrar</button>
            </div>

            <div className="seller-bars">
              {visits.map((item) => (
                <div className="seller-bar-group" key={item.month}>
                  <strong>S/ {(item.value * Math.max(Number(dashboardStats.revenue || 1), 1)).toLocaleString("es-PE")}</strong>
                  <div>
                    <span style={{ height: `${item.value}%` }}></span>
                    <span style={{ height: `${item.value - 12}%` }}></span>
                    <span style={{ height: `${item.value - 22}%` }}></span>
                  </div>
                  <p>{item.month}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="seller-analytics-card seller-clicks-card">
            <div className="seller-card-heading">
              <h2>Actividad por dia</h2>
              <button type="button">Semanal</button>
            </div>

            <div className="seller-week-bars">
              {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map(
                (day, index) => (
                  <div key={day}>
                    <span style={{ height: `${32 + index * 8}%` }}></span>
                    <p>{day}</p>
                  </div>
                )
              )}
            </div>
          </section>
        </div>

        <section className="seller-products-table" id="catalogo">
          <div className="seller-card-heading">
            <h2>Catalogo publicado</h2>
            <button type="button">Agregar prenda</button>
          </div>

          <div className="seller-table">
            <div className="seller-table-head">
              <span>Producto</span>
              <span>Categoria</span>
              <span>Precio</span>
              <span>Stock</span>
              <span>Estado</span>
            </div>

            {products.map((product) => (
              <div className="seller-table-row" key={product.id}>
                <span>{product.name}</span>
                <span>{product.category}</span>
                <span>S/ {Number(product.price || 0).toFixed(2)}</span>
                <span>{product.stock}</span>
                <span>Activo</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default SellerDashboard;
