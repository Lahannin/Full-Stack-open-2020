describe('Blog app', function() {
  beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Testi Testaaja',
        username: 'testaaja',
        password: 'testi'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.get('#loginForm')    
    })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
      cy.get('#logOut')  
    })

   it('fails with wrong credentials', function() {
    cy.get('#username').type('testaaja')
    cy.get('#password').type('väärin')
    cy.get('#login-button').click()
    cy.get('#message').contains('Wrong username or password')
    cy.get('#message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
    
  describe('When logged in', function() {
      
      beforeEach(function() {
        cy.get('#username').type('testaaja')
        cy.get('#password').type('testi')
        cy.get('#login-button').click()
      })
      
      it('A blog can be created', function() {

        cy.contains('new blog').click()
        cy.get('#title').type('Testataan')
        cy.get('#author').type('Testaaja')
        cy.get('#url').type('test.fi')
        cy.get('#submit').click()

        cy.contains('Testataan')
        cy.contains('Testaaja')
        
      })
      it('A blog can be liked', function() {
       
        cy.contains('new blog').click()
        cy.get('#title').type('Testataan')
        cy.get('#author').type('Testaaja')
        cy.get('#url').type('test.fi')
        cy.get('#submit').click()

        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('#fullinfo').contains('Likes: 1')
        
      })

      it('A blog can be deleted', function() {
       
        cy.contains('new blog').click()
        cy.get('#title').type('Testataan')
        cy.get('#author').type('Testaaja')
        cy.get('#url').type('test.fi')
        cy.get('#submit').click()

        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('#fullinfo').contains('Likes: 1')

        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'testataan')
        
        
      })
    })
  
  })