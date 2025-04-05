// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registerLogin', (username, password) => {
    //cy.session([username, password], () => {
        cy.visit('/register');
        cy.get('#username').type('testuser');
        cy.get('#email').type('test@example.com');
        cy.get('#password').type('password123');
        cy.get('#confirm-password').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
        cy.get('#email').type('test@example.com');
        cy.get('#password').type('password123');
        cy.get('button[type="submit"]').click();
    // },
    //     {
    //         cacheAcrossSpecs: true,
    //     });
});