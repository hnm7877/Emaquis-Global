const AppRoot = () => {
	const [products, setProducts] = React.useState([]);
	const [totalVentes, setTotalVentes] = React.useState(0);
	const [totalEmployes, setTotalEmployes] = React.useState(0);
	const [ventes, setVentes] = React.useState([]);

	const [carts, setCarts] = React.useState([]);
	const [categorySelectedId, setCategorySelectedId] = React.useState(null);
	const [venteId, setVenteId] = React.useState(null);
	const [venteSelected, setVenteSelected] = React.useState(null);
	const [productSelected, setProductSelected] = React.useState(null);
	const [productUnvailable, setProductUnvailable] = React.useState([]);
	const [billet, setBillet] = React.useState(null);
	const [user, setUser] = React.useState(null);
	const [currentTiming, setCurrentTiming] = React.useState(null);

	const handleSelectCategory = (id) => {
		setCategorySelectedId(id);
	};

	React.useEffect(() => {
		const socket = io();

		socket.on('connect', () => {
			socket.on(`${user_travail_pour}-vente`, (data) => {
				const vente = data.vente;

				if (
					!vente.for_employe ||
					(vente.for_employe && vente.for_employe === globalUser._id)
				) {
					$.notify('Vous avez une nouvelle commande !', 'success');
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
						const itemList = vente.produit.map((el,idx) => el.productId === product._id ? {id:el.productId, priceType:el.priceType,idx, quantite: vente.quantite[idx]} : null).filter(Boolean);

						if (itemList.length) {
							const newProduct = { ...product };
							const totalQty = itemList.reduce((acc, el) => {
								if(el.priceType){
									acc += el.quantite * (el.priceType === 1 ? 0.5 : 0.25);
								}else{
									acc += el.quantite;
								}

								return acc;
							}, 0);


							newProduct.quantite -= totalQty;
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
						const itemList = allProducts.filter((el) => el.id === product._id);
						
						if (itemList.length) {
							const totalQty = itemList.reduce((acc, el) => {
								return acc + el.quantite;
							}, 0)
							const newProduct = { ...product };
							newProduct.quantite -= totalQty;
							return newProduct;
						} else {
							return product;
						}
					});

					return newProducts;
				});
			});

			socket.on(`${user_travail_pour}-current-time`, (data) => {
				console.log('current-time', data);
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
			type === 'Validée' &&
			new Date(vente.createdAt).toLocaleDateString() >=
				new Date(billet.open_hour).toLocaleDateString()
		) {
			const total = vente.prix;

			updateTotalVentes(total);
		} else if (type === 'Annulée') {
			setProducts((prProducts) => {
				const newProducts = prProducts.map((product) => {
					const index = vente.produit.findIndex(
						(el) => el.productId === product._id
					);

					if (index !== -1) {
						const venteProduct = vente.produit[index];
						const newProduct = { ...product };
						newProduct.quantite += venteProduct.priceType ? (venteProduct.priceType === 1 ? 0.5 : 0.25) * vente.quantite[index] : vente.quantite[index];
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

	const handleAlertOutOfStock = () => {
		alert('Vous ne pouvez pas ajouter plus de produits que le stock');
	};

	const addProductToCart = (product) => {
		console.log('🚀 ~ addProductToCart ~ product:', product);
		if (product.quantite <= 0 && !product.is_cocktail) {
			return;
		}

		const cartItem = carts.find(
			(cart) =>
				(cart._id === product._id &&
					product.priceType &&
					cart.priceType === product.priceType) ||
				(cart._id === product._id && !product.priceType && !cart.priceType)
		);
		const item = carts.filter((cart) => cart._id === product._id);

		const totalQty = item.reduce((acc, el) => {
			if (el.priceType) {
				acc += el.priceType === 1 ? el.quantity * 0.5 : (el.quantity * 1) / 4;
			} else {
				acc += el.quantity;
			}
			return acc;
		}, 0);

		const realQty = product.priceType
			? product.priceType === 1
				? 0.5
				: 0.25
			: 1;

		if (item.length) {
			const qty =
				totalQty - (cartItem ? cartItem.quantity_already_sold || 0 : 0);
			if (
				!product.is_cocktail &&
				(qty + realQty > product.quantite ||
					(categorySelectedId === 'formule' &&
						qty + product.promo_quantity > product.quantite))
			) {
				handleAlertOutOfStock();
				return;
			}

			if (cartItem) {
				if (categorySelectedId === 'formule') {
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
							categorySelectedId === 'formule' ? product.promo_quantity : 1,
					},
				]);
			}
		} else {
      if (!product.is_cocktail && realQty > product.quantite) {
        handleAlertOutOfStock();
        return;
      }

			setCarts([
				...carts,
				{
					...product,
					quantity:
						categorySelectedId === 'formule' ? product.promo_quantity : 1,
				},
			]);
		}
	};

	const removeProductFromCart = (product) => {
		const cartItemIndex = carts.findIndex(
			(cart) =>
				(cart._id === product._id &&
					product.priceType &&
					cart.priceType === product.priceType) ||
				(cart._id === product._id && !product.priceType && !cart.priceType)
		);
		if (cartItemIndex > -1) {
			const newCarts = [...carts];
			newCarts.splice(cartItemIndex, 1);
			setCarts(newCarts);
		}
	};

	const updateProductQuantity = (product, quantity) => {
		const cartItem = carts.find(
			(cart) =>
				(cart._id === product._id &&
					product.priceType &&
					cart.priceType === product.priceType) ||
				(cart._id === product._id && !product.priceType && !cart.priceType)
		);

    const item = carts.filter((cart) => cart._id === product._id);

		const totalQty = item.reduce((acc, el) => {
			if (el.priceType) {
				acc += el.priceType === 1 ? el.quantity * 0.5 : (el.quantity * 1) / 4;
			} else {
				acc += el.quantity;
			}
			return acc;
		}, 0);


		if (cartItem) {
      const itemQty = product.priceType ? product.priceType === 1 ? 0.5 : 0.25 : 1;
      const realQty = (totalQty - (cartItem.quantity * itemQty)) + (quantity * itemQty);
			if (!product.is_cocktail && realQty > product.quantite) {
				handleAlertOutOfStock();
				return;
			}

			cartItem.quantity = quantity;
			setCarts([...carts]);
		} else {
			setCarts([...carts, { ...product, quantity: 1 }]);
		}
	};

	const handleUpdateProductQuantity = (product, type) => {
		const cartItem = carts.find(
			(cart) =>
				(cart._id === product._id &&
					product.priceType &&
					cart.priceType === product.priceType) ||
				(cart._id === product._id && !product.priceType && !cart.priceType)
		);

		if (cartItem) {
			if (type === 'decr' && cartItem.quantity > 1) {
				cartItem.quantity--;
			} else if (type === 'incr') {
				cartItem.quantity++;
			} else if (type === 'decr' && cartItem.quantity === 1) {
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
				is_cocktail: product.taille === 'c',
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

	const handleSelectProduct = (product) => {
		setProductSelected(product);
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
					venteId,
					productUnvailable,
					initProductsUnvailable,
					resetProductsUnvailable,
					venteSelected,
					productSelected,
					handleSelectProduct,
				}}
			>
				<React.Fragment>
					<VenteRoot />
					<EmDashboardBody />
					<ModalUnvailableProducts />
					<ProductMultiPricesModal />
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
		$('#productUnvailableModal').modal('hide');
	};

	return (
		<div
			class='modal fade'
			id='productUnvailableModal'
			tabindex='-1'
			role='dialog'
			aria-labelledby='myModalTitle'
		>
			<div
				class='modal-dialog modal-dialog-centered'
				style={{
					maxWidth: '600px',
				}}
				role='document'
			>
				(
				<div class='modal-content'>
					<div class='modal-header'>
						<h2
							class='modal-title'
							id='exampleModalLongTitle'
						>
							Produits non disponible
						</h2>
						<button
							type='button'
							class='close close-modal'
							data-dismiss='modal'
							aria-label='Close'
							id='close-modal'
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div class='modal-body'>
						{productUnvailable &&
							productUnvailable.map((el, index) => {
								return (
									<p key={index}>
										{el.nom_produit}{el.priceType?formatProductPriceType(el.priceType):' '}
										{el.taille + `\n quantité restante: ${formatProductQuantity(el.quantite)}`}
									</p>
								);
							})}
					</div>

					<div class='modal-footer'>
						<button
							type='button'
							class='btn btn-success close-modal'
							data-dismiss='modal'
							onClick={handleClose}
						>
							Ok
						</button>
					</div>
				</div>
				)
			</div>
		</div>
	);
};

ReactDOM.render(<AppRoot />, document.getElementById('root'));
