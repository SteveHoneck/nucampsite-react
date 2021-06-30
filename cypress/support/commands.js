// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//Command to login using the UI, not best practice

Cypress.Commands.add('uiLogin', () => { 
    cy.visit('/') 
    cy.contains('Login').click() 
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('password') 
    cy.get('button[value="submit"]').click()
    cy.get('div[class="navbar-text mr-3"]').should('contain', 'admin') 
})


//Command to programatically log in (NOT WORKING)
Cypress.Commands.add('login', () => {
    cy.request({
        url: "https://localhost:3443/users/login",
        method: 'POST',
        body: {"username":"admin","password":"password"}
    })
    .its('body')
    .then(res => localStorage.setItem('jwt', res.token))
    localStorage.setItem('creds', JSON.stringify({"username":"admin","password":"password"}))
    cy.visit('/') 

    /*
    Other login attempts (would go in the test itself, not necessarily a command), not working:

    let user
    before(function fetchUser () {
        cy.request('POST', 'https://localhost:3443/users/login',
            {"username":"admin","password":"password"}
        )
        
        .its('body')
        .then((res) => {
            user = res.token
            console.log('user: ', user)
        })
        

    })

    beforeEach(function setUser () {
        cy.visit('/', {
            onBeforeLoad (win) {
            // and before the page finishes loading
            // set the user object in local storage
            win.localStorage.setItem('user', user)
            },
        })
        // the page should be opened and the user should be logged in
    })

    describe('Leaving comments', () => {
        it('checks that a logged in user can post a comment', () => {
            cy.request({
                url: '/directory/5f02803a258ff350affd3602',
                auth: {
                bearer: user,
                },
            })
            
            //cy.visit('/directory/5f02803a258ff350affd3602')
        })
    })
    */
})