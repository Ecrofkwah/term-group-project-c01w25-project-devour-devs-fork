describe('Add and Remove from Favourites', () => {
    before(() => {
        cy.log(cy.task('connect'));
        cy.task('clearFavourites');
    });

    beforeEach(() => {
        cy.task('clearUsers');
        cy.registerLogin('testuser', 'password123');
    });

    after(() => {
        cy.task('clearUsers');
        cy.task('clearFavourites');
        cy.task('disconnect');
    });

    it('Add to favourites', () => {
        cy.intercept('POST', 'http://localhost:3000/api/meals/favourites').as('favoritesApiCall');
        cy.get('.meal-card').eq(0).click();
        cy.get('button').contains('Add to Favourites').click();
        cy.wait('@favoritesApiCall').then((interception) => {
            expect(interception.response.statusCode).to.be.eq(201);
            cy.log('Favourite API call completed successfully.');
        });
        cy.get('#collapsible-nav-dropdown').click();
        cy.get('.dropdown-item').contains('My Favourites').click();
        cy.get('button.delete-btn');

    });
    it('Remove from favourites', () => {
        cy.get('.meal-card').eq(0).click();
        cy.get('button').contains('Add to Favourites').click();
        cy.intercept('DELETE', 'http://localhost:3000/api/meals/favourites').as('favoritesApiCall');
        cy.visit('/recipe/favourite');
        cy.get('button.delete-btn').click();
        cy.wait('@favoritesApiCall').then((interception) => {
            expect(interception.response.statusCode).to.be.eq(200);
            cy.log('Favourite API call completed successfully.');
        });
        cy.get('button.delete-btn').should('not.exist');
        cy.get('.navbar-brand').contains('RecipeConnect').click();
        cy.url().should('eq', 'http://localhost:5173/');
        cy.get('.meal-card').eq(0).click();
        cy.get('button').contains('Add to Favourites');
    });
});
