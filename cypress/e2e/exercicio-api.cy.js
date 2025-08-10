/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(reponse =>{
      return contrato.validateAsync(reponse.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
       cy.request({
          method: 'GET',
          url: '/usuarios'
   }).should((Response)=> {
      expect(Response.status).eq(200)
      expect(Response.body).to.have.property('usuarios')
   })

  });


  it('Deve cadastrar um usuário com sucesso', () => {
      let email= 'Usuario' + Math.floor(Math.random() * 100000000)+'@qa.com.br';
       cy.cadastroUsuario("Fulano da Silva",email, "teste")
         .then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('message')
  });

  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastroUsuario("Fulano da Silva","beltrano@qa.com.br", "teste")
    .should((response) => {
     expect(response.status).to.eq(400);
     expect(response.body.message).to.equal('Este email já está sendo usado')
  });

  });


  it('Deve editar um usuário previamente cadastrado', () => {
     let email= 'Usuario' + Math.floor(Math.random() * 100000000)+'@qa.com.br';
       cy.cadastroUsuario("Fulano da Silva",email, "teste")
       .then(response =>{
        let id = response.body._id
        cy.request({
        method: 'PUT',
        url: `/usuarios/${id}`,
        body: { 
        "nome": "Fulano da Silva",
        "email": email,
        "password": "teste",
        "administrador": "true"},
      }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).eq("Registro alterado com sucesso")
 });

  });

  })

   it('Deve deletar um usuário previamente cadastrado', () => {
      cy.cadastroUsuario("Produto a ser Deletado", "Kaino@gmail.com", "123456")
      .then(response =>{
        let id = response.body._id
        cy.request({
         method: "DELETE",
         url:`usuarios/${id}`,
        }).then(response =>{
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Registro excluído com sucesso")
        }) 
      })
    });
  })
