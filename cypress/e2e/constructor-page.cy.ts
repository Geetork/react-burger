const ingredientsSelector = '[class^=burger-ingredients_link]';
const dropContainerSelector = '[class^=burger-constructor_scroll__container]';

describe('App is available', () => {
    it('passes', () => {
      cy.visit('')
    })
  })

describe('Construcor page should contain constructor and list of ingredients', function () {
    before(() => {
        cy.visit('')
    });

    it('pass', () => {
        cy.get('h1').contains('Соберите бургер');
        cy.get('button').contains('Оформить заказ');
    });
});

describe('Making order', () => {
    before(() => {
        cy.visit('')
    });

    it('pass', () => {
        const dataTransfer = new DataTransfer();
        cy.get(ingredientsSelector).as('ingredient');
        cy.get(dropContainerSelector).as('constructor');

        cy.get('@ingredient')
          .first()
          .trigger('dragstart', { dataTransfer });
        
        cy.get('@constructor')
          .trigger('drop', { dataTransfer });

        cy.get('@ingredient')
          .last()
          .trigger('dragstart', { dataTransfer });
        
        cy.get('@constructor')
          .trigger('drop', { dataTransfer });

        cy.get('@ingredient')
          .eq(5)
          .trigger('dragstart', { dataTransfer });
        
        cy.get('@constructor')
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
        cy.visit('')
    });

    it('pass', () => {
        cy.get(ingredientsSelector).as('ingredient');

        cy.get('@ingredient')
          .first()
          .click()
          .wait(1000);

        cy.get('[class^=modal_modal__header] > svg')
            .trigger('click')
            .wait(1000);

        cy.get('@ingredient')
          .last()
          .click()
          .wait(1000);

        cy.get('[class^=modal_overlay__]').click({ force: true }).wait(1000);
    });
});
