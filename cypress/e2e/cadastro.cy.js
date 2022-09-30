/// <reference types="Cypress" />

describe("cadastro", () => {
    it.only("Usuario deve se tornar um entregador", () => {
        cy.visit("https://buger-eats.vercel.app")
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

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

        cy.get('input[name="name"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalCode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method).click()

        cy.get('input[accept^="image"]').selectFile(`cypress/fixtures/images/${deliver.cnh}`, {force: true})

        cy.get('form button[type="submit"]').click()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    })

    it("Usuario com CPF incorreto", () => {
        cy.visit("https://buger-eats.vercel.app")
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

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

        cy.get('input[name="name"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalCode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method).click()

        // cy.get('input[accept^="image"]').selectFile(`cypress/fixtures/images/${deliver.cnh}`, {force: true})

        cy.get('form button[type="submit"]').click()

        const expectedMessage = 'Oops! CPF inválido'

        cy.get('.alert-error').should('have.text', expectedMessage)
    })
})
