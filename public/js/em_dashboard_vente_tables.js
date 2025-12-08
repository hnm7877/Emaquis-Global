// STYLE PROFESSIONNEL, SOBRE ET ÉLÉGANT POUR DASHBOARD VENTE TABLES
const dashboardVenteTablesStyle = `
  .vente_table_item {
    background: #ffffff;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    position: relative;
    z-index: 1;
    border: 1px solid #e2e8f0;
    margin-bottom: 4px;
  }
  .vente_table_item:nth-child(even) {
    background: #f8fafc;
  }
  .vente_table_item:hover {
    background: #f1f5f9;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
    transform: translateY(-2px);
    z-index: 2;
    border-color: #cbd5e1;
  }
  .vente_table_item.active {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%) !important;
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.2);
    color: #1e293b;
    font-weight: 600;
    border-left: 4px solid #2563eb;
    transform: translateX(4px);
  }
  .table {
    border-radius: 16px;
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
  .badge-primary, .badge-info {
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
  .badge-primary:hover, .badge-info:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(67, 56, 202, 0.2);
  }
  .btn-actions .btn {
    border-radius: 10px;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1rem;
    border: none;
    outline: none;
    background: #ffffff;
    color: #64748b;
    position: relative;
    overflow: hidden;
  }
  .btn-actions .btn-success {
    color: #ffffff;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
  .btn-actions .btn-success:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    transform: translateY(-2px) scale(1.05);
  }
  .btn-actions .btn-primary {
    color: #ffffff;
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  }
  .btn-actions .btn-primary:hover {
    background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    transform: translateY(-2px) scale(1.05);
  }
  .btn-actions .btn-danger {
    color: #ffffff;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }
  .btn-actions .btn-danger:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    transform: translateY(-2px) scale(1.05);
  }
  .btn-actions .btn:active {
    transform: scale(0.95);
  }
  .btn-actions .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  .action-icon {
    width: 20px;
    height: 20px;
    filter: none;
    transition: transform 0.13s;
  }
  .btn-actions .btn:hover .action-icon {
    transform: scale(1.13);
  }
  .white_card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .white_card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .white_card_header {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
    color: #ffffff !important;
    border-radius: 16px 16px 0 0;
    box-shadow: none;
    padding: 1.5rem 2rem;
    margin-bottom: 0;
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
  }
  .main-title h3 i {
    font-size: 1.5rem;
    color: #ffffff;
  }
  .alert-success, .alert-danger {
    border-radius: 12px;
    font-size: 0.9375rem;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.25rem;
    border: none;
    opacity: 1;
    letter-spacing: 0.01em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75em;
    padding: 1rem 1.5rem;
    animation: slideDown 0.3s ease;
  }
  .alert-success {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    color: #065f46;
    border-left: 4px solid #10b981;
  }
  .alert-danger {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #991b1b;
    border-left: 4px solid #ef4444;
  }
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .my-custom-scrollbar {
    max-height: 60vh;
    overflow-x: auto;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #2563eb #f1f5f9;
    border-radius: 0 0 16px 16px;
    background: #f8fafc;
    padding: 1.5rem;
    -webkit-overflow-scrolling: touch;
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
  .vente-tables-responsive {
    overflow-x: auto;
  }
  .vente-tables-responsive table {
    min-width: 1000px;
  }
  @media (max-width: 1200px) {
    .vente-tables-responsive table {
      min-width: 900px;
    }
  }
  @media (max-width: 768px) {
    .my-custom-scrollbar {
      padding: 1rem;
      max-height: 50vh;
    }
    .vente-tables-responsive table {
      min-width: 800px;
    }
    .table th, .table td {
      padding: 0.75rem 0.5rem;
      font-size: 0.8125rem;
    }
    .table th {
      font-size: 0.75rem;
      padding: 0.875rem 0.5rem;
    }
    .btn-actions .btn {
      width: 32px;
      height: 32px;
      margin: 0 2px;
      font-size: 0.875rem;
    }
  }
  @media (max-width: 576px) {
    .my-custom-scrollbar {
      padding: 0.75rem;
      max-height: 45vh;
    }
    .vente-tables-responsive table {
      min-width: 750px;
    }
    .table th, .table td {
      padding: 0.625rem 0.375rem;
      font-size: 0.75rem;
    }
    .table th {
      font-size: 0.6875rem;
      padding: 0.75rem 0.375rem;
    }
    .btn-actions .btn {
      width: 28px;
      height: 28px;
      margin: 0 1px;
      font-size: 0.75rem;
    }
    .action-icon {
      width: 16px;
      height: 16px;
    }
  }
  .product-formule {
    color: #23408e;
    font-weight: 500;
    position: relative;
    padding-right: 4px;
  }
  .product-formule::after {
    content: '★';
    font-size: 0.8em;
    font-weight: 500;
    color: gold;
    position: absolute;
    right: -2px;
    top: -2px;
    font-size: 0.8em;
    color: #FFAA2B;
  }
`;

if (typeof window !== "undefined") {
  const oldStyle = document.getElementById("dashboardVenteTablesStyle");
  if (oldStyle) oldStyle.remove();
  if (!document.getElementById("dashboardVenteTablesStyle")) {
    const style = document.createElement("style");
    style.id = "dashboardVenteTablesStyle";
    style.innerHTML = dashboardVenteTablesStyle;
    document.head.appendChild(style);
  }
}

const TablesHead = () => {
  return (
    <thead className="bg-gradient-primary text-white">
      <tr>
        <th scope="col" className="py-3">
          Produit
        </th>
        <th scope="col" className="py-3">
          Quantité
        </th>
        <th scope="col" className="py-3">
          Prix
        </th>
        <th scope="col" className="py-3">
          Encaisse
        </th>
        <th scope="col" className="py-3">
          Monnaie
        </th>
        <th scope="col" className="py-3">
          Table
        </th>
        <th scope="col" className="py-3">
          Date
        </th>
        <th scope="col" className="py-3">
          Employé
        </th>
        <th scope="col" className="py-3">
          Action
        </th>
      </tr>
    </thead>
  );
};

const TablesItem = ({
  vente,
  setShowSuccess,
  setShowDanger,
  setVenteIdToDelete,
  setVenteToConfirm,
  venteToConfirm,
}) => {
  const [loading, setLoading] = React.useState({
    ["Validée"]: false,
    ["Annulée"]: false,
  });

  const { confirmVente } = React.useContext(AppContext);
  const { initCarts, venteId } = React.useContext(ProductsContext);

  // Récupération de la devise dynamique
  let currency = "";
  if (typeof window !== "undefined" && window.globalUser && window.PAYS) {
    const countryObj = window.PAYS.find(
      (p) => p.code === (window.globalUser.country || "cote_d_ivoire")
    );
    currency = countryObj ? countryObj.devise : "FCFA";
  }

  const handleSubmit = (venteId, type) => {
    if (type === "edit") {
      initCarts(vente);
      return;
    } else if (type === "Annulée") {
      $("#deleteVenteModal").modal("show");

      setVenteIdToDelete(venteId);
      return;
    } else if (!vente.amount_collected) {
      $("#collectedAmount").modal("show");

      setVenteToConfirm(vente);
      return;
    }

    setShowDanger(false);
    setShowSuccess(false);

    setLoading({
      ...loading,
      [type]: true,
    });

    fetch(`/vente/status/${venteId}`, {
      method: "POST",
      body: JSON.stringify({ type }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (data && data.etat === false && data.message) {
          alert(data.message);
          setLoading(false);
          return;
        }
        setShowSuccess(true);
        confirmVente(venteId, type);
        setLoading({
          ...loading,
          [type]: false,
        });

        setTimeout(() => {
          setShowSuccess(false);
          setVenteToConfirm(vente);
          $("#confirmOrder").modal("show");
        }, 500);
      })
      .catch((err) => {
        setShowDanger(true);
        setLoading({
          ...loading,
          [type]: false,
        });
      });
  };

  const produits = vente.produit.map((el, i) => {
    const isFormule =
      vente.formules &&
      vente.formules.find(
        (formule) =>
          formule.taille === el.taille &&
          formule.produit_name === el.produit.nom_produit
      );
    const isLast = i === vente.produit.length - 1;
    return (
      <React.Fragment key={el._id}>
        {isFormule ? (
          <span className="product-formule">{el.produit.nom_produit}</span>
        ) : (
          <span>{el.produit.nom_produit}</span>
        )}
        {!isLast && ","}
      </React.Fragment>
    );
  });

  return (
    <tr
      className={`vente_table_item hover-shadow transition-all duration-300${
        vente._id === venteId ||
        (venteToConfirm && vente._id === venteToConfirm._id)
          ? " active bg-light-blue"
          : ""
      }`}
    >
      <td className="py-3">{produits}</td>
      <td className="py-3">{vente.quantite.join(",")}</td>
      <td className="py-3 font-weight-bold">
        {vente.prix} {currency}
      </td>
      <td className="py-3">{vente.somme_encaisse}</td>
      <td className="py-3">{vente.monnaie}</td>
      <td className="py-3">
        <span className="badge badge-primary p-2">
          Table {vente.table_number}
        </span>
      </td>
      <td className="py-3">
        {new Date(vente.createdAt).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </td>
      <td className="py-3">
        <span className="badge badge-info p-2">
          {vente.employe.prenoms || vente.employe.prenom}
        </span>
      </td>

      <td className="btn-actions py-3">
        <button
          className="btn btn-success btn-sm mx-1 transition-transform hover-scale"
          disabled={loading["Validée"] || loading["Annulée"]}
          onClick={() => handleSubmit(vente._id, "Validée")}
        >
          <img src="/svgs/okcircle.svg" alt="valid" className="action-icon" />
        </button>
        <button
          className="btn btn-primary btn-sm mx-1 transition-transform hover-scale"
          onClick={() => handleSubmit(vente._id, "edit")}
        >
          <img src="/svgs/modifier.svg" alt="edit" className="action-icon" />
        </button>

        <button
          className="btn btn-danger btn-sm mx-1 transition-transform hover-scale"
          disabled={loading["Validée"] || loading["Annulée"]}
          onClick={() => handleSubmit(vente._id, "Annulée")}
        >
          <img src="/svgs/trash-b.svg" alt="cancel" className="action-icon" />
        </button>
      </td>
    </tr>
  );
};

const ModalDelete = ({
  venteIdToDelete,
  onClose,
  setShowSuccess,
  setShowDanger,
}) => {
  const [loading, setLoading] = React.useState(false);

  const { confirmVente } = React.useContext(AppContext);

  // Récupération de la devise dynamique
  let currency = "";
  if (typeof window !== "undefined" && window.globalUser && window.PAYS) {
    const countryObj = window.PAYS.find(
      (p) => p.code === (window.globalUser.country || "cote_d_ivoire")
    );
    currency = countryObj ? countryObj.devise : "FCFA";
  }

  const handleClose = () => {
    onClose();
    $("#deleteVenteModal").modal("hide");
  };

  const handleUpdateVente = () => {
    setLoading(true);
    fetch(`/vente/status/${venteIdToDelete}`, {
      method: "POST",
      body: JSON.stringify({ type: "Annulée" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (data && data.etat === false && data.message) {
          alert(data.message);
          setLoading(false);
          return;
        }
        setShowSuccess(true);
        confirmVente(venteIdToDelete, "Annulée");
        setLoading(false);

        setTimeout(() => {
          handleClose();
          setShowSuccess(false);
        }, 500);
      })
      .catch((err) => {
        setShowDanger(true);
        setLoading(false);
      });
  };

  return (
    <div
      className="modal fade"
      id="deleteVenteModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalTitle"
      data-backdrop="false"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: "600px",
        }}
        role="document"
      >
        {!!venteIdToDelete && (
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
                color: "white",
                borderBottom: "none",
                padding: "1.75rem 2rem",
              }}
            >
              <h2
                className="modal-title"
                id="exampleModalLongTitle"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <i className="fas fa-exclamation-triangle"></i>
                Suppression d'une vente
              </h2>
              <button
                type="button"
                className="close close-modal"
                data-dismiss="modal"
                aria-label="Close"
                id="close-modal"
                onClick={handleClose}
                style={{
                  color: "white",
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
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
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
                  }}
                >
                  <i
                    className="fas fa-trash-alt"
                    style={{ color: "#ef4444", fontSize: "1.25rem" }}
                  ></i>
                </div>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#0f172a",
                  }}
                >
                  Êtes-vous sûr de vouloir supprimer cette vente ?
                </h4>
              </div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.9375rem",
                  margin: 0,
                  paddingLeft: "64px",
                }}
              >
                Cette action est irréversible et la vente sera définitivement
                supprimée.
              </p>
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
                className="btn btn-success close-modal"
                data-dismiss="modal"
                onClick={handleClose}
                style={{
                  background:
                    "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  marginRight: "0.75rem",
                  transition: "all 0.2s ease",
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-danger close-modal"
                onClick={handleUpdateVente}
                disabled={loading}
                style={{
                  background: loading
                    ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
                    : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  transition: "all 0.2s ease",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <React.Fragment>
                    <i
                      className="fas fa-spinner fa-spin"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Suppression...
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <i
                      className="fas fa-trash-alt"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Oui, supprimer
                  </React.Fragment>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ModalConfirmOrder = ({ venteIdToConfirm, onClose }) => {
  const handleClose = () => {
    onClose();
    $("#confirmOrder").modal("hide");
  };

  // Récupération de la devise dynamique
  let currency = "";
  if (typeof window !== "undefined" && window.globalUser && window.PAYS) {
    const countryObj = window.PAYS.find(
      (p) => p.code === (window.globalUser.country || "cote_d_ivoire")
    );
    currency = countryObj ? countryObj.devise : "FCFA";
  }

  return (
    <div
      className="modal fade"
      id="confirmOrder"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalTitle"
      data-backdrop="false"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: "600px",
        }}
        role="document"
      >
        {!!venteIdToConfirm && (
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
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                borderBottom: "none",
                padding: "1.75rem 2rem",
              }}
            >
              <h2
                className="modal-title"
                id="exampleModalLongTitle"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <i className="fas fa-check-circle"></i>
                Commande confirmée avec succès
              </h2>
              <button
                type="button"
                className="close close-modal"
                data-dismiss="modal"
                aria-label="Close"
                id="close-modal"
                onClick={handleClose}
                style={{
                  color: "white",
                  opacity: "0.9",
                  fontSize: "1.75rem",
                  fontWeight: "300",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: "2.5rem 2rem",
                background: "#ffffff",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{
                    fontSize: "2.5rem",
                    color: "#10b981",
                  }}
                ></i>
              </div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#0f172a",
                  marginBottom: "0.5rem",
                }}
              >
                Voulez-vous imprimer le ticket ?
              </h4>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.9375rem",
                  margin: 0,
                }}
              >
                Vous pouvez imprimer le ticket de caisse pour cette commande.
              </p>
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
                className="btn btn-danger close-modal"
                onClick={handleClose}
                style={{
                  background:
                    "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  marginRight: "0.75rem",
                  transition: "all 0.2s ease",
                }}
              >
                Non
              </button>
              <a
                type="button"
                className="btn btn-success close-modal"
                data-dismiss="modal"
                onClick={handleClose}
                href={`/generate-ticket/${
                  venteIdToConfirm._id || venteIdToConfirm
                }`}
                target="_blank"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "all 0.2s ease",
                }}
              >
                <i className="fas fa-print" style={{ marginRight: "8px" }}></i>
                Oui, imprimer
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ModalCollectedAmount = ({ vente, onClose }) => {
  const [loading, setLoading] = React.useState(false);

  const { confirmVente } = React.useContext(AppContext);

  // Récupération de la devise dynamique
  let currency = "";
  if (typeof window !== "undefined" && window.globalUser && window.PAYS) {
    const countryObj = window.PAYS.find(
      (p) => p.code === (window.globalUser.country || "cote_d_ivoire")
    );
    currency = countryObj ? countryObj.devise : "FCFA";
  }

  const [sommeEncaisse, setSommeEncaisse] = React.useState("");

  const handleClose = (orderUpdated) => {
    onClose();
    $("#collectedAmount").modal("hide");

    if (orderUpdated) {
      $("#confirmOrder").modal("show");
    }

    setSommeEncaisse(null);
  };

  const handleUpdateVente = () => {
    if (sommeEncaisse < vente.prix) {
      alert("La somme encaissée doit être supérieure au prix de la vente");
      return;
    }

    // Construction du payload SANS doublon de clé
    const data = {
      produit: [...vente.produit.map((prod) => prod.productId)],
      quantite: [...vente.quantite],
      somme_encaisse: Number(sommeEncaisse),
      amount_collected: true,
      table_number: vente.table_number,
      update_for_collected_amount: true,
    };
    console.log(
      "[DEBUG] Payload envoyé à /editvente:",
      data,
      JSON.stringify(data)
    );

    setLoading(true);
    fetch(`/editvente/${vente._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.etat) {
          setLoading(false);
          confirmVente(vente._id, "Validée");
          handleClose(true);
        } else {
          alert("Une erreur est survenue");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Une erreur est survenue");
        setLoading(false);
      });
  };

  return (
    <div
      className="modal fade"
      id="collectedAmount"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalTitle"
      data-backdrop="false"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: "600px",
        }}
        role="document"
      >
        {!!vente && (
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
                color: "white",
                borderBottom: "none",
                padding: "1.75rem 2rem",
              }}
            >
              <h3
                className="modal-title"
                id="exampleModalLongTitle"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <i className="fas fa-cash-register"></i>
                Confirmation de la vente table N°{vente.table_number}
              </h3>
              <button
                type="button"
                className="close close-modal"
                data-dismiss="modal"
                aria-label="Close"
                id="close-modal"
                onClick={() => handleClose()}
                style={{
                  color: "white",
                  opacity: "0.9",
                  fontSize: "1.75rem",
                  fontWeight: "300",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: "2rem",
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                  border: "1px solid #bfdbfe",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "0.9375rem",
                      fontWeight: "500",
                    }}
                  >
                    Prix total:
                  </span>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1e40af",
                    }}
                  >
                    {vente.prix} {currency}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#0f172a",
                    fontWeight: "600",
                    fontSize: "0.9375rem",
                  }}
                >
                  Somme encaissée
                </label>
                <input
                  type="number"
                  placeholder="Entrez la somme encaissée"
                  className="form-control"
                  value={sommeEncaisse || ""}
                  onChange={(e) => setSommeEncaisse(e.target.value)}
                  style={{
                    padding: "0.875rem 1rem",
                    borderRadius: "10px",
                    border: "2px solid #e2e8f0",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#2563eb";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(37, 99, 235, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {sommeEncaisse && vente.prix < sommeEncaisse && (
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                    padding: "1rem 1.25rem",
                    borderRadius: "10px",
                    border: "1px solid #86efac",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#065f46",
                        fontSize: "0.9375rem",
                        fontWeight: "500",
                      }}
                    >
                      Monnaie à rendre:
                    </span>
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#059669",
                      }}
                    >
                      {sommeEncaisse - vente.prix} {currency}
                    </span>
                  </div>
                </div>
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
                className="btn btn-danger close-modal"
                data-dismiss="modal"
                onClick={() => handleClose()}
                style={{
                  background:
                    "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  marginRight: "0.75rem",
                  transition: "all 0.2s ease",
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-success close-modal"
                onClick={handleUpdateVente}
                disabled={
                  loading || !sommeEncaisse || sommeEncaisse < vente.prix
                }
                style={{
                  background:
                    loading || !sommeEncaisse || sommeEncaisse < vente.prix
                      ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
                      : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "#ffffff",
                  transition: "all 0.2s ease",
                  cursor:
                    loading || !sommeEncaisse || sommeEncaisse < vente.prix
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {loading ? (
                  <React.Fragment>
                    <i
                      className="fas fa-spinner fa-spin"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Validation...
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <i
                      className="fas fa-check"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Valider
                  </React.Fragment>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TablesBody = ({
  setShowSuccess,
  setShowDanger,
  setVenteIdToDelete,
  setVenteToConfirm,
  venteToConfirm,
}) => {
  const { ventes } = React.useContext(AppContext);

  return (
    <tbody>
      {ventes.map((vente) => {
        return (
          <TablesItem
            key={vente._id}
            vente={vente}
            setShowDanger={setShowDanger}
            setShowSuccess={setShowSuccess}
            setVenteIdToDelete={setVenteIdToDelete}
            setVenteToConfirm={setVenteToConfirm}
            venteToConfirm={venteToConfirm}
          />
        );
      })}
    </tbody>
  );
};

const EmDashboardVenteTables = () => {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showDanger, setShowDanger] = React.useState(false);
  const [venteIdToDelete, setVenteIdToDelete] = React.useState(null);
  const [venteToConfirm, setVenteToConfirm] = React.useState(null);
  const { venteId } = React.useContext(ProductsContext);
  const { ventes } = React.useContext(AppContext);

  return (
    <React.Fragment>
      <div
        className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 z-2 mt-${
          venteId ? "5" : "2"
        }`}
      >
        <div className="white_card mb_30 card_height_100 shadow-lg rounded-lg">
          <div className="white_card_header bg-gradient-primary text-white p-4 rounded-top">
            <div className="row align-items-center justify-content-between flex-wrap">
              <div className="col-lg-6 col-md-12 col-sm-12 mb-2 mb-lg-0">
                <div className="main-title">
                  <h3 className="m-0 text-white">
                    <i className="fas fa-clock mr-2"></i>
                    Commandes en attente
                  </h3>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 text-lg-right text-left">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(255, 255, 255, 0.2)",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  <i className="fas fa-list"></i>
                  {ventes.length} commande{ventes.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="table-wrapper-scroll-y my-custom-scrollbar p-4 vente-tables-responsive">
            {showSuccess && (
              <div
                className="alert alert-success animate__animated animate__fadeIn"
                role="alert"
                style={{
                  textAlign: "center",
                }}
                id="alert-success"
              >
                <i className="fas fa-check-circle mr-2"></i>
                Operation effectuée avec succès !
              </div>
            )}
            {showDanger && (
              <div
                className="alert alert-danger animate__animated animate__fadeIn"
                role="alert"
                style={{
                  textAlign: "center",
                }}
                id="alert-danger"
              >
                <i className="fas fa-exclamation-circle mr-2"></i>
                Echec de l'opération, veillez recommencer!
              </div>
            )}
            <table className="table table-hover table-bordered table-striped mb-9">
              <TablesHead />
              <TablesBody
                setShowDanger={setShowDanger}
                setShowSuccess={setShowSuccess}
                setVenteIdToDelete={setVenteIdToDelete}
                setVenteToConfirm={setVenteToConfirm}
                venteToConfirm={venteToConfirm}
              />
            </table>
          </div>
        </div>
      </div>
      <ModalDelete
        onClose={() => setVenteIdToDelete(null)}
        venteIdToDelete={venteIdToDelete}
        setShowDanger={setShowDanger}
        setShowSuccess={setShowSuccess}
      />
      <ModalCollectedAmount vente={venteToConfirm} onClose={() => {}} />
      <ModalConfirmOrder
        venteIdToConfirm={venteToConfirm}
        onClose={() => setVenteToConfirm(null)}
      />
    </React.Fragment>
  );
};

window.EmDashboardVenteTables = EmDashboardVenteTables;
