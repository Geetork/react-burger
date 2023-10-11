describe('App is available', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000')
    })
  })

describe('Construcor page should contain constructor and list of ingredients', function () {
    before(() => {
        cy.visit('http://localhost:3000')
    });

    it('pass', () => {
        cy.get('h1').contains('Соберите бургер');
        cy.get('button').contains('Оформить заказ');
    });
});

describe('Making order', () => {
    before(() => {
        cy.visit('http://localhost:3000')
    });

    it('pass', () => {
        const dataTransfer = new DataTransfer();

        cy.get('.burger-ingredients_link__LmvJj')
          .first()
          .trigger('dragstart', { dataTransfer });
        
        cy.get('.burger-constructor_scroll__container__zfC6x')
          .trigger('drop', { dataTransfer });

        cy.get('.burger-ingredients_link__LmvJj')
          .last()
          .trigger('dragstart', { dataTransfer });
        
        cy.get('.burger-constructor_scroll__container__zfC6x')
          .trigger('drop', { dataTransfer });

        cy.get('#ingredients__container > div:nth-child(2) > div > a:nth-child(1)')
          .trigger('dragstart', { dataTransfer });
        
        cy.get('.burger-constructor_scroll__container__zfC6x')
          .trigger('drop', { dataTransfer });

        cy.get('button').contains('Оформить заказ').click();

        cy.get('form').within(($form) => {
            cy.get('input[name="email"]').type('galinaleespb@gmail.com');
            cy.get('input[name="password"]').type('123456');
            cy.root().submit();
        });

        cy.get('button')
            .contains('Оформить заказ')
            .click();

        cy.wait(17000);
        cy.get('body').type('{esc}');
    });
});

describe('Modals work correctly', function () {
    before(() => {
        cy.visit('http://localhost:3000')
    });

    it('pass', () => {
        cy.get('.burger-ingredients_link__LmvJj')
          .first()
          .click()
          .wait(1000);

        cy.get('#modal > div > div.modal_modal__sEyJW > div > div.modal_modal__header__L0UuA > svg')
            .trigger('click')
            .wait(1000);

        cy.get('.burger-ingredients_link__LmvJj')
          .last()
          .click()
          .wait(1000);

        cy.get('.modal_overlay__FS5nI').click({ force: true }).wait(1000);
    });
});
