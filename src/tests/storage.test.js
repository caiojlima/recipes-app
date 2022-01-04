import storage from '../storage';

const favoriteMeal = {
  idMeal: 5,
  strArea: 'a',
  strCategory: 'cat',
  alcoholicOrNot: '',
  strMeal: 'a',
  strMealThumb: 'b',
};
const favoriteDrink = {
  idDrink: 10,
  strArea: 'a',
  strCategory: 'cat',
  alcoholicOrNot: '',
  strDrink: 'a',
  strDrinkThumb: 'b',
};
const responseComida = {
  id: 5,
  type: 'comida',
  area: 'a',
  category: 'cat',
  alcoholicOrNot: '',
  name: 'a',
  image: 'b',
};
const responseBebida = {
  id: 10,
  type: 'bebida',
  area: '',
  category: 'cat',
  name: 'a',
  image: 'b',
};

describe('testa localStorage', () => {
  beforeEach(() => global.localStorage.clear());
  afterEach(() => jest.clearAllMocks());

  test('222', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    storage.saveUserOnStorage('carlao@gmail.com');
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem)
      .toHaveBeenCalledWith('user', JSON.stringify({ email: 'carlao@gmail.com' }));
  });

  test('333', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    storage.saveTokensOnStorage();
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem)
      .toHaveBeenCalledWith('mealsToken', '1');
    expect(setItem)
      .toHaveBeenCalledWith('cocktailsToken', '1');
  });
});

describe('aa', () => {
  beforeEach(() => global.localStorage.clear());
  afterEach(() => jest.clearAllMocks());

  test('Testa o salvamento no a', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    storage.addInProgressRecipe({ id: '12' }, 'meals');
    expect(getItem).toHaveBeenCalledWith('inProgressRecipes');
    expect(setItem)
      .toHaveBeenCalledWith('inProgressRecipes',
        JSON.stringify({ meals: { undefined: [{ id: '12' }] } }));
    const isProgress = storage.isInProgressRecipe('12', 'meals');
    expect(getItem).toHaveBeenCalledWith('inProgressRecipes');
    expect(isProgress).toBe(false);
    // storage.removeProgressRecipe('12');
    // expect(getItem).toHaveBeenCalledWith('inProgressRecipes');
    // expect(setItem).toHaveBeenCalledWith('inProgressRecipes', JSON.stringify([]));
    storage.addToDoneRecipe({ id: '12' });
    expect(getItem).toHaveBeenCalledWith('doneRecipes');
    console.log(getItem.mock.calls);
    const done = storage.isDoneRecipe('12');
    expect(getItem).toHaveBeenCalledWith('doneRecipes');
    expect(done).toBe(true);
    const done2 = storage.isDoneRecipe('1');
    expect(getItem).toHaveBeenCalledWith('doneRecipes');
    expect(done2).toBe(false);
  });
});

describe('', () => {
  beforeEach(() => global.localStorage.clear());
  afterEach(() => jest.clearAllMocks());

  test('Testa o salvamento no localStorage', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    expect(() => storage.addFavoriteRecipe('DIUFUIOAUKEDW'))
      .toThrow();
    storage.addFavoriteRecipe(favoriteMeal, 'comida');
    expect(getItem).toHaveBeenCalledWith('favoriteRecipes');
    expect(setItem)
      .toHaveBeenCalledWith('favoriteRecipes', JSON.stringify([responseComida]));
    storage.addFavoriteRecipe(favoriteDrink, 'bebida');
    expect(setItem.mock.calls[0])
      .toEqual(['favoriteRecipes', JSON.stringify([responseComida])]);
    expect(getItem).toHaveBeenCalledWith('favoriteRecipes');
    expect(setItem.mock.calls[1])
      .toEqual(['favoriteRecipes', JSON.stringify([responseComida, responseBebida])]);
    const isFavorite = storage.isFavoriteRecipe('aaa', 'aaa');
    expect(getItem).toHaveBeenCalledWith('favoriteRecipes');
    expect(isFavorite).toBe(false);
    storage.removeFavoriteRecipe('5');
    expect(getItem).toHaveBeenCalledWith('favoriteRecipes');
    const limit = 3;
    expect(setItem).toHaveBeenCalledTimes(limit);
  });
});
