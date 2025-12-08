const formatAmount = (montant) => {
  const tab = ("" + (montant > 0 ? montant : ("" + montant).slice(1)))
    .split("")
    .reverse();
  let d = 3;
  for (let i = 0; i < tab.length; i++) {
    if (d + 1 > tab.length) {
      break;
    }
    if (tab.length >= 11) {
      tab.splice(d === 3 ? d : d + i, 0, ".");
    } else {
      tab.splice(d === 3 ? d : d + 1, 0, ".");
    }

    d += 3;
  }
  tab.reverse();
  while (tab[0] === ".") {
    tab.splice(0, 1);
  }
  return isNaN(montant) || "" + montant === "0"
    ? "0"
    : (montant >= 0 ? "" : "-") + tab.join("");
};

const EmDashboardEmployes = () => {
  const { totalVentes, billet, user, updateBillet, resetTotalVentes } =
    React.useContext(AppContext);

  const { venteId } = React.useContext(ProductsContext);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [productsReturn, setProductsReturn] = React.useState([]);

  // Récupération de la devise dynamiquement selon le pays de l'utilisateur
  // On suppose que la variable globale 'globalUser' et 'PAYS' sont injectées dans le HTML
  let currency = "";
  if (typeof window !== "undefined" && window.globalUser && window.PAYS) {
    const countryObj = window.PAYS.find(
      (p) => p.code === (window.globalUser.country || "cote_d_ivoire")
    );
    currency = countryObj ? countryObj.devise : "";
  }

  const handleToggleOpenDay = () => {
    // open billet
    setLoading(true);
    fetch(
      `/billet/${billet && !billet.is_closed ? "closeBillet" : "openBillet"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employe_id: user._id,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.data) {
          if (!data.data.is_closed) {
            resetTotalVentes();
          }

          if (data.productsReturn && data.productsReturn.length > 0) {
            setProductsReturn(data.productsReturn);
            $("#modalMessageProductsReturn").modal("show");
          }

          updateBillet(data.data);
        } else if (data.message) {
          setMessage(data.message);
          $("#modalMessage").modal("show");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleCloseMessage = () => {
    $("#modalMessage").modal("hide");
    setMessage(null);
  };

  const handleCloseProductReturnModal = () => {
    $("#modalMessageProductsReturn").modal("hide");
    setProductsReturn([]);
    window.location.reload();
  };

  const closeBilletText =
    billet && !billet.is_closed
      ? loading
        ? "Fermeture en cours..."
        : "Fermer la caisse"
      : loading
      ? "Ouverture en cours..."
      : "Ouvrir la caisse";

  return (
    <div
      className={`col-xl-3 col-lg-4 col-md-5 col-sm-12 mt-${
        venteId ? "5" : "2"
      }`}
    >
      <div
        className="white_card card_height_100 mb_30 user_crm_wrapper"
        style={{
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="single_crm">
              <div
                className="crm_head crm_bg_1 d-flex align-items-center justify-content-between"
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                  padding: "1.5rem 1.75rem",
                  borderRadius: "16px 16px 0 0",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.2)",
                }}
              >
                <div className="thumb d-flex align-items-center">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "12px",
                    }}
                  >
                    <i
                      className="fas fa-chart-line"
                      style={{
                        fontSize: "1.25rem",
                        color: "#ffffff",
                      }}
                    ></i>
                  </div>
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "1.125rem",
                      color: "#ffffff",
                      letterSpacing: "-0.02em",
                    }}
                    className="text-center"
                  >
                    Ventes
                  </span>
                </div>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.15)";
                  }}
                >
                  <i
                    className="fas fa-ellipsis-h"
                    style={{
                      fontSize: "0.875rem",
                      color: "#ffffff",
                    }}
                  ></i>
                </div>
              </div>
              <div
                className="crm_body"
                style={{
                  padding: "2rem 1.75rem",
                  background: "#ffffff",
                  borderRadius: "0 0 16px 16px",
                }}
              >
                <div
                  className="ventes-info-container"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                    flexWrap: "nowrap",
                    width: "100%",
                  }}
                >
                  <h4
                    className="ventes-amount"
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: 0,
                      lineHeight: "1.2",
                      letterSpacing: "-0.02em",
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    <span>
                      {formatAmount(totalVentes)} {currency}
                    </span>
                  </h4>
                  <p
                    className="ventes-date"
                    style={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={`fas ${
                        billet && billet.is_closed ? "fa-lock" : "fa-clock"
                      }`}
                      style={{ fontSize: "0.75rem" }}
                    ></i>
                    <span>
                      {billet && billet.is_closed
                        ? "Montant après fermeture"
                        : "Aujourd'hui"}
                    </span>
                  </p>
                </div>
                <button
                  id="openCash"
                  onClick={handleToggleOpenDay}
                  className={`btn w-100 mt-2`}
                  disabled={loading}
                  style={{
                    background:
                      billet && !billet.is_closed
                        ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                        : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    border: "none",
                    padding: "0.875rem 1.5rem",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "0.9375rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  {loading ? (
                    <React.Fragment>
                      <i
                        className="fas fa-spinner fa-spin"
                        style={{ marginRight: "8px" }}
                      ></i>
                      {billet && !billet.is_closed
                        ? "Fermeture..."
                        : "Ouverture..."}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <i
                        className={`fas ${
                          billet && !billet.is_closed ? "fa-lock" : "fa-unlock"
                        }`}
                        style={{ marginRight: "8px" }}
                      ></i>
                      {closeBilletText}
                    </React.Fragment>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalMessage"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalMessageTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "500px" }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden",
            }}
          >
            <div
              className="modal-header"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "#ffffff",
                borderRadius: "16px 16px 0 0",
                border: "none",
                padding: "1.75rem 2rem",
              }}
            >
              <h5
                className="modal-title"
                id="exampleModalLongTitle"
                style={{
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <i className="fas fa-exclamation-triangle"></i>
                IMPOSSIBLE DE FERMER LA CAISSE
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseMessage}
                style={{
                  color: "#ffffff",
                  opacity: "0.9",
                  fontSize: "1.75rem",
                  fontWeight: "300",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: "2rem",
                fontSize: "1rem",
                color: "#0f172a",
                background: "#ffffff",
                lineHeight: "1.6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className="fas fa-ban"
                    style={{ color: "#ef4444", fontSize: "1.25rem" }}
                  ></i>
                </div>
                <p style={{ margin: 0, flex: 1 }}>{message}</p>
              </div>
            </div>
            <div
              className="modal-footer"
              style={{
                borderTop: "1px solid #e2e8f0",
                padding: "1.5rem 2rem",
                background: "#f8fafc",
              }}
            >
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleCloseMessage}
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 4px 8px rgba(16, 185, 129, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 2px 4px rgba(16, 185, 129, 0.2)";
                }}
              >
                <i className="fas fa-check" style={{ marginRight: "8px" }}></i>
                Compris
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalMessageProductsReturn"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalMessageProductsReturnTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            maxWidth: "600px",
          }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden",
            }}
          >
            <div
              className="modal-header"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                color: "#ffffff",
                borderRadius: "16px 16px 0 0",
                border: "none",
                padding: "1.75rem 2rem",
              }}
            >
              <h5
                className="modal-title"
                id="exampleModalLongTitle"
                style={{
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <i className="fas fa-info-circle"></i>
                INFORMATIONS
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseProductReturnModal}
                style={{
                  color: "#ffffff",
                  opacity: "0.9",
                  fontSize: "1.75rem",
                  fontWeight: "300",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: "2rem",
                fontSize: "0.9375rem",
                color: "#0f172a",
                background: "#ffffff",
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {productsReturn && productsReturn.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {productsReturn.map((productReturn, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "1.25rem",
                        marginBottom: "0",
                        background:
                          "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                        borderRadius: "12px",
                        border: "1px solid #bfdbfe",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateX(4px)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(37, 99, 235, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            background:
                              "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <i
                            className="fas fa-box"
                            style={{ color: "#2563eb", fontSize: "1rem" }}
                          ></i>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              margin: 0,
                              lineHeight: "1.6",
                              color: "#1e293b",
                            }}
                          >
                            La quantité du{" "}
                            <strong>{productReturn.produit.nom_produit}</strong>{" "}
                            <span
                              style={{
                                padding: "0.125rem 0.5rem",
                                borderRadius: "4px",
                                background: "#e0e7ff",
                                color: "#4338ca",
                                fontSize: "0.875rem",
                                fontWeight: "600",
                              }}
                            >
                              {productReturn.taille}
                            </span>{" "}
                            est passée de{" "}
                            <strong style={{ color: "#dc2626" }}>
                              {productReturn.oldQuantite}
                            </strong>{" "}
                            à{" "}
                            <strong style={{ color: "#059669" }}>
                              {productReturn.quantite}
                            </strong>{" "}
                            suite à l'expiration du code{" "}
                            <code
                              style={{
                                padding: "0.125rem 0.5rem",
                                borderRadius: "4px",
                                background: "#f1f5f9",
                                color: "#475569",
                                fontSize: "0.875rem",
                                fontFamily: "monospace",
                              }}
                            >
                              {productReturn.code}
                            </code>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, textAlign: "center", color: "#64748b" }}>
                  Aucune information disponible
                </p>
              )}
            </div>
            <div
              className="modal-footer"
              style={{
                borderTop: "1px solid #e2e8f0",
                padding: "1.5rem 2rem",
                background: "#f8fafc",
              }}
            >
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleCloseProductReturnModal}
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 4px 8px rgba(16, 185, 129, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 2px 4px rgba(16, 185, 129, 0.2)";
                }}
              >
                <i className="fas fa-check" style={{ marginRight: "8px" }}></i>
                Compris
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Ajout d'un style global professionnel et harmonisé pour la carte employé
if (typeof window !== "undefined") {
  const oldStyle = document.getElementById("dashboardEmployesStyle");
  if (oldStyle) oldStyle.remove();
  if (!document.getElementById("dashboardEmployesStyle")) {
    const style = document.createElement("style");
    style.id = "dashboardEmployesStyle";
    style.innerHTML = `
      .user_crm_wrapper {
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .user_crm_wrapper:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }
      .crm_head {
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%) !important;
        color: #ffffff !important;
        border-radius: 16px 16px 0 0;
        box-shadow: none;
        padding: 1.5rem 1.75rem;
        margin-bottom: 0;
      }
      .crm_head .thumb {
        display: flex;
        align-items: center;
      }
      .crm_head .thumb span {
        font-weight: 700;
        font-size: 1.125rem;
        color: #ffffff;
        letter-spacing: -0.02em;
      }
      .crm_body {
        padding: 2rem 1.75rem;
        background: #ffffff;
        border-radius: 0 0 16px 16px;
      }
      .crm_body h4 {
        font-size: 2rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 0.5rem;
        text-align: center;
        letter-spacing: -0.02em;
      }
      .crm_body p {
        color: #64748b;
        font-size: 0.875rem;
        text-align: center;
        margin-bottom: 1.5rem;
        font-weight: 500;
      }
      .crm_body .btn {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: #ffffff;
        border: none;
        border-radius: 12px;
        padding: 0.875rem 1.5rem;
        font-weight: 600;
        font-size: 0.9375rem;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
      }
      .crm_body .btn:hover {
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }
      .crm_body .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none !important;
      }
      .ventes-info-container {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
      }
      .ventes-amount {
        flex-shrink: 0 !important;
      }
      .ventes-date {
        flex-shrink: 0 !important;
      }
      @media (max-width: 992px) {
        .ventes-info-container {
          gap: 0.75rem !important;
        }
        .ventes-amount {
          font-size: 1.75rem !important;
        }
        .ventes-date {
          font-size: 0.8125rem !important;
        }
      }
      @media (max-width: 768px) {
        .ventes-info-container {
          gap: 0.625rem !important;
        }
        .ventes-amount {
          font-size: 1.5rem !important;
        }
        .ventes-date {
          font-size: 0.75rem !important;
        }
        .ventes-date i {
          font-size: 0.6875rem !important;
        }
      }
      @media (max-width: 576px) {
        .ventes-info-container {
          gap: 0.5rem !important;
        }
        .ventes-amount {
          font-size: 1.25rem !important;
        }
        .ventes-date {
          font-size: 0.6875rem !important;
        }
        .ventes-date i {
          font-size: 0.625rem !important;
        }
        .ventes-date span {
          font-size: 0.6875rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
