export const setRating = (rate: number, feedback: string = '') => {
  cy.getByTestId(`StarRating.${rate}`).click();
  cy.getByTestId('RatingCard.Feedback').type(feedback);
  cy.getByTestId('RatingCard.Send').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      setRating(rate: number, feedback?: string): Chainable<void>;
    }
  }
}
