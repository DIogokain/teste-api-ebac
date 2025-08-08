/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {

  });
})

  it('Deve listar usuários cadastrados', () => {
       cy.wait(1000)
          cy.request({
            method: 'GET',
             url: '/usuarios'
             }).should((Response)=> {
                expect(Response.status).eq(200)
                expect(Response.body).to.have.property('usuarios')
             })
    })    
  it('Deve cadastrar um usuário com sucesso', () => {
       let email= 'Usuario' + Math.floor(Math.random() * 100000000)+'@qa.com.br';
          cy.request({
            method: 'POST',
              url: '/usuarios',
               body: {
                nome: "Fulano da Silva",
                 email: email,
                   password: "teste",
                    administrador: "true"}
              }).then((response) => {
                 expect(response.status).to.eq(201)
                 expect(response.body).to.have.property('message')
  });
});
     it('Deve validar um usuário com email inválido', () => {
       cy.request({
            method: 'POST',
             url: '/usuarios',
              failOnStatusCode: false,
               body: {
                 nome: "Fulano da Silva",
                  email: "emailnvalido.com", 
                   password: "123456",
                    administrador: "true"
    }
             }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.email).eq('email deve ser um email válido')
  });
});

  it.only('Deve editar um usuário previamente cadastrado', () => {
        cy.request({
          method: 'PUT',
          url: '/usuarios' + '/0uxuPY0cbmQhpEz1',
          body: { 
                 "nome": "Fulno",
                   "email": "beltrano@qa.com.br",
                     "password": "teste",
                       "administrador": "true"
}
        }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).eq("Registro alterado com sucesso")
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
  });

})
  
