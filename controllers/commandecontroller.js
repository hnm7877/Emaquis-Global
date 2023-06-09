const { venteQueries } = require('../requests/venteQueries');

exports.commande = async (req, res) => {
  try {
    const travail_pour = req.body.session || req.session.user.travail_pour;

    const employeId = req.body.employe || req.session.user._id;
    let produitcommandes = [];
    const vente = await venteQueries.getVentes({
      travail_pour: travail_pour,
      employe: employeId,
      status_commande: 'En attente',
    });

    if (vente) {
      const commandes = vente.result.map((commande) => {
        const produitcommande = commande.produit.map((produit, index) => {
          return {
            produit: {
              nom: produit.produit.nom_produit,
              quantité: commande.quantite[index],
              image: produit.produit.image,
              prix_achat: produit.prix_achat,
              prix_vente: produit.prix_vente,
              taille: produit.taille,
              promo: produit.promo,
              promo_quantity: produit.promo_quantity,
              promo_price: produit.promo_price,
              session: produit.session,
              productId: produit.productId,
            },
            monnaie: commande.monnaie,
            somme_encaissée: commande.somme_encaisse,
            employé: `${commande.employe.prenom} ${commande.employe.nom}`,
            prix: commande.prix,
            status_commande: 'En attente',
            idCommande: commande._id,
            date: commande.createdAt,
            table_number: commande.table_number,
            amount_collected: commande.amount_collected,
          };
        });
        produitcommandes.push(produitcommande);
      });
      res.json({
        produitcommandes,
      });
    }
  } catch (e) {
    res.json({
      etat: false,
      data: 'Error',
    });
  }
};
exports.commandePost = async (req, res) => {
  try {
    sess = req.session.user;
    const commande = req.body;
    let Commandes = {};
    if (commande !== null) {
      Commandes = await commandeQueries.setCommande(commande);
      if (Commandes.result !== null) {
        console.log(Commandes.result);
        res.json({
          etat: true,
          data: Commandes.result,
        });
      }
    } else {
      res.json({
        etat: false,
        data: 'erreur',
      });
    }
  } catch (e) {
    res.json({
      etat: false,
      data: 'Error',
    });
  }
};
