const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { categorySelectedId, currentCategory } = React.useContext(ProductsContext);
  const [currentCategoryId, setCurrentCategoryId] = React.useState(null);
  const { products: allProducts } = React.useContext(AppContext);

  const containerRef = React.useRef(null);
  const categoriesContainerRef = React.useRef(null);
  const clickedCategoryRef = React.useRef(false);
  const timerRef = React.useRef(null);

 const subCategories = currentCategory && !!currentCategory.childs ? currentCategory.childs.map((item, index)=>({...item, newId: (item.nom + index).split(' ').join('')})) : [];


  const handleSelectCategory = (id) => {
    const container = containerRef.current;
    const category = document.querySelector(`#${id}`);
    if(category){
     container.scrollTo({
      top: category.offsetTop - category.offsetHeight,
      behavior: 'smooth'
     });
    }
  };

  React.useEffect(() => {
    if (categorySelectedId === 'tip') {
      (async () => {
        setLoading(true);
        const res = await fetch('/retourner-produit-valid');
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
      categorySelectedId === 'formule'
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

      if (closestId !== null && closestId !== currentCategoryId && !clickedCategoryRef.current) {
        const categoriesContainer = categoriesContainerRef.current;
        const category = document.querySelector(`#${closestId}`);
        if(category){
          const scrollLeft =
            category.offsetLeft
            - categoriesContainer.offsetWidth / 2
            + category.offsetWidth / 2;

          categoriesContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
        setCurrentCategoryId(closestId);
      }
    };

   

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [subCategories, currentCategoryId]);



  React.useEffect(()=>{
   if(subCategories.length > 0){
    setCurrentCategoryId(subCategories[0].newId);
   }
  },[currentCategory])

  return (
   <div style={{width:'60%'}}>
     {subCategories.length > 0 && <div id='categories-container' ref={categoriesContainerRef} style={{display:'flex', flexDirection:'row', flexWrap:'nowrap', gap:10, overflowX:'auto'}}>
        {subCategories.map((child)=>{
            const products = allProducts.filter((prod)=>prod.produit.categorie._id === child._id);
            if(products.length === 0) return null;

            return <div
              id={child.newId}
              onClick={()=>{
                clickedCategoryRef.current = true;
                clearTimeout(timerRef.current);

                handleSelectCategory(`c${child.newId}`);
                setCurrentCategoryId(child.newId);
                timerRef.current = setTimeout(()=>{
                  clickedCategoryRef.current = false;
                },1000)
              }}
              style={{
                marginBottom:10,
                marginTop:10,
                fontSize:'1.2rem',
                fontWeight:'bold',
                color:currentCategoryId === child.newId ? '#fff' : '#000',
                textTransform:'capitalize',
                textAlign:'center',
                backgroundColor: currentCategoryId === child.newId ? '#98ed58' : '#f0f0f0',
                padding:10,
                borderRadius:10,
                flexShrink:0
              }}>
             {child.nom}
            </div>
        })}
      </div>}

    <div className='product-list'  ref={containerRef} style={{width:'100%'}}>
      <h4>Produits</h4>
      <div className='product-list__grid'>
        {loading && <p>Chargement...</p>}
        {!loading &&
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </div>

   

      {subCategories.map((child)=>{
            const products = allProducts.filter((prod)=>prod.produit.categorie._id === child._id);
            if(products.length === 0) return null;

            return <div id={`c${child.newId}`}>
              <h4  style={{marginBottom:10, marginTop:10, fontSize:'1.2rem', fontWeight:'bold', color:'#000', textTransform:'capitalize', textAlign:'center', backgroundColor:'#f0f0f0', padding:10, borderRadius:10}}>{child.nom}</h4>
              <div className='product-list__grid'>
                {products.map((product)=>{
                  return <ProductCard key={product._id} product={product} />;
                })}
              </div>
            </div>
          })}
    </div>
   </div>
  );
};

const ProductCard = ({ product }) => {
  const { addProductToCart } = React.useContext(ProductsContext);
  const { billet } = React.useContext(AppContext);

  return (
    <div className='product-card'>
      <div className='d-flex justify-content-between'>
        {!product.is_cocktail && (
          <h4 className='badge emTaille taille_produits'>{product.taille}</h4>
        )}
        {product.promo && (
          <h4 className='badge formule'>
            {product.promo_quantity} x {product.promo_price}
          </h4>
        )}
      </div>

      <div className='product-card__image'>
        <img src={product.produit.image} alt='product' />
      </div>
      <div className='product-card__details'>
        <h4
          data-toggle='tooltip'
          data-placement='top'
          title={product.produit.nom_produit + ' ' + product.taille}
        >
          {product.produit.nom_produit}
        </h4>
        {!product.isReturnProduct && (
          <p className='emPriceproduct'>{`${product.prix_vente} FCFA`}</p>
        )}

        {(product.quantite > 0 || product.is_cocktail) && (
          <p>
            {product.isReturnProduct ? 'Quantité' : 'Stock'}:{' '}
            <span
              style={{
                color:
                  product.quantite >= 100 || product.is_cocktail
                    ? 'rgb(47, 204, 47)'
                    : 'rgb(219, 36, 23)',
              }}
            >
              {product.is_cocktail ? '∞' : product.quantite}
            </span>
          </p>
        )}
        {!product.isReturnProduct &&
          !product.is_cocktail &&
          product.quantite === 0 && <p className=''>Rupture de stock</p>}
        {product.isReturnProduct && (
          <p className=''>Expire: le {product.dateline}</p>
        )}
        {product.isReturnProduct && !!product.client_name && (
          <p className=''>Client: {product.client_name}</p>
        )}
        {product.isReturnProduct && !!product.client_name && (
          <p className=''>Code: {product.code}</p>
        )}
      </div>
      {!product.isReturnProduct && (
        <div
          className='product-card__actions'
          onClick={() =>
            billet && !billet.is_closed ? addProductToCart(product) : null
          }
        >
          <button
            className='btn'
            disabled={!billet || (billet && billet.is_closed)}
          >
            Ajouter
          </button>
        </div>
      )}
      {product.quantite === 0 && !product.is_cocktail && (
        <div className='product-overlay' />
      )}
    </div>
  );
};
