import { burgerConstructorReducer } from '../services/reducers/burger-constructor';
import * as types from '../services/actions/burger-сonstructor';
import { initialState } from '../services/reducers/burger-constructor';

describe('Burger Constructor reducer', () => {
    test('initial State', () => {
        expect(burgerConstructorReducer(undefined, { type: undefined })).toEqual(initialState)
    })

    test('GET_CONSTRUCTOR_INGREDIENTS', () => {
        const state = initialState;
        expect(burgerConstructorReducer(state, { type: types.GET_CONSTRUCTOR_INGREDIENTS })).toEqual(initialState)
    })

    test('POST_ORDER_REQUEST', () => {
      const state = initialState;
      expect(burgerConstructorReducer(state, { 
        type: types.POST_ORDER_REQUEST,
        order: 10
      })).toEqual({
        ...state,
        orderRequest: true,
        isLoading: true,
      })
    })
    
    test('POST_ORDER_FAILED', () => {
      const state = initialState;
      expect(burgerConstructorReducer(state, { 
        type: types.POST_ORDER_FAILED,
      })).toEqual({
        ...state,
        orderFailed: true,
        isLoading: false,
      })
    })

    test('POST_ORDER_SUCCESS', () => {
      const state = initialState;
      expect(burgerConstructorReducer(state, { 
        type: types.POST_ORDER_FAILED,
        order: '22900',
      })).toEqual({
        ...state,
        orderRequest: false,
        orderFailed: true
      })
    })

    test('ADD_INGREDIENT', () => {
      const state = initialState;
      expect(burgerConstructorReducer(state, { 
        type: types.ADD_INGREDIENT,
        id: "a06d81e2-94a1-4964-8596-cd46ff562bbc",
        ingredient: {
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0
        }
      })).toEqual({
        ...state,
        constructorIngredients: [
            ...state.constructorIngredients,
            {
              id: "a06d81e2-94a1-4964-8596-cd46ff562bbc",
              _id: '643d69a5c3f7b9001cfa0943',
              name: 'Соус фирменный Space Sauce',
              type: 'sauce',
              proteins: 50,
              fat: 22,
              carbohydrates: 11,
              calories: 14,
              price: 80,
              image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
              __v: 0
            }
        ]
      })
    })

    test('ADD_BUN', () => {
      const state = initialState;
      expect(burgerConstructorReducer(state, {
        type: types.ADD_BUN,
        idTop: 'c2ea9ada-99af-44b1-9aa4-f635fa0fcef0',
        idBottom: 'dfd513eb-ef6c-42ac-988e-6ef3b1d9e407',
        ingredient: {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        }
      })).toEqual({
        ...state,
        bun: {
          idTop: 'c2ea9ada-99af-44b1-9aa4-f635fa0fcef0',
          idBottom: 'dfd513eb-ef6c-42ac-988e-6ef3b1d9e407',
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        }
      })
    })

    test('REMOVE_INGREDIENT', () => {
      const state = initialState;
      expect(burgerConstructorReducer(state, { 
        type: types.REMOVE_INGREDIENT,
        id: 2,
      })).toEqual({
        ...state,
        constructorIngredients: []
      })
    })

    test('MOVE_INGREDIENT', () => {
      const state = initialState;
      expect(burgerConstructorReducer(state, { 
        type: types.MOVE_INGREDIENT,
        prevId: 2,
        currentId: 1
      })).toEqual({
        ...state,
        constructorIngredients: [undefined]
      })
    })

    test('CLEAR_CONSTRUCTOR', () => {
      const state = initialState;
      expect(burgerConstructorReducer(state, { 
        type: types.CLEAR_CONSTRUCTOR,
      })).toEqual({
        ...state,
        bun: null,
        constructorIngredients: [],
      })
    })
})
