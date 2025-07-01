
describe('Page d\'accueil', () => {
  
  it('ajoute une nouvelle conversation, envoiyer un message et verifier son envoie', () => {
    cy.visit('http://localhost:5173/');

    // Clique sur le bouton pour ajouter une nouvelle conversation
    cy.get('[style="display: flex; flex-direction: column;"] > button').click();

    // Vérifie que le texte "Aucun message dans cette conversation." s'affiche
    cy.contains('Aucun message dans cette conversation.').should('be.visible');

    cy.get('input').type('Ceci est un message envoiyer par un test cypress a un utilisateur');
    cy.get('[style="display: flex;"] > button').click();
    
  });
});

