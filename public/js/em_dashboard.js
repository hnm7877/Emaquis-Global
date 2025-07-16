const AppRoot = () => {
  const [products, setProducts] = React.useState([]);
  const [totalVentes, setTotalVentes] = React.useState(0);
  const [totalEmployes, setTotalEmployes] = React.useState(0);
  const [ventes, setVentes] = React.useState([]);

  const [carts, setCarts] = React.useState([]);
  const [categorySelectedId, setCategorySelectedId] = React.useState(null);
  const [currentCategory, setCurrentCategory] = React.useState(null);
  const [venteId, setVenteId] = React.useState(null);
  const [venteSelected, setVenteSelected] = React.useState(null);
  const [productUnvailable, setProductUnvailable] = React.useState([]);
  const [billet, setBillet] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [currentTiming, setCurrentTiming] = React.useState(null);

  const handleSelectCategory = (id) => {
    setCategorySelectedId(id);
  };

  const handleSelectCurrentCategory = (category) => {
    setCurrentCategory(category);
  };

  React.useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log("connect");
      socket.on(`${user_travail_pour}-vente`, (data) => {
        const vente = data.vente;

        if (
          !vente.for_employe ||
          (vente.for_employe && vente.for_employe === globalUser._id)
        ) {
          $.notify("Vous avez une nouvelle commande !", "success");
        }

        let vente_exist = false;

        setVentes((prVentes) => {
          if (prVentes.find((v) => v._id === vente._id)) {
            vente_exist = true;
            return prVentes;
          }

          if (vente.for_employe && vente.for_employe !== globalUser._id) {
            return prVentes;
          }

          return [...prVentes, vente];
        });

        setProducts((prProducts) => {
          const newProducts = prProducts.map((product) => {
            const index = vente.produit.findIndex(
              (el) => el.productId === product._id
            );

            if (index !== -1) {
              const newProduct = { ...product };
              newProduct.quantite -= vente.quantite[index];
              return newProduct;
            } else {
              return product;
            }
          });

          return vente_exist ? prProducts : newProducts;
        });
      });

      socket.on(`${user_travail_pour}-edit-vente`, (data) => {
        const vente = data.vente;
        const allProducts = data.allProducts;

        setVentes((prVentes) => {
          const newVentes = prVentes.map((el) => {
            if (
              el._id === vente._id &&
              vente.for_employe &&
              vente.for_employe === globalUser._id
            ) {
              return vente;
            } else {
              return el;
            }
          });

          return newVentes;
        });

        setProducts((prProducts) => {
          const newProducts = prProducts.map((product) => {
            const index = allProducts.findIndex((el) => el.id === product._id);

            if (index !== -1) {
              const newProduct = { ...product };
              newProduct.quantite -= allProducts[index].quantite;
              return newProduct;
            } else {
              return product;
            }
          });

          return newProducts;
        });
      });

      socket.on(`${user_travail_pour}-update-product`, (data) => {
        // setVentesByDay(data);

        setProducts((prProducts) => {
          const newProducts = prProducts.map((product) => {
            if (product._id === data.product.produitId) {
              return { ...product, quantite: data.product.quantite };
            }

            return product;
          });

          return newProducts;
        });
      });

      socket.on(`${user_travail_pour}-current-time`, (data) => {
        console.log("current-time", data);
        setCurrentTiming(data);
      });
    });
  }, []);

  React.useEffect(() => {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }, []);

  React.useEffect(() => {
    setProducts(globalProducts);
    setTotalVentes(Number(sumVentes));
    setTotalEmployes(Number(sumEmployes));
    setVentes(globalVentes);
    console.log("[DEBUG] globalBillet injecté:", globalBillet);
    setBillet(globalBillet);
    setUser(globalUser);
    setCurrentTiming(globalCurrentTiming);
  }, []);

  const updateTotalVentes = (total) => {
    setTotalVentes((prTotal) => Number(prTotal) + Number(total));
  };

  const resetTotalVentes = () => {
    setTotalVentes(0);
  };
  const confirmVente = (venteId, type) => {
    const vente = ventes.find((el) => el._id === venteId);

    if (
      type === "Validée" &&
      new Date(vente.createdAt).toLocaleDateString() >=
        new Date(billet.open_hour).toLocaleDateString()
    ) {
      const total = vente.prix;

      updateTotalVentes(total);
    } else if (type === "Annulée") {
      setProducts((prProducts) => {
        const newProducts = prProducts.map((product) => {
          const index = vente.produit.findIndex(
            (el) => el.productId === product._id
          );

          if (index !== -1) {
            const newProduct = { ...product };
            newProduct.quantite += vente.quantite[index];
            return newProduct;
          } else {
            return product;
          }
        });

        return newProducts;
      });
    }

    const newVentes = ventes.filter((el) => el._id !== venteId);

    setVentes(newVentes);
  };

  const addProductToCart = (product) => {
    if (product.quantite <= 0 && !product.is_cocktail) {
      return;
    }

    const cartItem = carts.find((cart) => cart._id === product._id);

    if (cartItem) {
      const qty = cartItem.quantity - (cartItem.quantity_already_sold || 0);

      if (
        !product.is_cocktail &&
        (qty + 1 > product.quantite ||
          (categorySelectedId === "formule" &&
            qty + cartItem.promo_quantity > product.quantite))
      ) {
        alert("Vous ne pouvez pas ajouter plus de produits que le stock");
        return;
      }

      if (categorySelectedId === "formule") {
        cartItem.quantity += cartItem.promo_quantity;
      } else {
        cartItem.quantity++;
      }

      setCarts([...carts]);
    } else {
      setCarts([
        ...carts,
        {
          ...product,
          quantity:
            categorySelectedId === "formule" ? product.promo_quantity : 1,
        },
      ]);
    }
  };

  const removeProductFromCart = (product) => {
    const cartItem = carts.find((cart) => cart._id === product._id);
    if (cartItem) {
      setCarts([...carts].filter((cart) => cart._id !== product._id));
    }
  };

  const updateProductQuantity = (product, quantity) => {
    const cartItem = carts.find((cart) => cart._id === product._id);
    if (cartItem) {
      if (!product.is_cocktail && quantity > product.quantite) {
        alert("Vous ne pouvez pas ajouter plus de produits que le stock");
        return;
      }

      cartItem.quantity = quantity;
      setCarts([...carts]);
    } else {
      setCarts([...carts, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateProductQuantity = (product, type) => {
    const cartItem = carts.find((cart) => cart._id === product._id);

    if (cartItem) {
      if (type === "decr" && cartItem.quantity > 1) {
        cartItem.quantity--;
      } else if (type === "incr") {
        cartItem.quantity++;
      } else if (type === "decr" && cartItem.quantity === 1) {
        removeProductFromCart(cartItem);
        return;
      }

      setCarts([...carts]);
    }
  };

  const clearCarts = () => {
    setCarts([]);
    setVenteId(null);
  };

  const initCarts = (vente) => {
    const carts = [];

    vente.produit.forEach((product, index) => {
      const prProduct = products.find((el) => el._id === product.productId);
      if (prProduct) {
        product.quantite = prProduct.quantite;
      }
      carts.push({
        ...product,
        quantity: vente.quantite[index],
        quantity_already_sold: vente.quantite[index],
        is_cocktail: product.taille === "c",
        _id: product.productId,
      });
    });

    setVenteId(vente._id);
    setVenteSelected(vente);
    setCarts(carts);
  };

  const initProductsUnvailable = (products) => {
    setProductUnvailable(products);
  };

  const updateBillet = (billet) => {
    setBillet(billet);
  };

  const resetProductsUnvailable = () => {
    setProductUnvailable([]);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        totalVentes,
        totalEmployes,
        ventes,
        confirmVente,
        billet,
        updateBillet,
        user,
        resetTotalVentes,
        currentTiming,
      }}
    >
      <ProductsContext.Provider
        value={{
          carts,
          setCarts,
          addProductToCart,
          removeProductFromCart,
          updateProductQuantity,
          categorySelectedId,
          handleSelectCategory,
          handleUpdateProductQuantity,
          clearCarts,
          initCarts,
          handleSelectCurrentCategory,
          currentCategory,
          venteId,
          productUnvailable,
          initProductsUnvailable,
          resetProductsUnvailable,
          venteSelected,
        }}
      >
        <React.Fragment>
          <VenteRoot />
          <EmDashboardBody />
          <ModalUnvailableProducts />
        </React.Fragment>
      </ProductsContext.Provider>
    </AppContext.Provider>
  );
};

const ModalUnvailableProducts = () => {
  const { resetProductsUnvailable, productUnvailable } =
    React.useContext(ProductsContext);

  const handleClose = () => {
    resetProductsUnvailable();
    $("#productUnvailableModal").modal("hide");
  };

  return (
    <div
      class="modal fade"
      id="productUnvailableModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalTitle"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: "600px",
        }}
        role="document"
      >
        <div
          class="modal-content"
          style={{
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "none",
            overflow: "hidden",
          }}
        >
          <div
            class="modal-header"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              color: "white",
              borderBottom: "none",
              padding: "1.5rem",
            }}
          >
            <h2
              class="modal-title"
              id="exampleModalLongTitle"
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <i
                className="fas fa-exclamation-circle"
                style={{ color: "#fff" }}
              ></i>
              Produits non disponibles
            </h2>
            <button
              type="button"
              class="close close-modal"
              data-dismiss="modal"
              aria-label="Close"
              id="close-modal"
              style={{
                color: "white",
                opacity: "0.8",
                transition: "opacity 0.2s",
                "&:hover": {
                  opacity: "1",
                },
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            class="modal-body"
            style={{
              padding: "2rem",
              maxHeight: "60vh",
              overflowY: "auto",
            }}
          >
            {productUnvailable && productUnvailable.length > 0 ? (
              <div
                className="product-list"
                style={{
                  display: "grid",
                  gap: "1rem",
                }}
              >
                {productUnvailable.map((el, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#f8fafc",
                      padding: "1rem",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <i className="fas fa-box" style={{ color: "#6366f1" }}></i>
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.1rem",
                          color: "#1e293b",
                          fontWeight: "500",
                        }}
                      >
                        {el.nom_produit}
                      </h3>
                      <p
                        style={{
                          margin: "0.5rem 0 0",
                          color: "#64748b",
                          fontSize: "0.9rem",
                        }}
                      >
                        Taille: {el.taille} | Quantité restante: {el.quantite}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#64748b",
                }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{
                    fontSize: "3rem",
                    color: "#10b981",
                    marginBottom: "1rem",
                  }}
                ></i>
                <p>Tous les produits sont disponibles</p>
              </div>
            )}
          </div>

          <div
            class="modal-footer"
            style={{
              borderTop: "1px solid #e2e8f0",
              padding: "1.5rem",
            }}
          >
            <button
              type="button"
              class="btn btn-success close-modal"
              data-dismiss="modal"
              onClick={handleClose}
              style={{
                background: "#10b981",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                fontWeight: "500",
                transition: "all 0.2s",
                "&:hover": {
                  background: "#059669",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <i className="fas fa-check" style={{ marginRight: "8px" }}></i>
              Compris
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<AppRoot />, document.getElementById("root"));
