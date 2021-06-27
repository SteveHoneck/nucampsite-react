
describe('Leaving comments', () => {
    it('checks that a non-authorized user can not post a comment', () => {
        cy.visit('/') 
        cy.contains('Directory').click()
        cy.contains('React Lake Campground').click()
        cy.contains('Submit Comment').click()
        cy.get('textarea[name="text"]').type('Cypress test comment: user NOT logged in')
        cy.get('select').select('3').should('have.value', '3')
        cy.get('button[value="submit"]').click()
        cy.get('[class="col-md-5 m-1"]').children().should('not.contain', 'NOT')//POTENETIAL ERROR: Gets the column the comments are in, need a better selector than the class because it could change or be used somewhere else. A better way to do this is to verify if the browser alert pops up.
    })

    it('checks that an authorized user can post a comment', () => {
        //Below UI login to be replaced with "cy.login()" when working
        cy.visit('/') 
        cy.contains('Login').click() 
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('password') 
        cy.get('button[value="submit"]').click()
        cy.get('div[class="navbar-text mr-3"]').should('contain', 'admin') 
        //End UI login
        cy.contains('Directory').click()
        cy.contains('React Lake Campground').click()
        cy.contains('Submit Comment').click()
        cy.get('textarea[name="text"]').type('Cypress test comment: user IS logged in')
        cy.get('select').select('3').should('have.value', '3')
        cy.get('button[value="submit"]').click()
        cy.get('[class="col-md-5 m-1"]').children().should('contain', 'IS')//POTENETIAL ERROR: Gets the column the comments are in, need a better selector than the class because it could change or be used somewhere else.
        //Test that the comment exists and that the date & author is correct
    })

//Need to erase comments in database after tests
})




/* 
Navigate to directory
navigate to a campsite
click on comment button
change rating
type in comment
hit submit
verify it can not be submitted
*/
