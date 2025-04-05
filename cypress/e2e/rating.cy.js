describe('Add and Remove from Favourites', () => {
    before(() => {
        cy.log(cy.task('connect'));
        cy.task('clearRatings');
    });

    beforeEach(() => {
        cy.task('clearUsers');
        cy.registerLogin('testuser', 'password123');
    });

    after(() => {
        cy.task('clearUsers');
        cy.task('clearRatings');
        cy.task('disconnect');
    });

    it('Set rating', () => {
        cy.intercept('POST', 'http://localhost:3000/api/meals/rating').as('ratingApiCall');
        cy.get('.meal-card').eq(0).find('.fs-2.me-1').find('svg').should('have.css', 'fill', 'rgba(33, 37, 41, 0.75)') //ALL stars gray
        cy.get('.meal-card').eq(0).click();
        cy.get('.fs-2.me-1').should('have.css', 'color', 'rgba(0, 0, 0, 0)'); //ALL stars gray
        cy.get('.fs-2.me-1').eq(0).click(); //Click on first star
        cy.wait('@ratingApiCall').then((interception) => {
            expect(interception.response.statusCode).to.be.eq(200);
        });
        cy.get('.fs-2.me-1').eq(0).should('have.css', 'color', 'rgb(255, 215, 0)');
        cy.visit('/');
        cy.intercept('GET', 'http://localhost:3000/api/meals/rating').as('getRatingApiCall');
        cy.get('.meal-card').eq(0).find('.fs-2.me-1').find('svg').eq(0).should('have.css', 'color', 'rgb(255, 193, 7)'); 
        //cy.get('.meal-card').eq(0).find('.fs-2.me-1').eq(0).should('have.css', 'stroke', '0');
    });
});
