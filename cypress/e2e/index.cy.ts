describe('checks if creating event flow works', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000'),
    cy.get('input[name="lastName"]').type("Jagiello");
    cy.get('input[name="firstName"]').type("Kazimierz");
    cy.get('input[name="email"]').type("kj@testmail.com");
    cy.get('button[type="submit"]').click();
  })
})