describe('Loggin a user in and out', () => {
    it('logs the user in and checks for username in header', () => {
        cy.visit('/') //visit the homepage

        cy.contains('Login').click() //POTENTIAL ERROR: check to see if this can grab the hidden model with the login button also

        cy.get('input[name="username"]').type('admin') //Username 'admin' is already in the database
        cy.get('input[name="password"]').type('password') //Password 'password' is already in the database
        cy.get('button[value="submit"]').click() //Use this method because possiblity of 2 buttons that 'contain' 'login' text, but only the one needed has 'submit'
        
        cy.get('div[class="navbar-text mr-3"]').should('contain', 'admin') //POTENTIAL ERROR: Logging the user in creates a <div> element that displays the username, there is nothing unique about the <div> other than the class. it is very possible on the page or in the future that some other <div> will have this class and could mess up this test
    })
    
    
    it('logs the user out and checks that username is no longer in header', () => {
        cy.contains('Logout').click()
        cy.get('div[class="navbar-text mr-3"]').should('not.exist')//POTENTIAL ERROR: Check that the <div> with the username no longer exists. It is very possible on the page or in the future that some other <div> will have this class and could mess up this test.
    })
    
})

//Add check for JWT?
//Add check for invalid user name & password


