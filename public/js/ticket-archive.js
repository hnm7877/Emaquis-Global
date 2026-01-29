(function() {
    'use strict';
    
    // FIX: Définir une fonction vide pour éviter l'erreur de référence du dashboard
    // Cette fonction est appelée par erreur par un script tiers ou un socket partagé
    window.updateClassementFromServer = function() {};
    
    let currentFilter = 'all';
    let currentStartDate = '';
    let currentEndDate = '';
    let currentPage = 1;
    let totalPages = 1;
    const itemsPerPage = 20;
    
    // Initialisation au chargement de la page
    document.addEventListener('DOMContentLoaded', function() {
        setupFilters();
        setupDateFilters();
        setupPagination();
        loadTickets();
    });
    
    // Configuration de la pagination
    function setupPagination() {
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    loadTickets();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    loadTickets();
                }
            });
        }
    }
    
    // Configuration des filtres de statut
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                // Mettre à jour le filtre actuel
                currentFilter = this.getAttribute('data-filter');
                
                // Réinitialiser à la page 1 quand on change de filtre
                currentPage = 1;
                
                // Recharger les tickets
                loadTickets();
            });
        });
    }
    
    // Configuration des filtres de date
    function setupDateFilters() {
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        
        if (startDateInput) {
            startDateInput.addEventListener('change', function() {
                currentStartDate = this.value;
                currentPage = 1; // Reset à la page 1
                loadTickets();
            });
        }
        
        if (endDateInput) {
            endDateInput.addEventListener('change', function() {
                currentEndDate = this.value;
                currentPage = 1; // Reset à la page 1
                loadTickets();
            });
        }
    }
    
    // Charger les tickets depuis l'API
    function loadTickets() {
        showLoading();
        
        // Construire l'URL avec les paramètres
        const params = new URLSearchParams({
            filter: currentFilter,
            limit: itemsPerPage,
            page: currentPage
        });
        
        if (currentStartDate) params.append('startDate', currentStartDate);
        if (currentEndDate) params.append('endDate', currentEndDate);
        
        fetch(`/api/ticket-archives?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displayTickets(data.data);
                    updatePagination(data.pagination);
                } else {
                    showError('Erreur lors du chargement des tickets');
                }
            })
            .catch(error => {
                console.error('Error loading tickets:', error);
                showError('Erreur de connexion au serveur');
            });
    }
    
    // Afficher les tickets dans le tableau
    function displayTickets(tickets) {
        const tableBody = document.getElementById('ticketsTableBody');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const emptyState = document.getElementById('emptyState');
        const tableContainer = document.getElementById('tableContainer');
        
        // Masquer le spinner
        loadingSpinner.style.display = 'none';
        
        if (!tickets || tickets.length === 0) {
            // Afficher l'état vide
            emptyState.style.display = 'block';
            tableContainer.style.display = 'none';
            return;
        }
        
        // Masquer l'état vide et afficher le tableau
        emptyState.style.display = 'none';
        tableContainer.style.display = 'block';
        
        // Vider le tableau
        tableBody.innerHTML = '';
        
        // Remplir le tableau avec les tickets
        tickets.forEach(ticket => {
            const row = createTicketRow(ticket);
            tableBody.appendChild(row);
        });
    }
    
    // Créer une ligne de ticket
    function createTicketRow(ticket) {
        const tr = document.createElement('tr');
        
        // Date de création
        const dateCell = document.createElement('td');
        dateCell.innerHTML = `<strong>${formatDate(ticket.createdAt)}</strong><br>
                              <small class="text-muted">${formatTime(ticket.createdAt)}</small>`;
        
        // Numéro de facture
        const numeroCell = document.createElement('td');
        const factureId = ticket._id.toString().slice(-8).toUpperCase();
        numeroCell.innerHTML = `<code style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px;">${factureId}</code>`;
        
        // Montant total
        const montantCell = document.createElement('td');
        const total = calculateTotal(ticket);
        montantCell.innerHTML = `<strong style="color: #16213e;">${total.toLocaleString()} FCFA</strong>`;
        
        // Employé
        const employeCell = document.createElement('td');
        const employeName = ticket.employe ? `${ticket.employe.nom || ''} ${ticket.employe.prenom || ''}`.trim() : 'N/A';
        employeCell.textContent = employeName || 'N/A';
        
        // Statut
        const statutCell = document.createElement('td');
        if (ticket.ticketPrinted) {
            statutCell.innerHTML = `<span class="status-badge printed">
                <i class="fas fa-check-circle"></i> Imprimé
            </span>`;
        } else {
            statutCell.innerHTML = `<span class="status-badge unprinted">
                <i class="fas fa-times-circle"></i> Non imprimé
            </span>`;
        }
        
        // Date d'impression
        const dateImpressionCell = document.createElement('td');
        if (ticket.ticketPrintedAt) {
            dateImpressionCell.innerHTML = `${formatDate(ticket.ticketPrintedAt)}<br>
                                           <small class="text-muted">${formatTime(ticket.ticketPrintedAt)}</small>`;
        } else {
            dateImpressionCell.innerHTML = '<span class="text-muted">-</span>';
        }
        
        // Actions
        const actionsCell = document.createElement('td');
        const reprintBtn = document.createElement('button');
        reprintBtn.className = 'btn-reprint';
        reprintBtn.innerHTML = '<i class="fas fa-print"></i> Réimprimer';
        reprintBtn.onclick = () => reprintTicket(ticket._id);
        actionsCell.appendChild(reprintBtn);
        
        // Ajouter toutes les cellules à la ligne
        tr.appendChild(dateCell);
        tr.appendChild(numeroCell);
        tr.appendChild(montantCell);
        tr.appendChild(employeCell);
        tr.appendChild(statutCell);
        tr.appendChild(dateImpressionCell);
        tr.appendChild(actionsCell);
        
        return tr;
    }
    
    // Calculer le total d'un ticket
    function calculateTotal(ticket) {
        if (!ticket.produit || ticket.produit.length === 0) return 0;
        
        return ticket.produit.reduce((acc, prod, index) => {
            const qty = ticket.quantite[index] || 0;
            const prix = prod.prix_vente || 0;
            
            if (prod.promo && prod.promo_quantity && prod.promo_price) {
                const fullSets = Math.floor(qty / prod.promo_quantity);
                const remainder = qty % prod.promo_quantity;
                return acc + (fullSets * prod.promo_price) + (remainder * prix);
            }
            
            return acc + (prix * qty);
        }, 0);
    }
    
    // Réimprimer un ticket
    function reprintTicket(ticketId) {
        // Ouvrir le PDF dans un nouvel onglet
        window.open(`/reprint-ticket/${ticketId}`, '_blank');
    }
    
    // Mettre à jour l'affichage de la pagination
    function updatePagination(pagination) {
        const paginationContainer = document.getElementById('paginationContainer');
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        const paginationInfo = document.getElementById('paginationInfo');
        
        if (!pagination || !paginationContainer) return;
        
        // Afficher le container de pagination
        paginationContainer.style.display = 'flex';
        
        // Mettre à jour le texte d'information
        paginationInfo.textContent = `Page ${currentPage}`;
        
        // Désactiver/Activer les boutons selon la page
        if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
        }
        
        // Pour déterminer s'il y a une page suivante, on vérifie si on a reçu le nombre max d'items
        const hasNextPage = pagination && pagination.limit && pagination.limit === itemsPerPage;
        if (nextBtn) {
            nextBtn.disabled = !hasNextPage;
        }
    }
    
    // Formater une date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    // Formater une heure
    function formatTime(dateString) {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // Afficher le spinner de chargement
    function showLoading() {
        document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('tableContainer').style.display = 'none';
    }
    
    // Afficher une erreur
    function showError(message) {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('tableContainer').style.display = 'none';
        const emptyState = document.getElementById('emptyState');
        emptyState.style.display = 'block';
        emptyState.querySelector('h3').textContent = 'Erreur';
        emptyState.querySelector('p').textContent = message;
    }

    // FIX: Gestionnaire pour le bouton "Faites un don" (Sidebar)
    // Bridge entre attributs BS4 (data-toggle) et Script BS5
    const donateBtn = document.querySelector('.sidebar-donate-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const modalEl = document.getElementById('donateModal');
            if (modalEl && window.bootstrap) {
                let modal = bootstrap.Modal.getInstance(modalEl);
                if (!modal) {
                    modal = new bootstrap.Modal(modalEl);
                }
                modal.show();
            } else if (typeof $ !== 'undefined' && modalEl) {
                // Fallback jQuery si activé
                $(modalEl).modal('show');
            }
        });
    }

})();
