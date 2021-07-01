
describe('Leaving comments', () => {
    it('checks that a non-authorized user can not post a comment', () => {
        cy.visit('/') 
        cy.contains('Directory').click()
        cy.contains('React Lake Campground').click()
        cy.contains('Submit Comment').click()
        cy.get('textarea[name="text"]').type('Cypress test comment: user NOT logged in')
        cy.get('select').select('3').should('have.value', '3')
        cy.get('button[value="submit"]').click()
        
        cy.on('window:alert', (alertText) => { //POTENTIAL ERROR: does not account for the scenario of the alert window not popping up (remove "cy.get('button[value="submit"]').click()" for example problem)
            expect(alertText).to.contain('Your comment could not be posted')
        })
        cy.contains('div', 'Comments').should('not.contain', 'NOT')//POTENETIAL ERROR: Gets the column the comments are in and makes sure the test comment, which includes 'NOT', is not present. Need a better selector than the element because it could change.
    })


    it('checks that an authorized user can post a comment', () => {
        //Below UI login to be replaced with "cy.login()" when working
        cy.uiLogin() 
        //End UI login
        cy.contains('Directory').click()
        cy.contains('React Lake Campground').click()
        cy.contains('Submit Comment').click()
        cy.get('textarea[name="text"]').type('Cypress test comment: user IS logged in')
        cy.get('select').select('3').should('have.value', '3')
        cy.get('button[value="submit"]').click()
        cy.contains('div', 'Comments').should('contain', 'IS')//POTENETIAL ERROR: Gets the column the comments are in and makes sure the test comment, which includes 'IS', is present. Need a better selector than the element because it could change.
        //Test that the date & author is correct?
    })
//Need to erase comments in database after tests
})
