import { selectByTestId } from './helpers/selectByTestId';

describe('template spec', () => {
  describe('User is not authorized', () => {
    it('Home page open', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('Profile page open -> Main page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('Page is not exist -> Not found page', () => {
      cy.visit('/123');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('User is authorized', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Profile page open', () => {
      cy.visit('/profile/4');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('Articles page open', () => {
      cy.visit('/articles');
      cy.get('[data-test-id=virtuoso-scroller]').should('exist');
    });
  });
});
