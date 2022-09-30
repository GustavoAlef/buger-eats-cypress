/// <reference types="Cypress" />

describe("home page", () => {
    it("app deve estar online", () => {
        cy.visit('https://buger-eats.vercel.app')
        cy.get("h1").should("have.text", "Seja um parceiro entregador pela Buger Eat")
    })
})
