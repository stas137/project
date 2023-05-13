import { selectByTestId } from '../../helpers/selectByTestId';
import { LOCAL_STORAGE_USER_KEY } from '../../../src/shared/const/localstorage';
import { User } from '../../../src/entities/User';

export const login = (username: string = 'test', password: string = 'test') => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/login',
      body: {
        username,
        password,
      },
    })
    .then(({ body }) => {
      window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(body));
      return body;
    });
};

export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId));
};

declare global {
  namespace Cypress {
    interface Chainable {
      login(user?: string, password?: string): Chainable<User>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
