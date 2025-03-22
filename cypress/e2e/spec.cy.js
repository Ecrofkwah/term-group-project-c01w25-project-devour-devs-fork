describe('My First Test', () => {
  it('Open a recipe', () => {
    cy.visit('/');
    cy.get('div.meal-card').eq(0).click();
  })
})