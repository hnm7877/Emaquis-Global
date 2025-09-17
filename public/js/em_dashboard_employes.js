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
    <div className={`col-xl-3 mt-${venteId ? "5" : "2"}`}>
      <div
        className="white_card card_height_100 mb_30 user_crm_wrapper"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          borderRadius: "15px",
          transition: "all 0.3s ease",
          background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
        }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="single_crm">
              <div
                className="crm_head crm_bg_1 d-flex align-items-center justify-content-between"
                style={{
                  background: "linear-gradient(45deg, #2196F3, #1976D2)",
                  padding: "1.2rem",
                  borderRadius: "12px 12px 0 0",
                  boxShadow: "0 2px 10px rgba(33, 150, 243, 0.2)",
                }}
              >
                <div className="thumb d-flex align-items-center">
                  <img
                    src="../img/icone_ventes.png"
                    style={{
                      height: "24px",
                      transform: "rotate(-20deg)",
                      marginRight: "10px",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                      transition: "transform 0.3s ease",
                    }}
                    alt=""
                    onMouseOver={(e) =>
                      (e.target.style.transform = "rotate(0deg)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.transform = "rotate(-20deg)")
                    }
                  />
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      color: "#ffffff",
                      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                    className="text-center"
                  >
                    Ventes
                  </span>
                </div>
                <i
                  className="fas fa-ellipsis-h f_s_11 white_text"
                  style={{
                    opacity: "0.8",
                    transition: "opacity 0.3s ease",
                  }}
                ></i>
              </div>
              <div
                className="crm_body"
                style={{
                  padding: "1.5rem",
                  background: "#ffffff",
                  borderRadius: "0 0 12px 12px",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    color: "#2c3e50",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  <span>
                    {formatAmount(totalVentes)} {currency}
                  </span>
                  <span
                    className="badge badge-info ml-2"
                    style={{ fontSize: "1rem", verticalAlign: "middle" }}
                  >
                    {currency}
                  </span>
                </h4>
                <p
                  style={{
                    color: "#6c757d",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    marginBottom: "1.2rem",
                  }}
                >
                  {billet && billet.is_closed
                    ? "Montant après fermeture"
                    : "Aujourd'hui"}
                </p>
                <button
                  id="openCash"
                  onClick={handleToggleOpenDay}
                  className={`btn w-100 mt-2`}
                  disabled={loading}
                  style={{
                    background:
                      billet && !billet.is_closed
                        ? "linear-gradient(45deg, #dc3545, #c82333)"
                        : "linear-gradient(45deg, #28a745, #218838)",
                    border: "none",
                    padding: "0.8rem",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontWeight: "600",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    transform: "translateY(0)",
                    ":hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {closeBilletText}
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
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content"
            style={{
              borderRadius: "15px",
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="modal-header"
              style={{
                background: "linear-gradient(45deg, #dc3545, #c82333)",
                color: "#ffffff",
                borderRadius: "15px 15px 0 0",
                border: "none",
              }}
            >
              <h5
                className="modal-title"
                id="exampleModalLongTitle"
                style={{
                  fontWeight: "600",
                }}
              >
                IMPOSSIBLE DE FERMER LA CAISSE
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{
                  color: "#ffffff",
                  opacity: "0.8",
                  transition: "opacity 0.3s ease",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: "1.5rem",
                fontSize: "1.1rem",
                color: "#2c3e50",
              }}
            >
              {message}
            </div>
            <div
              className="modal-footer"
              style={{
                borderTop: "1px solid #eee",
                padding: "1rem 1.5rem",
              }}
            >
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleCloseMessage}
                style={{
                  background: "linear-gradient(45deg, #28a745, #218838)",
                  border: "none",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "8px",
                  fontWeight: "600",
                  boxShadow: "0 2px 8px rgba(40, 167, 69, 0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                OK
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
            maxWidth: "50%",
          }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "15px",
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="modal-header"
              style={{
                background: "linear-gradient(45deg, #2196F3, #1976D2)",
                color: "#ffffff",
                borderRadius: "15px 15px 0 0",
                border: "none",
              }}
            >
              <h5
                className="modal-title"
                id="exampleModalLongTitle"
                style={{
                  fontWeight: "600",
                }}
              >
                INFORMATIONS
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{
                  color: "#ffffff",
                  opacity: "0.8",
                  transition: "opacity 0.3s ease",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: "1.5rem",
                fontSize: "1.1rem",
                color: "#2c3e50",
              }}
            >
              {productsReturn &&
                productsReturn.map((productReturn, index) => (
                  <p
                    key={index}
                    style={{
                      padding: "0.8rem",
                      marginBottom: "0.8rem",
                      background: "#f8f9fa",
                      borderRadius: "8px",
                      borderLeft: "4px solid #2196F3",
                    }}
                  >
                    la quantité du {productReturn.produit.nom_produit}{" "}
                    {productReturn.taille} est passée de{" "}
                    {productReturn.oldQuantite} à {productReturn.quantite} suite
                    à l'expiration du code {productReturn.code}
                  </p>
                ))}
            </div>
            <div
              className="modal-footer"
              style={{
                borderTop: "1px solid #eee",
                padding: "1rem 1.5rem",
              }}
            >
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleCloseProductReturnModal}
                style={{
                  background: "linear-gradient(45deg, #28a745, #218838)",
                  border: "none",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "8px",
                  fontWeight: "600",
                  boxShadow: "0 2px 8px rgba(40, 167, 69, 0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                OK
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
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 2px 12px rgba(30,42,80,0.07);
        border: 1px solid #f3f4f6;
        overflow: hidden;
        transition: box-shadow 0.2s;
      }
      .user_crm_wrapper:hover {
        box-shadow: 0 6px 24px rgba(30,42,80,0.13);
      }
      .crm_head {
        background: linear-gradient(45deg, #22305a, #23408e) !important;
        color: #fff !important;
        border-radius: 16px 16px 0 0;
        box-shadow: none;
        padding: 1.2rem 1.7rem;
        margin-bottom: 0.5rem;
      }
      .crm_head .thumb img {
        height: 28px;
        margin-right: 12px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.13));
        transition: transform 0.3s ease;
      }
      .crm_head .thumb span {
        font-weight: 700;
        font-size: 1.13rem;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0,0,0,0.08);
      }
      .crm_body {
        padding: 1.5rem 1.2rem 1.2rem 1.2rem;
        background: #fff;
        border-radius: 0 0 16px 16px;
      }
      .crm_body h4 {
        font-size: 2rem;
        font-weight: 700;
        color: #22305a;
        margin-bottom: 0.5rem;
        text-align: center;
      }
      .crm_body p {
        color: #6c757d;
        font-size: 1rem;
        text-align: center;
        margin-bottom: 1.2rem;
      }
      .crm_body .btn {
        background: linear-gradient(45deg, #dc3545, #c82333);
        color: #fff;
        border: none;
        border-radius: 10px;
        padding: 0.7em 1.4em;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.18s, box-shadow 0.18s;
        box-shadow: 0 2px 8px 0 rgba(30, 42, 80, 0.08);
        width: 100%;
      }
      .crm_body .btn:hover {
        background: linear-gradient(45deg, #b91c1c, #a71d2a);
      }
    `;
    document.head.appendChild(style);
  }
}
