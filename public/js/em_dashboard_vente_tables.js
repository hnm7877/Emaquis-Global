// STYLE PROFESSIONNEL, SOBRE ET ÉLÉGANT POUR DASHBOARD VENTE TABLES
const dashboardVenteTablesStyle = `
  .vente_table_item {
    background: #fff;
    transition: box-shadow 0.18s, background 0.18s, transform 0.13s;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(30,42,80,0.06);
    cursor: pointer;
    position: relative;
    z-index: 1;
    border: 1px solid #f3f4f6;
  }
  .vente_table_item:nth-child(even) {
    background: #f7f8fa;
  }
  .vente_table_item:hover {
    background: #f1f5f9;
    box-shadow: 0 4px 16px rgba(30,42,80,0.10);
    transform: translateY(-2px) scale(1.01);
    z-index: 2;
    border-color: #e5e7eb;
  }
  .vente_table_item.active {
    background: #e5e7eb !important;
    box-shadow: 0 6px 24px rgba(30,42,80,0.13);
    color: #1e223a;
    font-weight: 600;
    border-left: 4px solid #23408e;
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
  .badge-primary, .badge-info {
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
  .btn-actions .btn {
    border-radius: 10px;
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    box-shadow: none;
    transition: background 0.13s, transform 0.11s;
    font-size: 1.12rem;
    border: none;
    outline: none;
    background: #fff;
    color: #23408e;
    position: relative;
    overflow: hidden;
  }
  .btn-actions .btn-success {
    color: #fff;
    background: #059669;
  }
  .btn-actions .btn-success:hover {
    background: #047857;
    color: #fff;
    box-shadow: 0 2px 8px #2e7d3211;
    transform: scale(1.08);
  }
  .btn-actions .btn-primary {
    color: #fff;
    background: #22305a;
  }
  .btn-actions .btn-primary:hover {
    background: #1e223a;
    color: #fff;
    box-shadow: 0 2px 8px #23408e11;
    transform: scale(1.08);
  }
  .btn-actions .btn-danger {
    color: #fff;
    background: #dc2626;
  }
  .btn-actions .btn-danger:hover {
    background: #b91c1c;
    color: #fff;
    box-shadow: 0 2px 8px #b91c1c11;
    transform: scale(1.08);
  }
  .btn-actions .btn:active {
    transform: scale(0.97);
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
  .alert-success, .alert-danger {
    border-radius: 12px;
    font-size: 1.04rem;
    font-weight: 600;
    box-shadow: 0 1px 4px #0001;
    margin-bottom: 1.1rem;
    border: 1.5px solid #e0e7eb;
    opacity: 0.98;
    letter-spacing: 0.01em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6em;
    background: #fff;
    color: #23408e;
  }
  .alert-success {
    border-left: 4px solid #059669;
    color: #059669;
  }
  .alert-danger {
    border-left: 4px solid #dc2626;
    color: #dc2626;
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
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLongTitle">
                Suppression d'une vente
              </h2>
              <button
                type="button"
                className="close close-modal"
                data-dismiss="modal"
                aria-label="Close"
                id="close-modal"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4> êtes vous sûr de vouloir supprimer la vente ?</h4>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger close-modal"
                onClick={handleUpdateVente}
                disabled={loading}
              >
                {loading ? "Annulation.." : "Oui"}
              </button>
              <button
                type="button"
                className="btn btn-success close-modal"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Non
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
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLongTitle">
                Commande confirmée avec succès
              </h2>
              <button
                type="button"
                className="close close-modal"
                data-dismiss="modal"
                aria-label="Close"
                id="close-modal"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4 className="text-center">Voulez-vous imprimer le ticket</h4>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger close-modal"
                onClick={handleClose}
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
              >
                Oui
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
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLongTitle">
                Confirmation de la vente table N°{vente.table_number}
              </h3>
              <button
                type="button"
                className="close close-modal"
                data-dismiss="modal"
                aria-label="Close"
                id="close-modal"
                onClick={() => handleClose()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>
                Prix:{" "}
                <b>
                  {vente.prix} {currency}
                </b>
              </h4>
              <input
                type="number"
                placeholder="Somme encaissé"
                className="form-control mb-1"
                value={sommeEncaisse || ""}
                onChange={(e) => setSommeEncaisse(e.target.value)}
              />
              <p>
                Monnaie à rendre:{" "}
                <b>
                  {vente.prix < sommeEncaisse ? sommeEncaisse - vente.prix : 0}{" "}
                  {currency}
                </b>
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success close-modal"
                onClick={handleUpdateVente}
                disabled={loading}
              >
                {loading ? "En cours.." : "Valider"}
              </button>
              <button
                type="button"
                className="btn btn-danger close-modal"
                data-dismiss="modal"
                onClick={() => handleClose()}
              >
                Fermer
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

  return (
    <React.Fragment>
      <div className={`col-xl-12 z-2 mt-${venteId ? "5" : "2"}`}>
        <div className="white_card mb_30 card_height_100 shadow-lg rounded-lg">
          <div className="white_card_header bg-gradient-primary text-white p-4 rounded-top">
            <div className="row align-items-center justify-content-between flex-wrap">
              <div className="col-lg-4">
                <div className="main-title">
                  <h3 className="m-0 text-white">
                    <i className="fas fa-clock mr-2"></i>
                    Commandes en attente
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="table-wrapper-scroll-y my-custom-scrollbar p-4">
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
