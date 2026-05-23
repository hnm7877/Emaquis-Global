/**
 * GeniusPay API Service
 * 
 * Service pour communiquer avec l'API Marchand GeniusPay.
 * Documentation : https://pay.genius.ci/docs/api
 * 
 * Méthodes de paiement supportées (mode checkout) :
 * - Wave, Orange Money, MTN Mobile Money, Moov Money
 * - Paystack (cartes bancaires), PawaPay (12 pays Afrique)
 * - Airtel Money, Carte bancaire (Visa/Mastercard)
 */

const crypto = require('crypto');

class GeniusPayService {
  constructor() {
    this.apiKey = process.env.GENIUSPAY_API_KEY;
    this.apiSecret = process.env.GENIUSPAY_API_SECRET;
    this.webhookSecret = process.env.GENIUSPAY_WEBHOOK_SECRET;
    this.baseUrl = process.env.GENIUSPAY_BASE_URL || 'https://pay.genius.ci/api/v1/merchant';
  }

  /**
   * Headers d'authentification pour les requêtes API
   */
  _getHeaders() {
    return {
      'X-API-Key': this.apiKey,
      'X-API-Secret': this.apiSecret,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Initie un paiement via GeniusPay (mode checkout).
   * 
   * En omettant `payment_method`, GeniusPay génère une page de checkout
   * où le client choisit son moyen de paiement (Wave, Orange, MTN, Carte, etc.).
   * 
   * @param {Object} options
   * @param {number} options.amount - Montant en XOF (minimum 200)
   * @param {string} [options.description] - Description du paiement
   * @param {Object} [options.customer] - Infos client { name, email, phone }
   * @param {string} [options.success_url] - URL de redirection après succès
   * @param {string} [options.error_url] - URL de redirection après échec
   * @param {Object} [options.metadata] - Données personnalisées
   * @returns {Promise<Object>} Réponse GeniusPay avec checkout_url
   */
  async createPayment({ amount, description, customer, success_url, error_url, metadata }) {
    const body = {
      amount,
      currency: 'XOF',
    };

    if (description) body.description = description;
    if (customer) body.customer = customer;
    if (success_url) body.success_url = success_url;
    if (error_url) body.error_url = error_url;
    if (metadata) body.metadata = metadata;

    // Ne PAS spécifier payment_method → mode checkout (toutes les méthodes disponibles)

    const response = await fetch(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorCode = data?.error?.code || 'UNKNOWN_ERROR';
      const errorMessage = data?.error?.message || `Erreur HTTP ${response.status}`;
      throw new Error(`GeniusPay API error [${errorCode}]: ${errorMessage}`);
    }

    return data;
  }

  /**
   * Récupère les détails d'un paiement via sa référence.
   * 
   * @param {string} reference - Référence de la transaction (ex: MTX-A1B2C3D4E5)
   * @returns {Promise<Object>} Détails du paiement
   */
  async getPayment(reference) {
    const response = await fetch(`${this.baseUrl}/payments/${reference}`, {
      method: 'GET',
      headers: this._getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorCode = data?.error?.code || 'UNKNOWN_ERROR';
      const errorMessage = data?.error?.message || `Erreur HTTP ${response.status}`;
      throw new Error(`GeniusPay API error [${errorCode}]: ${errorMessage}`);
    }

    return data;
  }

  /**
   * Vérifie la signature HMAC-SHA256 d'un webhook GeniusPay.
   * 
   * Format : signature = HMAC-SHA256(timestamp + "." + json_payload, secret)
   * 
   * @param {string} timestamp - Header X-Webhook-Timestamp
   * @param {string} payload - Corps brut de la requête JSON
   * @param {string} signature - Header X-Webhook-Signature
   * @returns {boolean} true si la signature est valide
   */
  verifyWebhookSignature(timestamp, payload, signature) {
    if (!this.webhookSecret || !timestamp || !signature) {
      return false;
    }

    const data = `${timestamp}.${payload}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(data)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(signature, 'hex')
    );
  }

  /**
   * Vérifie que le timestamp du webhook n'est pas trop ancien (protection replay attack).
   * Tolérance : 5 minutes.
   * 
   * @param {string|number} timestamp - Timestamp Unix
   * @returns {boolean} true si le timestamp est valide
   */
  isTimestampValid(timestamp) {
    const now = Math.floor(Date.now() / 1000);
    return Math.abs(now - parseInt(timestamp, 10)) <= 300; // 5 minutes
  }
}

// Singleton
const geniusPayService = new GeniusPayService();

module.exports = geniusPayService;
