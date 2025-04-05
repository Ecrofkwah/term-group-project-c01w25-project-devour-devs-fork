describe('Register', () => {
  before(() => {
    cy.log(cy.task('connect'));
    cy.task('clearUsers');
    cy.log(1);
    cy.log(cy.task('checkConnection'));
  });

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  after(() => {
    cy.task('clearUsers');
    cy.task('disconnect');
  });

  it('Register a user', () => {
    cy.get('.nav-link').contains('Register').click();
    cy.url().should('include', '/register');
    cy.intercept('POST', 'http://localhost:3000/api/auth/register').as('registerApiCall');

    cy.get('#username').type('testuser');
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirm-password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@registerApiCall').then((interception) => {
      expect(interception.response.statusCode).to.be.eq(201);
      cy.log('Registration API call completed successfully.');
    });
    cy.log(cy.task('checkConnection'));
    //Check DB
    cy.task('findUser', 'test@example.com').then((user) => {
      expect(user).to.exist;
      expect(user.username).to.equal('testuser');
      expect(user.email).to.equal('test@example.com');
      expect(user.password).to.exist;
      expect(user.password).not.to.equal('password123'); //Hashed password
    });

    cy.url().should('include', '/login');

    // Go back and check for existing user check
    cy.get('.nav-link').contains('Register').click();
    cy.get('#username').type('testuser');
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirm-password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message').should('contain', 'Email already existed');
  });

  it('Login a user', () => {
    cy.get('.nav-link').contains('Login').click();
    cy.url().should('include', '/login');
    cy.intercept('POST', 'http://localhost:3000/api/auth/login').as('loginApiCall');

    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password1234');
    cy.get('button[type="submit"]').click();

    //Fail first
    cy.wait('@loginApiCall').then((interception) => {
      expect(interception.response.statusCode).to.be.eq(401);
    });
    cy.get('.error-message').should('contain', 'Invalid email or password');

    cy.get('#email').clear().type('test@example.com');
    cy.get('#password').clear().type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginApiCall').then((interception) => {
      expect(interception.response.statusCode).to.be.eq(201);
    });

    cy.url().should('eq', 'http://localhost:5173/');
  });
});