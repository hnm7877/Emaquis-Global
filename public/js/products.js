import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

export default function ProductCard({ product, billet, addProductToCart }) {
  const inStock = product.quantite > 0 || product.is_cocktail;

  return (
    <motion.div
      className="product-card relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="d-flex justify-content-between p-3">
        {!product.is_cocktail && (
          <motion.h4
            className="badge emTaille taille_produits bg-blue-50 text-blue-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
          >
            {product.taille}
          </motion.h4>
        )}
        {product.promo && (
          <motion.h4
            className="badge formule bg-red-50 text-red-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {product.promo_quantity} x {product.promo_price}
          </motion.h4>
        )}
      </div>

      <motion.div
        className="product-card__image w-full h-40 bg-gray-100 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
      >
        <img
          src={product.produit.image}
          alt="product"
          className="object-contain h-full"
        />
      </motion.div>

      <div className="product-card__details p-4">
        <h4
          data-tooltip-id={`tooltip-${product.id}`}
          data-tooltip-content={`${product.produit.nom_produit} ${product.taille}`}
          className="text-lg font-semibold truncate"
        >
          {product.produit.nom_produit}
        </h4>
        <Tooltip id={`tooltip-${product.id}`} place="top" />

        {!product.isReturnProduct && (
          <p className="emPriceproduct text-xl font-bold text-green-600 mt-2">
            {product.prix_vente} FCFA
          </p>
        )}

        {inStock && (
          <p className="mt-2 text-sm">
            {product.isReturnProduct ? "Quantité" : "Stock"}:{" "}
            <span
              className={`font-semibold ${
                product.quantite >= 100 || product.is_cocktail
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {product.is_cocktail ? "∞" : product.quantite}
            </span>
          </p>
        )}

        {!product.isReturnProduct &&
          !product.is_cocktail &&
          product.quantite === 0 && (
            <p className="text-sm text-red-500 mt-2">Rupture de stock</p>
          )}

        {product.isReturnProduct && (
          <>
            <p className="text-sm text-gray-600 mt-2">
              Expire: le {product.dateline}
            </p>
            {product.client_name && (
              <p className="text-sm">Client: {product.client_name}</p>
            )}
            {product.client_name && (
              <p className="text-sm">Code: {product.code}</p>
            )}
          </>
        )}
      </div>

      {!product.isReturnProduct && (
        <motion.div
          className="product-card__actions p-4"
          whileTap={{ scale: 0.95 }}
        >
          <button
            className="btn w-full py-2 rounded-lg text-white font-medium shadow transition-colors disabled:bg-gray-400 bg-blue-600 hover:bg-blue-700"
            disabled={!billet || billet.is_closed}
            onClick={() => !billet?.is_closed && addProductToCart(product)}
          >
            Ajouter
          </button>
        </motion.div>
      )}

      {!product.is_cocktail && product.quantite === 0 && (
        <motion.div
          className="product-overlay absolute inset-0 bg-white bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
        />
      )}
    </motion.div>
  );
}
