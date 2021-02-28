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

    var self = this;
    
    // ---- Name ------

    self.userName = ko.observable().extend({ 
        required: {
            params: true,
            message: "O campo Nome é obrigatório!"
        },
            minLength: {
                params: 2,
                message: "O nome deve ter pelo menos 2 letras"
            },
                pattern: {
                    params: "^[A-Za-zÀ-ú ']+$",
                    message: "O nome deve ser composto somente de letras"
                }
    });

    // ---- Lastname ------
        
    self.userLastname = ko.observable().extend({
        required: {
            params: true,
            message: "O campo Sobrenome é obrigatório!"
        },
            minLength: {
                params: 2,
                message: "O sobrenome deve ter pelo menos 2 letras"
            },
                pattern: {
                    params: "^[A-Za-zÀ-ú ']+$",
                    message: "O sobrenome deve ser composto somente de letras"
                }
    });

    // ---- DDD ------

    self.userDDD = ko.observable().extend({
        required: {
            params: true,
            message: "O campo DDD é obrigatório!"
        },
            number: {
                params: true,
                message: "O DDD deve ser composto somente por números"
            },
                minLength: {
                    params: 2,
                    message: "O DDD deve ter 2 números"
                },
                    maxLength: {
                        params: 2,
                        message: "O DDD deve ter 2 números"
                    }
    });

    // ---- cep ------

    self.cep = ko.observable().extend({
        required: {
            params: true,
            message: "O campo CEP é obrigatório!"
        },
            minLength: {
                params: 9,
                message: "O CEP deve ter 8 números e hífen"
            },
                maxLength: {
                    params: 9,
                    message: "O CEP deve ter 8 números e hífen"
                },
                    pattern: {
                        params: "^[0-9]{5}-[0-9]{3}$", 
                        message: "O CEP deve estar no formato XXXXX-XXX, formado somente por números e hífen"
                    }
    });

 // if (dados.uf == "RS") {
                //     dados.uf = "Rio Grande do Sul"
                //     $("#validationCustom05").val(dados.uf);
                // }

    // ----- celNumber ------

    self.userCel = ko.observable().extend({
        required: {
            params: true,
            message: "O campo telefone é obrigatório"
        },
            minLength: {
                params: 9,
                message: "O telefone deve ter 9 números"
            },
                maxLength: {
                    params: 9,
                    message: "O telefone deve ter somente 9 números"
                },
                    number: {
                        params: true,
                        message: "O telefone deve ser composto somente de números"
                    }
    });

    // ----- Address ------

    self.userAddress = ko.observable().extend({
        required: {
            params: true,
            message: "O campo endereço é obrigatório!"
        },
            minLength: {
                params: 5,
                message: "O endereço é muito curto"
            },
                pattern: {
                    params: "^[A-Za-zÀ-ú0-9 ']+$",
                    message: "O endereço deve ser composto somente de letras e números"
                }
    });

    // ----- houseNumber ------

    self.userNumber = ko.observable().extend({
        required: {
            params: true,
            message: "O campo número é obrigatório!"
        },
            pattern: {
                params: "^[A-Za-zÀ-ú0-9 ']+$", 
                message: "O campo número pode ser preenchido com letras e números"
            },
                minLength: {
                    params: 1,
                    message: "O número é muito curto"
                },
                    maxLength: {
                        params: 12,
                        message: "O número é muito grande"
                    }
    });

    // ----- Complement ------

    self.userComplement = ko.observable().extend({
        pattern: {
            params: 1,
            message: "O complemento deve conter letras, números e hífens"
        },
            minLength: {
                params: 2,
                message: "O complemento é muito curto"
            }
    });

    // ----- neighborHood ------

    self.userHood = ko.observable().extend({
        required: {
            params: true,
            message: "O campo bairro é obrigatório!"
        },
            pattern: {
                params: "^[A-Za-zÀ-ú ']+$",
                message: "O bairro deve ser composto somente de letras"
            },
                minLength: {
                    params: 5,
                    message: "O bairro é muito curto"
                }
    });

    // ----- City ------

    self.userCity = ko.observable().extend({
        required: {
            params: true,
            message: "O campo cidade é obrigatório!"
        },
            pattern: {
                params: "^[A-Za-zÀ-ú ']+$",
                message: "A cidade deve ser composto somente de letras"
            },
                minLength: {
                    params: 5,
                    message: "A cidade é muito curto"
                }
    });

    // ----- State ------

    self.userState = ko.observable().extend({
        required: {
            params: true,
            message: "O campo estado é obrigatório!"
        },
            pattern: {
                params: "^[A-Z a-z]+$",
                message: "O estado deve ser composto somente de letras"
            },
                minLength: {
                    params: 2,
                    message: "O estado deve estar no formato de UF (XX)"
                },
                    maxLength: {
                        params: 2,
                        message: "O estado deve estar no formato de UF (XX)"
                    }
    });

    // ----- Rule ------

    self.buttonCep = function () {
        self.deuErro = ko.validation.group([self.userName, self.userLastname, self.userCel, self.userDDD, self.cep]);    
        if (self.deuErro().length === 0) {
            var cepDigitado = appViewModel.cep();
            api.getCep(cepDigitado).then((result) => {
                self.userAddress(result.logradouro);
                self.userCity(result.localidade);
                self.userHood(result.bairro);
                self.userState(result.uf);
                self.cep(result.cep);
                self.userComplement(result.complemento);
                
                    $("#send").removeAttr("disabled");

                        if(self.userCity().length !== 0) 
                            $("#validationCustom04").attr("disabled", "disabled");

                        if(self.userState().length !== 0) 
                            $("#validationCustom05").attr("disabled", "disabled");
                        
                        if(self.userHood().length !== 0)  
                            $("#validationCustom07").attr("disabled", "disabled");
                        else 
                            $("#validationCustom07").removeAttr("disabled");
                        
                        if(self.userAddress().length !== 0)  
                            $("#validationCustom09").attr("disabled", "disabled");
                        else 
                            $("#validationCustom09").removeAttr("disabled");
                        
                        if(self.userComplement().length !== 0)  
                            $("#validationCustom011").attr("disabled", "disabled");
                        else 
                            $("#validationCustom011").removeAttr("disabled");                          
            })
        }
        else

            self.deuErro.showAllMessages();   
    }

    // JSON

    self.send = function() {
        self.deuErro = ko.validation.group([self.userName, self.userLastname, self.userCel, self.userDDD, self.cep, self.userAddress, self.userNumber, self.userComplement, self.userHood, self.userCity, self.userState]);
         console.log("Enviando dados...")
            if (self.deuErro().length === 0) {
                console.log("SUCESS")
                var dados = {
                    "Nome": self.userName(),
                    "Sobrenome": self.userLastname(),
                    "DDD": self.userDDD(),
                    "Telefone": self.userCel(),
                    "CEP": self.cep(),
                    "Endereço": self.userAddress(),
                    "Número": self.userNumber(),
                    "Complemento": self.userComplement(),
                    "Bairro": self.userHood(),
                    "Cidade": self.userCity(),
                    "Estado": self.userState()
                }
                console.log(dados);
            }
    }
}               
 
const appViewModel = new AppViewModel()

// can be used in the navigation console
window.appViewModel = appViewModel
ko.validation.init();

// Activates knockout.js
ko.applyBindings(appViewModel)
