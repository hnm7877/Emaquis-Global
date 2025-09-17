const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { categorySelectedId, currentCategory } =
    React.useContext(ProductsContext);
  const [currentCategoryId, setCurrentCategoryId] = React.useState(null);
  const { products: allProducts } = React.useContext(AppContext);

  const containerRef = React.useRef(null);
  const categoriesContainerRef = React.useRef(null);
  const clickedCategoryRef = React.useRef(false);
  const timerRef = React.useRef(null);

  const subCategories =
    currentCategory && !!currentCategory.childs
      ? currentCategory.childs.map((item, index) => ({
          ...item,
          newId: (item.nom + index).split(" ").join(""),
        }))
      : [];

  const handleSelectCategory = (id) => {
    const container = containerRef.current;
    const category = document.querySelector(`#${id}`);
    if (category) {
      container.scrollTo({
        top: category.offsetTop - category.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    if (categorySelectedId === "tip") {
      (async () => {
        setLoading(true);
        const res = await fetch("/retourner-produit-valid");
        const data = await res.json();

        if (data.data) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })();
      return;
    }

    const prods = (allProducts || []).filter((prod) =>
      categorySelectedId === "formule"
        ? prod.promo
        : prod.produit.categorie._id === categorySelectedId
    );
    setProducts(prods);
  }, [categorySelectedId, allProducts]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || subCategories.length === 0) return;

    const handleScroll = () => {
      let closestId = null;
      let minDistance = Infinity;

      subCategories.forEach((child) => {
        const section = document.getElementById(`c${child.newId}`);
        if (section) {
          const rect = section.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const distance = Math.abs(rect.top - containerRect.top);
          if (distance < minDistance) {
            minDistance = distance;
            closestId = child.newId;
          }
        }
      });

      if (
        closestId !== null &&
        closestId !== currentCategoryId &&
        !clickedCategoryRef.current
      ) {
        const categoriesContainer = categoriesContainerRef.current;
        const category = document.querySelector(`#${closestId}`);
        if (category) {
          const scrollLeft =
            category.offsetLeft -
            categoriesContainer.offsetWidth / 2 +
            category.offsetWidth / 2;

          categoriesContainer.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          });
        }
        setCurrentCategoryId(closestId);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [subCategories, currentCategoryId]);

  React.useEffect(() => {
    if (subCategories.length > 0) {
      setCurrentCategoryId(subCategories[0].newId);
    }
  }, [currentCategory]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {subCategories.length > 0 && (
        <div
          id="categories-container"
          ref={categoriesContainerRef}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            gap: "15px",
            overflowX: "auto",
            padding: "15px 5px",
            scrollbarWidth: "thin",
            scrollbarColor: "#98ed58 #f0f0f0",
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f0f0f0",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#98ed58",
              borderRadius: "10px",
            },
          }}
        >
          {subCategories.map((child) => {
            const products = allProducts.filter(
              (prod) => prod.produit.categorie._id === child._id
            );
            if (products.length === 0) return null;

            return (
              <div
                id={child.newId}
                onClick={() => {
                  clickedCategoryRef.current = true;
                  clearTimeout(timerRef.current);

                  handleSelectCategory(`c${child.newId}`);
                  setCurrentCategoryId(child.newId);
                  timerRef.current = setTimeout(() => {
                    clickedCategoryRef.current = false;
                  }, 1000);
                }}
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: currentCategoryId === child.newId ? "#fff" : "#2c3e50",
                  textTransform: "capitalize",
                  textAlign: "center",
                  backgroundColor:
                    currentCategoryId === child.newId ? "#98ed58" : "#f8f9fa",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  flexShrink: 0,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {child.nom}
              </div>
            );
          })}
        </div>
      )}

      <div
        className="product-list"
        ref={containerRef}
        style={{
          width: "100%",
          padding: "20px 0",
        }}
      >
        <h4
          style={{
            fontSize: "1.8rem",
            color: "#2c3e50",
            marginBottom: "25px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Produits
        </h4>
        <div
          className="product-list__grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "10px",
            padding: "8px",
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          {loading && (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "40px",
                fontSize: "1.2rem",
                color: "#666",
              }}
            >
              Chargement...
            </div>
          )}
          {!loading &&
            products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
        </div>

        {subCategories.map((child) => {
          const products = allProducts.filter(
            (prod) => prod.produit.categorie._id === child._id
          );
          if (products.length === 0) return null;

          return (
            <div
              id={`c${child.newId}`}
              style={{
                marginTop: "40px",
                scrollMarginTop: "100px",
              }}
            >
              <h4
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#2c3e50",
                  textTransform: "capitalize",
                  textAlign: "center",
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                {child.nom}
              </h4>
              <div
                className="product-list__grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: "10px",
                  padding: "8px",
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0 auto",
                }}
              >
                {products.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addProductToCart } = React.useContext(ProductsContext);
  const { billet } = React.useContext(AppContext);
  const [isHovered, setIsHovered] = React.useState(false);

  // Récupération de la devise dynamique
  let currency = "";
  if (typeof window !== "undefined") {
    if (window.globalUser && window.PAYS) {
      const countryCode = window.globalUser.country || "cote_d_ivoire";
      const countryObj = window.PAYS.find((p) => p.code === countryCode);

      currency = countryObj ? countryObj.devise : "";
    }
    if (!currency) {
      console.warn("[WARN] Devise non trouvée, fallback sur 'FCFA'");
      currency = "XOF";
    }
  }

  return (
    <div
      className="product-card"
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        position: "relative",
        transform: isHovered ? "translateY(-3px)" : "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        {!product.is_cocktail && (
          <h4
            style={{
              backgroundColor: "#24d3f5",
              color: "#fff",
              padding: "3px 8px",
              borderRadius: "12px",
              fontSize: "0.7rem",
              margin: 0,
            }}
          >
            {product.taille}
          </h4>
        )}
        {product.promo && (
          <h4
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              padding: "3px 8px",
              borderRadius: "12px",
              fontSize: "0.7rem",
              margin: 0,
            }}
          >
            {product.promo_quantity} x {product.promo_price}
          </h4>
        )}
      </div>

      <div
        style={{
          position: "relative",
          paddingTop: "70%",
          overflow: "hidden",
        }}
      >
        <img
          src={product.produit.image}
          alt="product"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            padding: "5px",
          }}
        />
      </div>

      <div
        style={{
          padding: "10px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4
          style={{
            fontSize: "0.9rem",
            color: "#2c3e50",
            marginBottom: "6px",
            fontWeight: "600",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.produit.nom_produit}
        </h4>

        {!product.isReturnProduct && (
          <p
            style={{
              fontSize: "1rem",
              color: "#2c3e50",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >{`${product.prix_vente} ${currency}`}</p>
        )}

        {(product.quantite > 0 || product.is_cocktail) && (
          <p
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#666" }}>
              {product.isReturnProduct ? "Quantité" : "Stock"}:
            </span>
            <span
              style={{
                color:
                  product.quantite >= 100 || product.is_cocktail
                    ? "#27ae60"
                    : "#e74c3c",
                fontWeight: "600",
              }}
            >
              {product.is_cocktail ? "∞" : product.quantite}
            </span>
          </p>
        )}

        {product.isReturnProduct && (
          <p
            style={{
              color: "#666",
              marginBottom: "8px",
            }}
          >
            Expire: le {product.dateline}
          </p>
        )}

        {product.isReturnProduct && !!product.client_name && (
          <p
            style={{
              color: "#666",
              marginBottom: "8px",
            }}
          >
            Client: {product.client_name}
          </p>
        )}

        {product.isReturnProduct && !!product.client_name && (
          <p
            style={{
              color: "#666",
              marginBottom: "8px",
            }}
          >
            Code: {product.code}
          </p>
        )}
      </div>

      {!product.isReturnProduct && (
        <div
          onClick={() =>
            billet && !billet.is_closed ? addProductToCart(product) : null
          }
          style={{
            padding: "8px 10px",
            borderTop: "1px solid #eee",
            textAlign: "center",
            marginTop: "auto",
          }}
        >
          <button
            disabled={!billet || (billet && billet.is_closed)}
            style={{
              backgroundColor:
                billet && !billet.is_closed ? "#98ed58" : "#95a5a6",
              color: "#fff",
              border: "none",
              padding: "6px 15px",
              borderRadius: "15px",
              fontSize: "0.8rem",
              fontWeight: "600",
              cursor: billet && !billet.is_closed ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              width: "100%",
              "&:hover": {
                transform: billet && !billet.is_closed ? "scale(1.02)" : "none",
                boxShadow:
                  billet && !billet.is_closed
                    ? "0 2px 4px rgba(0,0,0,0.1)"
                    : "none",
              },
            }}
          >
            Ajouter
          </button>
        </div>
      )}

      {product.quantite === 0 && !product.is_cocktail && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <svg
            width="100%"
            viewBox="0 0 300 200"
            style={{ maxWidth: "220px", height: "auto", display: "block" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="stampGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="100%" stopColor="#cc0000" />
              </linearGradient>
              <pattern
                id="stampPattern"
                patternUnits="userSpaceOnUse"
                width="20"
                height="20"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="20"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </pattern>
              <filter
                id="roughEdges"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.05"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="3"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
            <rect
              x="30"
              y="30"
              width="240"
              height="140"
              rx="10"
              ry="10"
              fill="url(#stampGradient)"
              filter="url(#roughEdges)"
              stroke="#990000"
              strokeWidth="3"
              strokeDasharray="5,3"
            />
            <rect
              x="30"
              y="30"
              width="240"
              height="140"
              rx="10"
              ry="10"
              fill="url(#stampPattern)"
            />
            <text
              x="150"
              y="80"
              fontFamily="Impact, Arial Black, sans-serif"
              fontSize="40"
              fill="white"
              textAnchor="middle"
              stroke="#800000"
              strokeWidth="2"
            >
              STOCK
            </text>
            <text
              x="150"
              y="120"
              fontFamily="Impact, Arial Black, sans-serif"
              fontSize="40"
              fill="white"
              textAnchor="middle"
              stroke="#800000"
              strokeWidth="2"
            >
              EPUISE
            </text>
            <line
              x1="40"
              y1="40"
              x2="260"
              y2="160"
              stroke="white"
              strokeWidth="3"
              strokeOpacity="0.4"
              strokeDasharray="10,5"
            />
            <line
              x1="260"
              y1="40"
              x2="40"
              y2="160"
              stroke="white"
              strokeWidth="3"
              strokeOpacity="0.4"
              strokeDasharray="10,5"
            />
            <path
              d="M30 50 Q30 30 50 30 L250 30 Q270 30 270 50 L270 150 Q270 170 250 170 L50 170 Q30 170 30 150 Z"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="5,3"
              opacity="0.6"
            />
            <circle
              cx="50"
              cy="50"
              r="5"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <circle
              cx="250"
              cy="50"
              r="5"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <circle
              cx="50"
              cy="150"
              r="5"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <circle
              cx="250"
              cy="150"
              r="5"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <rect
              x="30"
              y="30"
              width="240"
              height="140"
              rx="10"
              ry="10"
              fill="white"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
      )}
    </div>
  );
};
