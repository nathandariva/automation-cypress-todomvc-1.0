/// <reference types="cypress" />
describe('Platform Scenarios - TODO', () => {

  const newItem = [
    {
      field: 'Feed the cat',
    },
    {
      field: 'Walk the dog',
    },
    {
      field: 'Wash the tesla model',
    },
    {
      field: 'Walk the camel',
    }
  ]

  it('Shoul validate that it does not display any items listed', () => {
    cy.visit('https://todomvc.com/examples/vue/')

    cy.get('.todo-list li').should('not.exist')
  })

  it('Should validate adding items to the list and validate quantity', () => {

    newItem.map(fill => {
      cy.get('.header input').type(`${fill.field}{enter}`)
    })

    cy.get('.todo-list li')
      .should('have.length', newItem.length)
  })

  it('Should validate mark an item as completed and check it in the completed tab', () => {

    cy.contains('Walk the camel')
      .parent()
      .find('input[type=checkbox]')
      .check()

    cy.get('.footer')
      .contains('Completed')
      .click()

    cy.get('.completed')
      .should('be.visible', 'Walk the camel')
  })

  it('Should validate check in the active tab that completed tasks are not visible', () => {
    cy.get('.footer')
      .contains('Active')
      .click()

    cy.get('.todo-list li div label')
      .should('be.visible')
      .and('not.contain', 'Walk the camel')
  })

  it('Should validate editing of an item in the list', () => {
    cy.contains('Walk the dog')
      .dblclick()

    cy.get('.editing')
      .clear()
      .type(`Feed the dragon{enter}`)

    cy.get('.todo-list li div label')
      .should('be.visible')
      .and('not.contain', 'Walk the dog')
      .and('contain', 'Feed the dragon')
  })

  it('Should complete all in active tab', () => {

    for (let i = 2; i >= 0; i--) {
      cy.get('.todo-list li')
        .find('input[type=checkbox]')
        .eq(i)
        .check()
    }

    cy.get('.todo-list li').should('not.exist')
  })

  it('Should validate the cleaning of completed', () => {

    cy.get('.footer')
      .contains('Completed')
      .click()

    cy.get('.todo-list').children().should('have.length', 4)
    cy.get('.clear-completed').click()

    cy.get('.todo-list li').should('not.exist')
  })
})
