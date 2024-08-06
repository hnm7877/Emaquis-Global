const ProductMultiPricesModal = () => {
	const { productSelected, handleSelectProduct, addProductToCart } =
		React.useContext(ProductsContext);

	const pricesType = productSelected
		? [...productSelected.pricesType].sort((a, b) => a.type - b.type)
		: [];

	const handleClose = () => {
		handleSelectProduct(null);
		$('#productMultiPricesModal').modal('hide');
	};

	const handleAddProductToCart = (type) => {
		if (!type) {
			addProductToCart(productSelected);
		} else {
			addProductToCart({
				...productSelected,
        priceType: type,
				prix_vente: type === 1 ? pricesType[0].price : pricesType[1].price,
			});
		}
	};

	return (
		<div
			class='modal fade'
			id='productMultiPricesModal'
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
						<div>
							<h2
								class='modal-title'
								id='exampleModalLongTitle'
							>
								{productSelected && productSelected.produit.nom_produit}
							</h2>
							<p>
								Ce produit est disponible en plusieurs prix. Veuillez choisir le
								prix
							</p>
						</div>
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
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								flexWrap: 'wrap',
								gap: '1rem',
							}}
						>
							<button
								style={{
									flex: 1,
									padding: '1rem',
									backgroundColor: 'white',
									border: '1px solid #ccc',
									borderRadius: '5px',
									cursor: 'pointer',
								}}
                onClick={() => handleAddProductToCart()}
							>
								Plein - {productSelected && productSelected.prix_vente} FCFA
							</button>
							{productSelected &&
								pricesType.map((priceType) => {
									return (
										<button
											style={{
												flex: 1,
												padding: '1rem',
												backgroundColor: 'white',
												border: '1px solid #ccc',
												borderRadius: '5px',
												cursor: 'pointer',
											}}
											onClick={() => handleAddProductToCart(priceType.type)}
										>
											{priceType.type === 1 ? 'Demi' : 'Quart'} -{' '}
											{priceType.price} FCFA
										</button>
									);
								})}
						</div>
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
