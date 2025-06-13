Cypress.Commands.add('auth', () => {
  cy.fixture('users').then((data) => {
    cy.api({
      method: 'POST',
      url: '/auth',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data.userAuth
    }).then((response) => {
      return response.body.token
    })
  })
})