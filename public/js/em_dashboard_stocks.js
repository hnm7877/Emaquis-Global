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
  // Récupération de la devise dynamique selon le pays de l'utilisateur
  let currency = "";
  if (typeof window !== "undefined" && window.globalUser && window.PAYS) {
    const countryObj = window.PAYS.find(
      (p) => p.code === (window.globalUser.country || "cote_d_ivoire")
    );
    currency = countryObj ? countryObj.devise : "";
  }
  if (!currency) {
    currency = "XOF"; // fallback si non trouvé
  }

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
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      padding: "4px",
                      background: "#ffffff",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                      e.target.style.borderColor = "#2563eb";
                      e.target.style.boxShadow =
                        "0 2px 8px rgba(37, 99, 235, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <span
                  className="f_s_14 f_w_600 color_text_5"
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: "600",
                    color: "#0f172a",
                  }}
                >
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
                {product.prix_vente} {currency}
              </span>
            </td>
            <td className="f_s_14 f_w_400 text-center">
              <span
                className="d-inline-flex align-items-center justify-content-center"
                style={{
                  color:
                    product.quantite >= 100 || product.is_cocktail
                      ? "#059669"
                      : "#dc2626",
                  transition: "all 0.2s ease",
                  padding: "0.5rem 1rem",
                  borderRadius: "10px",
                  background:
                    product.quantite >= 100 || product.is_cocktail
                      ? "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
                      : "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                  border: `1px solid ${
                    product.quantite >= 100 || product.is_cocktail
                      ? "#86efac"
                      : "#fca5a5"
                  }`,
                  fontWeight: "600",
                  fontSize: "0.9375rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                }}
              >
                {product.is_cocktail ? (
                  <React.Fragment>
                    <i
                      className="fas fa-infinity mr-2"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <span>∞</span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <i
                      className={`fas ${
                        product.quantite >= 100
                          ? "fa-check-circle"
                          : "fa-exclamation-triangle"
                      } mr-2`}
                      style={{ fontSize: "0.875rem" }}
                    ></i>
                    <span>{product.quantite}</span>
                  </React.Fragment>
                )}
              </span>
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
  const { products } = React.useContext(AppContext);
  const lowStockCount = products.filter(
    (p) => p.quantite < 100 && !p.is_cocktail
  ).length;
  const totalProducts = products.length;

  return (
    <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12">
      <div className="white_card stocks-card mb_20 shadow-lg rounded-lg">
        <div className="white_card_header bg-gradient-primary p-4">
          <div className="box_header m-0">
            <div
              className="row align-items-center justify-content-between"
              style={{ margin: 0, width: "100%" }}
            >
              <div
                className="col-lg-6 col-md-12 col-sm-12 mb-2 mb-lg-0"
                style={{ paddingLeft: 0, paddingRight: "0.5rem" }}
              >
                <div className="main-title">
                  <h3 className="m-0 text-white">
                    <i className="fas fa-boxes mr-3"></i>
                    Inventaire du stock
                  </h3>
                </div>
              </div>
              <div
                className="col-lg-6 col-md-12 col-sm-12 text-lg-right text-left"
                style={{
                  overflow: "visible",
                  paddingLeft: "0.5rem",
                  paddingRight: 0,
                }}
              >
                <div
                  className="stocks-badges-container"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "visible",
                    minWidth: "fit-content",
                  }}
                >
                  <span
                    className="stock-badge"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      background: "rgba(255, 255, 255, 0.2)",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "8px",
                      fontSize: "0.8125rem",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      height: "fit-content",
                      flexShrink: 0,
                      minWidth: "fit-content",
                      flexBasis: "auto",
                    }}
                  >
                    <i
                      className="fas fa-cubes"
                      style={{ fontSize: "0.75rem" }}
                    ></i>
                    <span>
                      {totalProducts} produit{totalProducts > 1 ? "s" : ""}
                    </span>
                  </span>
                  {lowStockCount > 0 && (
                    <span
                      className="stock-badge stock-badge-warning"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        background: "rgba(239, 68, 68, 0.2)",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "8px",
                        fontSize: "0.8125rem",
                        fontWeight: "600",
                        color: "#fee2e2",
                        whiteSpace: "nowrap",
                        height: "fit-content",
                        flexShrink: 0,
                        minWidth: "fit-content",
                        flexBasis: "auto",
                      }}
                    >
                      <i
                        className="fas fa-exclamation-triangle"
                        style={{ fontSize: "0.75rem" }}
                      ></i>
                      <span>
                        {lowStockCount} stock{lowStockCount > 1 ? "s" : ""}{" "}
                        faible{lowStockCount > 1 ? "s" : ""}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="white_card_body QA_section table-wrapper-scroll-y my-custom-scrollbar p-4">
          <div className="QA_table stocks-table-responsive">
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
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
        overflow: visible;
        transition: all 0.3s ease;
        min-height: auto;
        height: auto;
      }
      .white_card.stocks-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .white_card.stocks-card .white_card_header {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
        color: #ffffff !important;
        border-radius: 16px 16px 0 0;
        box-shadow: none;
        padding: 1.5rem 2rem;
        margin-bottom: 0;
        position: relative;
        z-index: 2;
        overflow: visible;
      }
      .white_card.stocks-card .white_card_header .row {
        margin-left: 0 !important;
        margin-right: 0 !important;
        width: 100% !important;
      }
      .white_card.stocks-card .white_card_header .box_header {
        width: 100% !important;
      }
      .main-title h3 {
        font-size: 1.375rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        display: flex;
        align-items: center;
        gap: 0.75em;
        text-shadow: none;
        color: #ffffff;
        margin: 0;
        white-space: nowrap;
        overflow: visible;
        text-overflow: clip;
      }
      .main-title h3 i {
        font-size: 1.5rem;
        color: #ffffff;
      }
      .table {
        border-radius: 12px;
        overflow: hidden;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
        margin-bottom: 0;
      }
      .table th, .table td {
        border: none !important;
        font-size: 0.9375rem;
        vertical-align: middle;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        padding: 1rem 1.25rem;
      }
      .table th {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
        color: #ffffff !important;
        letter-spacing: 0.05em;
        font-weight: 700;
        border-radius: 0 !important;
        box-shadow: none;
        text-transform: uppercase;
        font-size: 0.8125rem;
        padding: 1.25rem 1.5rem;
        white-space: nowrap;
      }
      .badge {
        background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%) !important;
        color: #3730a3 !important;
        font-weight: 600;
        border-radius: 8px;
        font-size: 0.875rem;
        padding: 0.375rem 0.875rem;
        box-shadow: 0 1px 2px rgba(67, 56, 202, 0.1);
        border: 1px solid #c7d2fe;
        transition: all 0.2s ease;
        display: inline-block;
      }
      .badge:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 4px rgba(67, 56, 202, 0.2);
      }
      .my-custom-scrollbar {
        max-height: 70vh;
        min-height: 400px;
        overflow-x: auto;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #2563eb #f1f5f9;
        border-radius: 0 0 16px 16px;
        background: #f8fafc;
        padding: 1.5rem;
      }
      .my-custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background: #f1f5f9;
        border-radius: 4px;
      }
      .my-custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        border-radius: 4px;
      }
      .my-custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      }
      .d-inline-flex {
        display: inline-flex !important;
      }
      .rounded-lg {
        border-radius: 12px !important;
      }
      .stocks-table-responsive {
        overflow-x: auto;
        overflow-y: visible;
        -webkit-overflow-scrolling: touch;
        width: 100%;
      }
      .stocks-table-responsive table {
        min-width: 600px;
        width: 100%;
        table-layout: auto;
      }
      .white_card.stocks-card .white_card_body {
        overflow: visible;
      }
      .white_card.stocks-card .white_card_body .my-custom-scrollbar {
        overflow-x: auto;
        overflow-y: auto;
      }
      .stocks-badges-container {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        overflow-x: auto !important;
        overflow-y: visible !important;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .stocks-badges-container::-webkit-scrollbar {
        display: none;
      }
      .stock-badge {
        flex-shrink: 0 !important;
        flex-grow: 0 !important;
        flex-basis: auto !important;
        min-width: fit-content !important;
        max-width: none !important;
      }
      .col-lg-6.col-md-12.col-sm-12 {
        overflow: visible !important;
      }
      @media (max-width: 992px) {
        .stocks-badges-container {
          justify-content: flex-start !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
        }
        .stock-badge {
          font-size: 0.75rem !important;
          padding: 0.4rem 0.6rem !important;
          flex-shrink: 0 !important;
          min-width: fit-content !important;
        }
        .stock-badge i {
          font-size: 0.6875rem !important;
        }
        .col-lg-6.col-md-12.col-sm-12 {
          overflow-x: auto !important;
          overflow-y: visible !important;
        }
      }
      @media (max-width: 768px) {
        .my-custom-scrollbar {
          padding: 1rem;
          max-height: 60vh;
          min-height: 300px;
        }
        .stocks-table-responsive table {
          min-width: 700px;
        }
        .table th, .table td {
          padding: 0.75rem 0.5rem;
          font-size: 0.8125rem;
        }
        .table th {
          font-size: 0.75rem;
          padding: 0.875rem 0.5rem;
        }
      }
      @media (max-width: 576px) {
        .my-custom-scrollbar {
          padding: 0.75rem;
          max-height: 55vh;
          min-height: 250px;
        }
        .stocks-table-responsive table {
          min-width: 650px;
        }
        .table th, .table td {
          padding: 0.625rem 0.375rem;
          font-size: 0.75rem;
        }
        .table th {
          font-size: 0.6875rem;
          padding: 0.75rem 0.375rem;
        }
        .stocks-badges-container {
          gap: 0.375rem !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          justify-content: flex-start !important;
        }
        .stock-badge {
          font-size: 0.6875rem !important;
          padding: 0.375rem 0.5rem !important;
          flex-shrink: 0 !important;
          min-width: fit-content !important;
          max-width: none !important;
        }
        .stock-badge i {
          font-size: 0.625rem !important;
        }
        .stock-badge span {
          font-size: 0.6875rem !important;
        }
        .col-lg-6.col-md-12.col-sm-12 {
          overflow-x: auto !important;
          overflow-y: visible !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
