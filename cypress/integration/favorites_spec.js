describe('Accessing and adding favorites', () => {
    it('A non-authorized user can not access favorites', () => {
        cy.visit('/')
        cy.contains('My Favorites').click()
        cy.url().should('include', '/home') //If not logged in, user is redirected to home page when favorites is clicked on
    })

    it('An authorized user can add and remove a favorite', ()=> {
        //should add a before condition of removing "favorites" from the database
        cy.visit('/')
        cy.uiLogin()
        cy.contains('My Favorites').click()
        cy.url().should('include', '/favorites')
        cy.wait(250) //ERROR: Issue with nucampsite application, there are 2 <h4> elements found in the command below if a wait is not added. Troubleshoot if there is a rendering issue in react application.
        cy.get('h4').should('contain', 'You have no favorites selected.') //Assuming the database has been cleared of favorites. POTENTIAL ERROR: Selector should be more specific than <h4>
        cy.contains('Directory').click()
        cy.contains('React Lake Campground').click()
        cy.wait(250) //ERROR: Issue with nucampsite application, there are 2 buttons found in the command below if a wait is not added. Troubleshoot if there is a rendering issue in react application.
        cy.get('button > i[class="fa fa-heart-o"]').should('have.class', 'fa fa-heart-o').click()//Get <i> with specified class that is in a button.
        cy.contains('My Favorites').click()
        cy.url().should('include', '/favorites')
        cy.wait(250) //ERROR: Issue with nucampsite application, there are 2 <h4> elements found in the command below if a wait is not added. Troubleshoot if there is a rendering issue in react application.
        cy.get('h4').should('have.class', 'media-heading').and('contain', 'React Lake Campground')//POTENTIAL ERROR: Using <h4> for this could change making test invalid.
        cy.wait(250) //ERROR: Issue with nucampsite application, there are 2 buttons found in the command below if a wait is not added. Troubleshoot if there is a rendering issue in react application.
        cy.get('button > i[class="fa fa-times"]').should('have.class', 'fa fa-times').click()//Get <i> with specified class that is in a button.
        cy.wait(250) //ERROR: Issue with nucampsite application, there are 2 <h4> elements found in the command below if a wait is not added. Troubleshoot if there is a rendering issue in react application.
        cy.get('h4').should('contain', 'You have no favorites selected.')
    })
})

//logout and in and make sure favorite stay