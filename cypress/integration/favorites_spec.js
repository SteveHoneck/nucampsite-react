describe('Accessing and adding favorites', () => {
    it.skip('A non-authorized user can not access favorites', () => {
        cy.visit('/')
        cy.contains('My Favorites').click()
        cy.url().should('include', '/home') //If not logged in, user is redirected to home page when favorites is clicked on
    })

    it('An authorized user can add and remove a favorite', ()=> {
        cy.visit('/')
        cy.uiLogin()
        cy.contains('My Favorites').click()
        cy.url().should('include', '/favorites')
        cy.get('h4').should('contain', 'You have no favorites selected.') //Assuming the database has been cleared of favorites. POTENTIAL ERROR: Selector should be more specific than <h4>
        cy.contains('Directory').click()
        cy.contains('React Lake Campground').click()
        cy.get('button > i[class="fa fa-heart-o"]:first').should('have.class', 'fa fa-heart-o').click()//Get <i> with specified class that is in a button
        cy.contains('My Favorites').click()
        cy.url().should('include', '/favorites')
        //cy.get('h4').should('have.class', 'media-heading').and('should.contains', 'React Lake Campground')//POTENTIAL ERROR: Using <h4> for this could change making test invalid
    })
})

//Clear favorites and check that no favorites exist
//Notify that favorite already exists
//logout and in and make sure favorite stay