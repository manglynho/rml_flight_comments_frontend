describe('Comments app', function() {

  describe('Comments Ops', function() {
    it('A comment can be created', function() {
      cy.visit('http://localhost:3000')
      cy.get('#flight-field').type('5a422a851b54a676234d1898')
      cy.get('#user-field').type('5a422aa71b54a676234d17f8')
      cy.get('#comment-field').type('Ok this is a test comment by Cypress')
      cy.get('#add-comment-button').click()
      cy.contains('Ok this is a test comment by Cypress')
    })

  })

})