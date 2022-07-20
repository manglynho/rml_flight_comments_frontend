describe('Comments app', function() {

  describe('Comments Ops', function() {
    it('A comment can be created', function() {
      //just in case timeout due to my vpn conection to cloudDB :-(
      this.timeout(60000)
      cy.visit('http://localhost:3000')
      cy.get('#panel2a-header').click()
      cy.get('#flight-field').click()
      cy.get('#5a422a851b54a676234d1898').click()
      cy.get('#user-field').click()
      cy.get('#5a422aa71b54a676234d17f8').click()
      cy.get('#comment-field').type('Another test comment by Cypress')
      cy.get('#add-comment-button').click()
      cy.contains('Another test comment by Cypress')
    })

  })

})