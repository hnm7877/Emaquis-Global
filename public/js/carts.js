const CartList = () => {
  const { carts } = React.useContext(ProductsContext);

  return (
    <div
      className="carts"
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "20px 0",
        maxWidth: "350px",
        maxHeight: "590px",
        overflowY: "auto",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h4
        style={{
          color: "#2c3e50",
          fontSize: "1.5rem",
          marginBottom: "20px",
          borderBottom: "2px solid #3498db",
          paddingBottom: "10px",
          width: "100%",
          textAlign: "left",
        }}
      >
        Panier
      </h4>
      {carts.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "320px",
              margin: "0 auto 10px auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* SVG animé de la femme assoupie au bar */}
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 400 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="0" width="400" height="300" fill="#FFFFFF" />
              <rect x="50" y="180" width="300" height="20" fill="#8d6e63" />
              <rect x="50" y="200" width="300" height="80" fill="#6d4c41" />
              <circle cx="150" cy="130" r="30" fill="#ffdbac">
                <animate
                  attributeName="cy"
                  values="130;128;130"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <path d="M120 130 Q150 90 180 130" fill="#5d4037" />
              <rect x="120" y="130" width="60" height="40" fill="#5d4037" />
              <rect x="135" y="160" width="30" height="50" fill="#78909c">
                <animate
                  attributeName="y"
                  values="160;158;160"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="125" y="165" width="10" height="40" fill="#ffdbac">
                <animate
                  attributeName="y"
                  values="165;167;165"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="165" y="165" width="10" height="40" fill="#ffdbac">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 165 185; 5 165 185; 0 165 185"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </rect>
              <g>
                <line
                  x1="140"
                  y1="125"
                  x2="145"
                  y2="125"
                  stroke="black"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="x1"
                    values="140;138;140;142;140"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    values="145;143;145;147;145"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="155"
                  y1="125"
                  x2="160"
                  y2="125"
                  stroke="black"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="x1"
                    values="155;153;155;157;155"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    values="160;158;160;162;160"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </line>
              </g>
              <path
                d="M140 145 Q150 135 160 145"
                fill="none"
                stroke="black"
                strokeWidth="2"
              >
                <animate
                  attributeName="d"
                  values="M140 145 Q150 135 160 145;M140 145 Q150 140 160 145;M140 145 Q150 150 160 145;M140 145 Q150 140 160 145;M140 145 Q150 135 160 145"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </path>
              <g>
                <rect
                  x="250"
                  y="160"
                  width="20"
                  height="40"
                  fill="#e0e0e0"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;0.4;0.7"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="255" y="160" width="10" height="40" fill="#f5f5f5">
                  <animate
                    attributeName="width"
                    values="10;8;10"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>
              <path
                d="M190 100 Q220 80 250 100 Q260 120 240 130 Q220 140 190 120 Z"
                fill="white"
                opacity="0.8"
              >
                <animate
                  attributeName="opacity"
                  values="0.8;0.6;0.8"
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1;1.02;1"
                  dur="3s"
                  repeatCount="indefinite"
                  additive="sum"
                />
              </path>
              {/* <text
                x="220"
                y="115"
                fontFamily="Arial"
                fontSize="33"
                textAnchor="middle"
                fill="#333"
              >
                Où sont les clients?
                <animate
                  attributeName="opacity"
                  values="1;0.8;1"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </text> */}
              <rect x="70" y="50" width="260" height="20" fill="#8d6e63" />
              <g>
                <rect x="80" y="70" width="20" height="40" fill="#4caf50">
                  <animate
                    attributeName="opacity"
                    values="1;0.7;1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="120" y="70" width="20" height="40" fill="#f44336">
                  <animate
                    attributeName="opacity"
                    values="1;0.7;1"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="160" y="70" width="20" height="40" fill="#2196f3">
                  <animate
                    attributeName="opacity"
                    values="1;0.7;1"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="200" y="70" width="20" height="40" fill="#ffeb3b">
                  <animate
                    attributeName="opacity"
                    values="1;0.7;1"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="240" y="70" width="20" height="40" fill="#9c27b0">
                  <animate
                    attributeName="opacity"
                    values="1;0.7;1"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="280" y="70" width="20" height="40" fill="#000000">
                  <animate
                    attributeName="opacity"
                    values="1;0.7;1"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>
              <circle
                cx="350"
                cy="80"
                r="20"
                fill="white"
                stroke="#333"
                strokeWidth="2"
              />
              <line
                x1="350"
                y1="80"
                x2="350"
                y2="70"
                stroke="#333"
                strokeWidth="2"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 350 80"
                  to="360 350 80"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </line>
              <line
                x1="350"
                y1="80"
                x2="350"
                y2="65"
                stroke="#333"
                strokeWidth="3"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 350 80"
                  to="360 350 80"
                  dur="120s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          </div>
        </div>
      ) : (
        <div
          className="carts-list"
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {carts.map((product) => {
            return <CartItem key={product._id} product={product} />;
          })}
        </div>
      )}
      <CartFooter />
      <style>{`
				@media (max-width: 900px) {
					.carts {
						max-width: 95vw !important;
						padding: 12px !important;
					}
				}
				@media (max-width: 600px) {
					.carts {
						max-width: 100vw !important;
						border-radius: 0 !important;
						box-shadow: none !important;
						padding: 6px !important;
					}
					.carts-list {
						padding: 0 !important;
					}
					.cart-item {
						padding: 8px !important;
						margin-bottom: 8px !important;
					}
					.carts-footer {
						padding: 10px !important;
					}
				}
			`}</style>
    </div>
  );
};

const CartItem = ({ product }) => {
  const {
    handleUpdateProductQuantity,
    updateProductQuantity,
    removeProductFromCart,
  } = React.useContext(ProductsContext);

  const quantity = product.quantity;
  return (
    <div
      className="cart-item"
      style={{
        background: "#f8f9fa",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }}
    >
      <div
        className="cart-item__details"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <img
          src={product.produit.image}
          alt="product"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <div>
          <h6
            style={{
              color: "#2c3e50",
              fontSize: "1.1rem",
              marginBottom: "5px",
            }}
          >
            {quantity}x {product.produit.nom_produit}{" "}
            {!product.is_cocktail && product.taille}{" "}
            {product.promo && product.promo_quantity <= quantity && (
              <p
                className="badge formule"
                style={{
                  background: "#e74c3c",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  display: "inline-block",
                  marginLeft: "5px",
                }}
              >
                F
              </p>
            )}
          </h6>
          <p
            style={{
              color: "#27ae60",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {product.prix_vente} FCFA
          </p>
        </div>
      </div>
      <div
        className="cart-item__actions"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button
          className="btn btn-danger decr"
          onClick={() => handleUpdateProductQuantity(product, "decr")}
          style={{
            background: "#e74c3c",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "#c0392b",
            },
          }}
        >
          -
        </button>

        <span
          className="quantity"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const value =
              Number(e.target.innerText) - (product.quantity_already_sold || 0);
            if (Number(e.target.innerText) > 0)
              updateProductQuantity(product, value);
          }}
          style={{
            padding: "5px 15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            minWidth: "50px",
            textAlign: "center",
          }}
        >
          {quantity}
        </span>
        <button
          className="btn btn-valider incr"
          onClick={() => handleUpdateProductQuantity(product, "incr")}
          disabled={
            !product.is_cocktail &&
            product.quantite <=
              product.quantity - (product.quantity_already_sold || 0)
          }
          style={{
            background: "#2ecc71",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "#27ae60",
            },
            "&:disabled": {
              background: "#95a5a6",
              cursor: "not-allowed",
            },
          }}
        >
          +
        </button>
      </div>
      <button
        className="btn btn-danger w-100 mt-1"
        onClick={() => removeProductFromCart(product)}
        style={{
          background: "#e74c3c",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            background: "#c0392b",
          },
        }}
      >
        <i className="fas fa-trash-alt" style={{ marginRight: "5px" }}></i>
        supprimer
      </button>
    </div>
  );
};

const CartFooter = () => {
  const { carts, clearCarts, venteId, initProductsUnvailable, venteSelected } =
    React.useContext(ProductsContext);
  const { user } = React.useContext(AppContext);
  const [sommeEncaisse, setSommeEncaisse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [collectedLater, setCollectedLater] = React.useState(false);
  const [tableNumber, setTableNumber] = React.useState(null);
  const [offered, setOffered] = React.useState(false);

  const total = carts.reduce((acc, produit) => {
    let quantity;
    let promo_quantity = 0;

    if (produit.promo && produit.promo_quantity <= produit.quantity) {
      promo_quantity = parseInt(produit.quantity / produit.promo_quantity);
    }

    if (promo_quantity) {
      quantity = produit.quantity % produit.promo_quantity;
    } else {
      quantity = produit.quantity;
    }

    return (
      acc + produit.prix_vente * quantity + produit.promo_price * promo_quantity
    );
  }, 0);

  const handleChangeCollectedLater = (e) => {
    if (e.target.checked) {
      setTableNumber(null);
    }

    setCollectedLater(e.target.checked);
  };

  const handleSubmit = () => {
    if (loading) return;

    const vente = {
      produit: carts.map((prod) => prod._id),
      quantite: carts.map((prod) => prod.quantity),
      somme_encaisse:
        globalUser.hasOffer && offered ? 0 : Number(sommeEncaisse),
      amount_collected:
        collectedLater && !(vente && vente.offered) ? false : true,
      table_number: globalUser.hasOffer && offered ? null : tableNumber,
      for_employe: user._id,
      offered: globalUser.hasOffer && offered,
    };

    if (collectedLater && !tableNumber && !(vente && vente.offered)) {
      return alert("Veuillez saisir le numéro de table");
    }

    if (!vente.somme_encaisse && !collectedLater && !(vente && vente.offered))
      return alert("Veuillez saisir la somme encaissée");

    if (
      vente.somme_encaisse < total &&
      !collectedLater &&
      !(vente && vente.offered)
    )
      return alert("La somme encaissée est insuffisante");

    setLoading(true);

    fetch(venteId ? `/editvente/${venteId}` : "/vente", {
      method: venteId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vente),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.product_unavailables) {
          setLoading(false);
          initProductsUnvailable(data.product_unavailables);
          $("#productUnvailableModal").modal("show");
        } else if (data.etat) {
          clearCarts();
          setSommeEncaisse(0);
          setCollectedLater(false);
          setTableNumber(null);
          setLoading(false);
        } else {
          alert("Une erreur est survenue: " + data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Une erreur est survenue");
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (venteSelected) {
      setCollectedLater(!venteSelected.amount_collected);
      setSommeEncaisse(venteSelected.somme_encaisse || 0);
      setTableNumber(venteSelected.table_number || null);
    }
  }, [venteSelected]);

  return (
    <div
      className="carts-footer"
      style={{
        marginTop: "12px",
        padding: "12px 10px",
        background: "#f8f9fa",
        borderRadius: "8px",
        maxWidth: "310px",
        width: "95%",
        boxSizing: "border-box",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {globalUser.hasOffer && (
        <div
          className="form-check"
          style={{
            marginBottom: "10px",
          }}
        >
          <input
            className="form-check-input"
            checked={offered}
            onChange={() => setOffered(!offered)}
            type="checkbox"
            value=""
            id="flexCheckDefault"
            style={{
              width: "16px",
              height: "16px",
              marginRight: "8px",
            }}
          />
          <p
            className="form-check-label"
            style={{
              color: "#2c3e50",
              fontSize: "1rem",
            }}
          >
            Offert
          </p>
        </div>
      )}

      {!offered && (
        <React.Fragment>
          <div
            className="form-check"
            style={{
              marginBottom: "10px",
            }}
          >
            <input
              className="form-check-input"
              checked={collectedLater}
              onChange={handleChangeCollectedLater}
              type="checkbox"
              value=""
              id="flexCheckDefault"
              style={{
                width: "16px",
                height: "16px",
                marginRight: "8px",
              }}
            />
            <p
              className="form-check-label"
              style={{
                color: "#2c3e50",
                fontSize: "1rem",
              }}
            >
              Encaisser plus tard
            </p>
          </div>

          <h4
            style={{
              color: "#2c3e50",
              fontSize: "1.2rem",
              marginBottom: "10px",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Total: {total} FCFA
          </h4>
          {!collectedLater && (
            <input
              type="number"
              placeholder="Somme encaissé"
              className="form-control mb-2"
              value={sommeEncaisse}
              onChange={(e) => setSommeEncaisse(e.target.value)}
              style={{
                padding: "7px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                width: "100%",
                fontSize: "1rem",
              }}
            />
          )}

          {collectedLater && (
            <input
              type="number"
              placeholder="Numéro de table"
              className="form-control mb-2"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              style={{
                padding: "7px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                width: "100%",
                fontSize: "1rem",
              }}
            />
          )}
        </React.Fragment>
      )}

      <button
        onClick={handleSubmit}
        className="btn btn-valider"
        disabled={loading || carts.length === 0}
        style={{
          background: "#3498db",
          color: "white",
          border: "none",
          padding: "9px 0",
          borderRadius: "4px",
          width: "100%",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontWeight: 600,
          marginTop: "8px",
          "&:hover": {
            background: "#2980b9",
          },
          "&:disabled": {
            background: "#95a5a6",
            cursor: "not-allowed",
          },
        }}
      >
        {loading ? (
          <span>
            <i
              className="fas fa-spinner fa-spin"
              style={{ marginRight: "5px" }}
            ></i>
            En cours...
          </span>
        ) : (
          <span>
            <i
              className={`fas ${venteId ? "fa-edit" : "fa-check"}`}
              style={{ marginRight: "5px" }}
            ></i>
            {venteId ? "Modifier" : "Valider"}
          </span>
        )}
      </button>
      {venteId && (
        <button
          className="btn btn-danger mt-2"
          onClick={clearCarts}
          style={{
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "9px 0",
            borderRadius: "4px",
            width: "100%",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontWeight: 600,
            marginTop: "8px",
            "&:hover": {
              background: "#c0392b",
            },
          }}
        >
          <i className="fas fa-times" style={{ marginRight: "5px" }}></i>
          Annuler la modification
        </button>
      )}
    </div>
  );
};
