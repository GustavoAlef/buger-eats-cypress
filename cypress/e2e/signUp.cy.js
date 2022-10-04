/// <reference types="Cypress" />
import SignupPage from '../pages/signupPage'
import SignupFactory from '../factories/SignupFactory'

describe("Cadastro", () => {
    var signup = new SignupPage()

    it("Usuario deve se tornar um entregador", () => {

        var deliver = SignupFactory.deliver()

        signup.goTo()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it("Usuario com email incorreto", () => {

        var deliver = SignupFactory.deliver()
        deliver.email = 'email@xx'

        signup.goTo()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Oops! Email com formato inválido.'
        signup.alertMessageShouldBe(expectedMessage)

    })

    it("Usuario com CPF incorreto", () => {

        var deliver = SignupFactory.deliver()
        deliver.cpf = '0001234569x'

        signup.goTo()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Oops! CPF inválido'
        signup.alertMessageShouldBe(expectedMessage)

    })

    context('Campos Obrigatorios', function() {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o e-mail' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'name', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function() {
            signup.goTo()
            signup.submit()
        })

        messages.forEach((msg) => {
            it(`${msg.field} is required`, () => {
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })
})
