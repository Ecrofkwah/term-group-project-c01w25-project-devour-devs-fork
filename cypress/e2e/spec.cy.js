describe('Register', () => {
  /*before(() => {
    cy.task('connectToDB')
  })*/

  beforeEach(() => {
   // cy.task('resetDatabase');
    
    cy.visit('http://localhost:5173/register');
  });

  after(() => {
    //cy.task('closeDB')
  })

  it('Register a user', () => {
    cy.get('#username').type('testuser');
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirm-password').type('password123');
    cy.get('button[type="submit"]').click();

    //cy.url().should('include', '/login');
    cy.request('POST', 'http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    cy.get('a[href="/login"]').eq(0).click();
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:5173');


    // cy.task('findUser', { user: 'testuser' }).then(user => {
    //   expect(user).to.exist;
    //   expect(user.email).to.equal('test@example.com');
    //... Continued here, then check if the user exists in the db after
    // cy.visit('/')
    //cy.visit('/');
    //cy.get('div.meal-card').eq(0).click();
    //});
  });
});