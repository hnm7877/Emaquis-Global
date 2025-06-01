const TablesStocksHead = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className="text-uppercase f_w_600">
          Produit
        </th>
        <th scope="col" className="text-uppercase f_w_600">
          Nom du produit
        </th>
        <th scope="col" className="text-uppercase f_w_600">
          Taille
        </th>
        <th scope="col" className="text-uppercase f_w_600">
          Prix de vente
        </th>
        <th scope="col" className="text-uppercase f_w_600">
          Quantité
        </th>
      </tr>
    </thead>
  );
};

const TablesStocksBody = () => {
  const { products } = React.useContext(AppContext);

  return (
    <tbody>
      {products.map((product) => {
        return (
          <tr
            key={product._id}
            className="hover-shadow transition-all duration-300"
          >
            <td>
              <div className="customer d-flex align-items-center">
                <div className="thumb_34 mr_15 mt-0">
                  <img
                    src={product.produit.image}
                    alt="image produit"
                    className="rounded-lg shadow-sm transition-transform duration-300 hover:scale-110"
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "contain",
                      border: "2px solid #f8f9fa",
                    }}
                  />
                </div>
                <span className="f_s_14 f_w_600 color_text_5">
                  {product.nom_produit}
                </span>
              </div>
            </td>
            <td className="f_s_14 f_w_400 color_text_6">
              {product.produit.nom_produit}
            </td>
            <td className="f_s_14 f_w_400 color_text_6">{product.taille}</td>
            <td className="f_s_14 f_w_400 color_text_6">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                {product.prix_vente} FCFA
              </span>
            </td>
            <td className="f_s_14 f_w_400 text-center">
              <a
                href="#"
                className="d-inline-flex align-items-center justify-content-center"
                style={{
                  color:
                    product.quantite >= 100 || product.is_cocktail
                      ? "#2ecc71"
                      : "#e74c3c",
                  transition: "all 0.3s ease",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  backgroundColor:
                    product.quantite >= 100 || product.is_cocktail
                      ? "rgba(46, 204, 113, 0.1)"
                      : "rgba(231, 76, 60, 0.1)",
                }}
              >
                {product.is_cocktail ? (
                  <i className="fas fa-infinity mr-2"></i>
                ) : (
                  <i
                    className={`fas ${
                      product.quantite >= 100
                        ? "fa-check-circle"
                        : "fa-exclamation-circle"
                    } mr-2`}
                  ></i>
                )}
                {product.is_cocktail ? "∞" : product.quantite}
              </a>
            </td>
          </tr>
        );
      })}

      {/* <% produits.map((el)=>{ %>

  <tr>
    <td>
      <div className="customer d-flex align-items-center">
        <div className="thumb_34 mr_15 mt-0">
          <img
            src="<%= el.produit.image %>"
            alt="image produit"
            style="
              width: 40px;
              height: 40px;
              object-fit: contain;
            "
          />
        </div>
        <span className="f_s_12 f_w_600 color_text_5">
          <%= el.nom_produit %></span
        >
      </div>
    </td>
    <td className="f_s_12 f_w_400 color_text_6">
      <%= el.produit.nom_produit %>
    </td>
    <td className="f_s_12 f_w_400 color_text_6">
      <%= el.taille %>
    </td>
    <td className="f_s_12 f_w_400 color_text_6">
      <%= el.prix_vente %> FcFA
    </td>
    <td className="f_s_12 f_w_400 text-center">
      <% if(el.quantite <= 100){ %>
      <a
        href="#"
        className=""
        style="color: rgb(219, 36, 23)"
      >
        <%= el.quantite %></a
      >

      <% } else{ %>
      <a
        href="#"
        className=""
        style="color: rgb(47, 204, 47)"
      >
        <%= el.quantite %></a
      >

      <% } %>
    </td>
  </tr>
  <% }) %> */}
    </tbody>
  );
};

const EmDashboardStocks = () => {
  return (
    <div className="col-lg-9">
      <div className="white_card card_height_100 mb_20 shadow-lg rounded-lg overflow-hidden">
        <div className="white_card_header bg-gradient-primary p-4">
          <div className="box_header m-0">
            <div className="main-title">
              <h3 className="m-0 text-white">
                <i className="fas fa-boxes mr-3"></i>
                Inventaire du stock
              </h3>
            </div>
          </div>
        </div>
        <div className="white_card_body QA_section table-wrapper-scroll-y my-custom-scrollbar p-4">
          <div className="QA_table">
            <table className="table lms_table_active2 p-0">
              <TablesStocksHead />
              <TablesStocksBody />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Ajout d'un style global professionnel et harmonisé pour tous les éléments du composant stocks
if (typeof window !== "undefined") {
  const oldStyle = document.getElementById("dashboardStocksStyle");
  if (oldStyle) oldStyle.remove();
  if (!document.getElementById("dashboardStocksStyle")) {
    const style = document.createElement("style");
    style.id = "dashboardStocksStyle";
    style.innerHTML = `
      .white_card {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 2px 12px rgba(30,42,80,0.07);
        border: 1px solid #f3f4f6;
        overflow: hidden;
      }
      .white_card_header {
        background: #22305a !important;
        color: #fff !important;
        border-radius: 16px 16px 0 0;
        box-shadow: none;
        padding: 1.2rem 1.7rem;
        margin-bottom: 0.5rem;
      }
      .main-title h3 {
        font-size: 1.22rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        display: flex;
        align-items: center;
        gap: 0.5em;
        text-shadow: none;
        color: #fff;
      }
      .main-title h3 i {
        font-size: 1.25rem;
        color: #fff;
      }
      .table {
        border-radius: 14px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 2px 12px rgba(30,42,80,0.07);
        border: 1px solid #f3f4f6;
      }
      .table th, .table td {
        border: none !important;
        font-size: 1.07rem;
        vertical-align: middle;
        font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        padding: 1.1rem 1.3rem;
      }
      .table th {
        background: #22305a !important;
        color: #fff !important;
        letter-spacing: 0.02em;
        font-weight: 700;
        border-radius: 0 !important;
        box-shadow: none;
        text-transform: uppercase;
        font-size: 1.01rem;
        padding: 1.2rem 1.3rem;
      }
      .badge {
        background: #f3f4f6 !important;
        color: #22305a !important;
        font-weight: 600;
        border-radius: 10px;
        font-size: 1.01rem;
        padding: 0.25em 0.9em;
        box-shadow: none;
        border: 1px solid #e5e7eb;
        transition: none;
        display: inline-block;
      }
      .my-custom-scrollbar {
        max-height: 60vh;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #e0e7ef #f3f4f6;
        border-radius: 0 0 16px 16px;
      }
      .my-custom-scrollbar::-webkit-scrollbar {
        width: 7px;
        background: #f3f4f6;
        border-radius: 7px;
      }
      .my-custom-scrollbar::-webkit-scrollbar-thumb {
        background: #e0e7ef;
        border-radius: 7px;
      }
      .d-inline-flex {
        display: inline-flex !important;
      }
      .rounded-lg {
        border-radius: 12px !important;
      }
    `;
    document.head.appendChild(style);
  }
}
