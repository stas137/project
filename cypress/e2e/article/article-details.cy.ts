let currentArticleId = '';

describe('Auth user open ArticleDetails Page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`/articles/${currentArticleId}`);
    });
  });

  afterEach(() => {
    cy.login();
    cy.removeArticle(currentArticleId);
  });

  it('ArticleDetails page is open', () => {
    cy.getByTestId('ArticleDetailsPage').should('exist');
  });

  it('ArticleRecommendationList is open', () => {
    cy.getByTestId('ArticleRecommendationList').should('exist');
  });

  it('Comment for article is send', () => {
    cy.getByTestId('ArticleDetailsPage').should('exist');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('CommentsList.Content').should('exist');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('Rating for article is send', () => {
    cy.getByTestId('ArticleDetailsPage').should('exist');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRating(5, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
