const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  const {
    categorySelectedId,
    handleSelectCategory,
    handleSelectCurrentCategory,
  } = React.useContext(ProductsContext);

  const { products: allProducts, user } = React.useContext(AppContext);

  // Fonction pour obtenir l'icône appropriée selon le nom de la catégorie
  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes("boisson")) return "fas fa-glass-martini-alt";
    if (name.includes("nourriture") || name.includes("aliment"))
      return "fas fa-utensils";
    if (name.includes("dessert")) return "fas fa-ice-cream";
    if (name.includes("snack")) return "fas fa-cookie";
    if (name.includes("menu")) return "fas fa-concierge-bell";
    if (name.includes("promo")) return "fas fa-percentage";
    if (name.includes("spécial")) return "fas fa-star";
    return "fas fa-tag"; // icône par défaut
  };

  React.useEffect(() => {
    const cats = globalCategories;
    if (cats.length > 0) {
      handleSelectCategory(cats[0]._id);
      setCategories(cats);
      handleSelectCurrentCategory(cats[0]);
    }
  }, []);

  return (
    <div className="categories-container">
      <h4 className="categories-title">
        <i className="fas fa-th-large"></i> Catégories
      </h4>
      <div className="categories-scroll-container">
        <ul className="categories-list">
          {user && user.product_return_type === "tip" && (
            <li
              className={`category-item ${
                categorySelectedId === "tip" ? "active" : ""
              }`}
              onClick={() => handleSelectCategory("tip")}
            >
              <i className="fas fa-tags"></i>
              <span>Avoirs</span>
            </li>
          )}

          {!!allProducts.some((prod) => prod.promo) && (
            <li
              className={`category-item ${
                categorySelectedId === "formule" ? "active" : ""
              }`}
              onClick={() => handleSelectCategory("formule")}
            >
              <i className="fas fa-gift"></i>
              <span>Formules</span>
            </li>
          )}

          {categories.map((category) => {
            if (
              allProducts.filter(
                (prod) =>
                  prod.produit.categorie._id === category._id ||
                  (category.childs &&
                    category.childs.find(
                      (c) => c._id === prod.produit.categorie._id
                    ))
              ).length === 0
            )
              return null;

            return (
              <li
                key={category._id}
                className={`category-item ${
                  categorySelectedId === category._id ? "active" : ""
                }`}
                onClick={() => {
                  handleSelectCategory(category._id);
                  handleSelectCurrentCategory(category);
                }}
              >
                <i className={getCategoryIcon(category.nom)}></i>
                <span>{category.nom}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        .categories-container {
          background: #ffffff;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 4px 16px rgba(166, 247, 91, 0.1);
          transition: box-shadow 0.3s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .categories-title {
          color: #222;
          font-size: 1.6rem;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          font-weight: 700;
        }

        .categories-title i {
          color: #a6f75b;
          font-size: 1.4em;
        }

        .categories-scroll-container {
          flex: 1;
          overflow-y: auto;
          padding-right: 10px;
          max-height: 400px;
          scrollbar-width: thin;
          scrollbar-color: #222 #f0f0f0;
        }
        .categories-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .categories-scroll-container::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 6px;
        }
        .categories-scroll-container::-webkit-scrollbar-thumb {
          background-color: #a6f75b;
          border-radius: 6px;
        }

        .categories-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          margin: 10px 0;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 2, 0.6, 1);
          color: #34495e;
          background: #f8f9fa;
          font-size: 1.08rem;
          font-weight: 500;
          outline: none;
          border: none;
          box-shadow: 0 1px 2px rgba(166, 247, 91, 0.04);
          position: relative;
        }

        .category-item:hover {
          background: #eaffd2;
          color: #222;
          box-shadow: 0 4px 12px rgba(166, 247, 91, 0.13);
          transform: translateY(-2px) scale(1.03);
        }

        .category-item:focus {
          box-shadow: 0 0 0 3px #a6f75b55;
        }

        .category-item.active {
          background: #a6f75b;
          color: #fff;
          box-shadow: 0 2px 8px rgba(166, 247, 91, 0.18);
          font-weight: 700;
        }

        .category-item i {
          font-size: 1.25rem;
          transition: transform 0.3s cubic-bezier(0.4, 2, 0.6, 1);
          width: 24px;
          text-align: center;
        }
        .category-item:hover i {
          transform: scale(1.18) rotate(-8deg);
        }
        .category-item.active i {
          color: #fff;
        }

        .category-item span {
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .category-item {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
