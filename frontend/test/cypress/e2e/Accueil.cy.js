describe('Page d\'accueil', () => {
  it('devrait charger la page principale', () => {
    cy.visit('http://localhost:5173/');

    // Vérifie que le titre ou un texte attendu est bien affiché
    cy.contains('Nouvelle conversation').should('be.visible');

    // Vérifie qu'un bouton est présent
    cy.get('[style="display: flex; flex-direction: column;"] > button').should('exist');
  });

  it('ajoute une nouvelle conversation', () => {
    cy.visit('http://localhost:5173/');

    // Clique sur le bouton pour ajouter une nouvelle conversation
    cy.get('[style="display: flex; flex-direction: column;"] > button').click();

    // Vérifie que le texte "Aucun message dans cette conversation." s'affiche
    cy.contains('Aucun message dans cette conversation.').should('be.visible');
  });
});

