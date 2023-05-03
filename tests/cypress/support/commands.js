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


Cypress.Commands.add("number", () => {
    cy.get(".number_btn").contains("1").click()
    cy.get(".number_btn").contains("0").click()
    cy.get(".number_btn").contains("2").click()
    cy.get(".number_btn").contains("3").click()
    cy.get(".number_btn").contains("4").click()
    cy.get(".number_btn").contains("5").click()
    cy.get(".number_btn").contains("6").click()
    cy.get(".number_btn").contains("7").click()
    cy.get(".number_btn").contains("8").click()
    cy.get(".number_btn").contains("9").click()
    cy.get(".calc_current_number_show").contains("1 023 456 789")
})