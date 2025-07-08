describe('Verify the health of the API', () => {
  it('should verify the health of the API', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}/ping`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})