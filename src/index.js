import api from './../api/api.js'
import css from "./style.css"

// api.getCep("99700252").then((result) => {
//  console.log(result)
// })

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {

    // this.firstName = ko.observable("Example")
    // this.lastName = ko.observable("Example")
    // this.firstName.extend({ required: true})

    this.firstName = ko.observable("").extend({ 
        required: {
    		params: true,
    		message: "Favor preencher!"
    	},
        pattern: {
    		params: "^[A-Z a-z À-ú]+$",
    		message: "Somente letras!",
    	}
    })

    // --- Last Name ---
    this.lastName = ko.observable("").extend({
        required: {
    		params: true,
    		message: "Favor preencher!"
    	},
        pattern: {
    		params: "^[A-Z a-z À-ú]+$",
    		message: "Somente letras!",
    	}   	
    })

    // --- DDD ---
    this.ddd = ko.observable("").extend({
        required: {
    		params: true,
    		message: "Favor preencher!"
    	},
        pattern: {
    		params: "^[0-9]+$",
    		message: "Somente numeros!",
    	},
    	minLength: {
    		params: 2,
    		message: "{0} dígitos!"
    	},
    	maxLength: {
    		params: 2,
    		message: "{0} dígitos!"
    	} 	
    })

    // --- Phone --- 
    this.phone = ko.observable("").extend({
        required: {
    		params: true,
    		message: "Favor preencher!"
    	},
        pattern: {
    		params: "^[0-9]+$",
    		message: "Somente numeros!",
    	},
    	minLength: {
    		params: 9,
    		message: "Deve conter {0} dígitos!"
    	},
    	maxLength: {
    		params: 9,
    		message: "Deve conter {0} dígitos!"
    	}    	
    })

    // --- CEP "zipcode" --- 
    this.cep = ko.observable(null).extend({
        required: {
    		params: true,
    		message: "Favor Preencher!"
    	}  
    })

    // --- Address --- 
    this.address = ko.observable("").extend({
        required: {
    		params: true,
    		message: "Favor preencher!"
    	},
        pattern: {
    		params: "^[A-Z a-z À-ú 0-9]+$",
    		message: "Somente letras e numeros!",
    	}   	
    })

    // --- House Number --- 
    this.addressNumber = ko.observable("").extend({
        required: {
    		params: true,
    		message: "Favor preencher!"
    	},
        pattern: {
    		params: "^[0-9]+$",
    		message: "Somente Numeros!",
    	}
    })
    
    // --- Complement --- 
    this.complement = ko.observable("")

    // --- District --- 
    this.district = ko.observable("").extend({
        required: {
    		params: true,
    		message: "Favor preencher!"
    	},
        pattern: {
    		params: "^[A-Z a-z À-ú]+$",
    		message: "Somente letras!",
    	}  	 	
    })
    // --- City ---
    this.city = ko.observable("").extend({
        required: {
    		params: true,
    		message: "Favor preencher!"
    	},
        pattern: {
    		params: "^[A-Z a-z À-ú]+$",
    		message: "Apenas letras!",
    	}   	   	
    })

    // --- State --- 
    this.uf = ko.observable("").extend({
        required: {
    		params: true,
    		message: "Favor Preencher!"
    	},        
        pattern: {
    		params: "^[A-Z a-z]+$",
    		message: "Apenas letras!",
    	},
    	minLength: {
    		params: 2,
    		message: "Deve conter somente {0} dígitos!"
    	},
    	maxLength: {
    		params: 2,
    		message: "Deve conter somente {0} dígitos!"
    	}    	   
    })
       
    // --- Get CEP ---
    this.apiHasNoReturn = ko.observable(true)
    this.validateCep = () => {
        console.log("Searching CEP...")
        api.getCep(this.cep()).then((result) => {
            console.log("SUCESS!")
            if (!Object.keys(result).includes('erro')) {
                this.district(result.bairro)
                this.ddd(result.ddd)
                this.city(result.localidade)
                this.address(result.logradouro)
                this.uf(result.uf)
                this.apiHasNoReturn(false)
            } else {
                this.apiHasNoReturn(true)
                alert('CEP inválido, insira os dados manualmente!')
            }
        }).catch((error) => {
            this.apiHasNoReturn(true)
            alert('Erro inesperado, insira os dados manualmente!')
        })
    }  

    // --- Validate ---
    this.validate = ko.pureComputed(() => {
            return this.firstName.isValid() &&
            this.lastName.isValid() &&
            this.ddd.isValid() &&
            this.phone.isValid() &&
            this.cep.isValid() &&
            this.address.isValid() &&
            this.addressNumber.isValid() &&
            this.district.isValid() &&
            this.city.isValid()
    }, this)
    this.submitForm = () => {
        console.log("Generating JSON...")
        console.log({
            firstName: this.firstName(),
            lastName : this.lastName(),
            phone : this.ddd() + this.phone(),
            cep: Number(this.cep()),
            address : this.address(),
            number : Number(this.addressNumber()),
            complement : this.complement(),
            district: this.district(),
            city : this.city(),
            state: this.uf()
          })
    }
}

const appViewModel = new AppViewModel()

// can be used in the navigation console
window.appViewModel = appViewModel

// Activates knockout.js
ko.applyBindings(appViewModel)
