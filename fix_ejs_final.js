const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "views", "ajouterproduit.ejs");
let lines = fs.readFileSync(filePath, "utf8").split("\n");

// Trouver et remplacer la section ancienne (lignes 1371-1401)
const startIndex = 1370; // Index 0-based pour ligne 1371
const endIndex = 1400; // Index 0-based pour ligne 1401

const newCode = `                )}

                {/* Section Aperçu produit */}
                {!!productSelected && (
                  <div className='form-section-modern'>
                    <h3>
                      <i className="fas fa-eye"></i>
                      Aperçu du produit
                    </h3>
                    <div className='row'>
                      <div className='col-lg-6 col-md-12'>
                        <div className='product-preview-modern'>
                          <img
                            src={productSelected.image || "/images/paresseux_sous_parasol_DEF.png"}
                            alt={productSelected.nom_produit}
                            onError={(e) => {
                              e.target.src = "/images/paresseux_sous_parasol_DEF.png";
                            }}
                          />
                          <div className='product-info-modern'>
                            {!is_cocktail && (
                              <React.Fragment>
                                <div className='product-info-item'>
                                  <span>
                                    <i className="fas fa-boxes" style={{ color: "#2563eb", marginRight: "0.5rem" }}></i>
                                    Quantité totale
                                  </span>
                                  <span style={{ color: "#10b981" }}>{quantiteStock || 0}</span>
                                </div>
                                {hasStock && (
                                  <div className='product-info-item'>
                                    <span>
                                      <i className="fas fa-warehouse" style={{ color: "#2563eb", marginRight: "0.5rem" }}></i>
                                      En stock
                                    </span>
                                    <span style={{ color: productInStock && productInStock.quantity > 0 ? "#10b981" : "#ef4444" }}>
                                      {productInStock ? productInStock.quantity : 0}
                                    </span>
                                  </div>
                                )}
                              </React.Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bouton de soumission */}
                <div className='col-lg-12' id="button">
                  <button
                    type='submit'
                    className='btn-submit-modern'
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <React.Fragment>
                        <i className="fas fa-spinner fa-spin"></i>
                        {updateProduct ? 'Modification en cours...' : 'Ajout en cours...'}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <i className={\`fas fa-\${updateProduct ? 'save' : 'plus-circle'}\`}></i>
                        {updateProduct ? 'Modifier le produit' : 'Ajouter le produit'}
                      </React.Fragment>
                    )}
                  </button>
                </div>
              </div>
            </React.Fragment>`;

// Remplacer les lignes
const newLines = [
  ...lines.slice(0, startIndex),
  ...newCode.split("\n"),
  ...lines.slice(endIndex + 1),
];

fs.writeFileSync(filePath, newLines.join("\n"), "utf8");
console.log("Remplacements effectués avec succès");
