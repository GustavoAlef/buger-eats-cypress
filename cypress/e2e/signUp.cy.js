/// <reference types="Cypress" />
import SignupPage from '../pages/signupPage'

describe("Cadastro", () => {
    var signup = new SignupPage()
    let deliver;
    beforeEach(() => {
        cy.fixture('deliver').then((data) => {
            deliver = data
        })
    })

    it("Usuario deve se tornar um entregador", () => {

        signup.goTo()
        signup.fillForm(deliver.signup)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it("Usuario com email incorreto", () => {

        signup.goTo()
        signup.fillForm(deliver.email_invalido)
        signup.submit()

        const expectedMessage = 'Oops! Email com formato inválido.'
        signup.alertMessageShouldBe(expectedMessage)

    })

    it("Usuario com CPF incorreto", () => {

        signup.goTo()
        signup.fillForm(deliver.cpf_invalido)
        signup.submit()

        const expectedMessage = 'Oops! CPF inválido'
        signup.alertMessageShouldBe(expectedMessage)

    })
})
