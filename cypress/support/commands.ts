/// <reference types="cypress" />

// import { getByTestId, login } from './commands/common';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';

// ***********************************************
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', login);
// Cypress.Commands.add('getByTestId', getByTestId);

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
// Cypress.Commands.overwrite('intercept', () => {
//   const { FIXTURE_MODE } = process.env;
//   const fixtureName = req.method + req.url + Hash(req.body);

//   if (FIXTURE_MODE === 'READ') {
//     readFixture(fixtureName);
//   }

//   if (FIXTURE_MODE === 'WRITE') {
//     createFixture(fixtureName, req.body);
//   }

//   if (FIXTURE_MODE === 'API') {
//   }
// });

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
//

export {};
