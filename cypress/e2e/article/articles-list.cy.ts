describe('Auth user open ArticleList Page', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('/articles');
    });
  });

  it('ArticleList page is open (stub (fixture))', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getByTestId('ArticleListItem').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  it('ArticleList page is open', () => {
    cy.getByTestId('ArticleListItem').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
