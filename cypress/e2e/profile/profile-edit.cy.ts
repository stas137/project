let profileId = '';

describe('Auth user open Profile Page', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`/profile/${data.id}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('Profile card is open', () => {
    cy.getByTestId('ProfileCard.Firstname').should('have.value', 'Test');
    cy.getByTestId('ProfileCard.Lastname').should('have.value', 'Testov');
  });

  it('Edit profile data', () => {
    const [firstname, lastname] = ['Firstname', 'Lastname'];

    cy.updateProfile(firstname, lastname);

    cy.getByTestId('ProfileCard.Firstname').should('have.value', firstname);
    cy.getByTestId('ProfileCard.Lastname').should('have.value', lastname);
  });

  it('Profile card is open', () => {
    cy.getByTestId('ProfileCard.Firstname').should('have.value', 'Test');
    cy.getByTestId('ProfileCard.Lastname').should('have.value', 'Testov');
  });
});
