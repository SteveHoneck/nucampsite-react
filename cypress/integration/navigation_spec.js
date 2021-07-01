describe('Site navigation', () => {
    it('All navbar links and endpoints are responding', () => {
      
      cy.visit('/')
      cy.url().should('include', '/home')

      cy.get('a[class="mr-auto navbar-brand"]').click()
      cy.url().should('include', '/home')

      cy.get('nav').contains('Home').click()
      cy.url().should('include', '/home')

      cy.get('nav').contains('Directory').click()
      cy.url().should('include', '/directory')

      cy.get('nav').contains('My Favorites').click()
      cy.url().should('include', '/home') //add if statement for logged in users?

      cy.get('nav').contains('About').click()
      cy.url().should('include', '/aboutus')

      cy.get('nav').contains('Contact Us').click()
      cy.url().should('include', '/contactus')

    })

    it('All footer links and endpoints are responding', () => {

      cy.get('[class="site-footer"]').contains('Home').click()
      cy.url().should('include', '/home')

      cy.get('[class="site-footer"]').contains('Directory').click()
      cy.url().should('include', '/directory')

      cy.get('[class="site-footer"]').contains('About').click()
      cy.url().should('include', '/aboutus')

      cy.get('[class="site-footer"]').contains('Contact').click()
      cy.url().should('include', '/contactus')

    })

  })
  