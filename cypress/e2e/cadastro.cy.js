/// <reference types="Cypress" />
import SignupPage from '../pages/signupPage'

describe("cadastro", () => {
    it("Usuario deve se tornar um entregador", () => {

        var deliver = {
            name: 'citrino',
            cpf: '98765432101',
            email: 'citrino@email.com',
            whatsapp: '123456789',
            address: {
                postalCode: '60534470',
                street: 'Rua Ana Jorge',
                number: '645',
                district: 'Genibaú',
                city_state: 'Fortaleza/CE',
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        var signup = new SignupPage()

        signup.goTo()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it("Usuario com CPF incorreto", () => {

        var deliver = {
            name: 'citrino',
            cpf: '98765432',
            email: 'citrino@email.com',
            whatsapp: '123456789',
            address: {
                postalCode: '60534470',
                street: 'Rua Ana Jorge',
                number: '645',
                district: 'Genibaú',
                city_state: 'Fortaleza/CE',
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        var signup = new SignupPage()

        signup.goTo()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Oops! CPF inválido'
        signup.alertMessageShouldBe(expectedMessage)

    })
})
