var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: "123456789",
            address: {
                postalCode: "60534470",
                street: "Rua Ana Jorge",
                number: "645",
                district: "Genibaú",
            city_state: "Fortaleza/CE"
            },
            delivery_method: "Moto",
            cnh: "cnh-digital.jpg"
        }

        return data
    }
}
