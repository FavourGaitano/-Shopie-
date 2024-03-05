describe('It navigates the user', ()=>{
    it('should navigate back and forth', ()=>{
        cy.visit('http://localhost:4200/')
        cy.get('.register-link').click()
        
        cy.location('pathname').should('equal', '/registration')

        cy.go('back')

        cy.location('pathname').should('equal', '/')

  

        cy.go('forward')

        cy.location('pathname').should('equal', '/registration')

        cy.go('back')

 
    })
})