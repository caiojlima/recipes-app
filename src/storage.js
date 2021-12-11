/**
 * @name saveTokensOnStorage
 * @description save the meals and cocktails tokens on the 'mealsToken' 'cocktailsToken' localstorage.
 */
const saveTokensOnStorage = () => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
};

/**
 * @name saveUserOnStorage
 * @description save the user email to the localStorage 'user' .
 * @param {string} email { id, type, area, category, alcoholicOrNot, name, image }
 */
const saveUserOnStorage = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

/**
 * @name addFavoriteRecipe
 * @description Add a favorite recipe to the localStorage 'favoriteRecipes' .
 * @param {object} recipe { id, type, area, category, alcoholicOrNot, name, image }
 */
const addFavoriteRecipe = (recipe, type) => {
  const storage = localStorage.getItem('favoriteRecipes');
  let oldRecipes = [];
  if (storage) {
    oldRecipes = JSON.parse(storage);
  }

  if (type === 'comida') {
    const favoriteMeal = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...oldRecipes, favoriteMeal]));
    return;
  }

  if (type === 'bebida') {
    const favoriteDrink = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...oldRecipes, favoriteDrink]));
    return;
  }
  throw new Error('Type incorreto, passe -comida- ou -bebida- ');
};

const isFavoriteRecipe = (idC, typeC) => {
  const storage = localStorage.getItem('favoriteRecipes');
  if (!storage) {
    return false;
  }
  const data = JSON.parse(storage);
  return data.some(({ id, type }) => (id === idC && type === typeC));
};

/**
 * @name editFavoriteRecipe
 * @description edit a favorite recipe to the localStorage 'favoriteRecipes' .
 * @param {object} recipe { id, type, area, category, alcoholicOrNot, name, image }
 */
const editFavoriteRecipe = (recipe) => {
  const storage = localStorage.getItem('favoriteRecipes');
  const listOfRecipes = JSON.parse(storage);
  const newList = listOfRecipes.map((recipeMap) => {
    if (recipe.id === recipeMap.id) {
      const newRecipe = { ...recipeMap, ...recipe };
      return newRecipe;
    }
    return recipeMap;
  });
  localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
};

/**
 * @name removeFavoriteRecipe
 * @description remove a favorite recipe to the localStorage 'favoriteRecipes' .
 * @param {string} id { id, type, area, category, alcoholicOrNot, name, image }
 */
const removeFavoriteRecipe = (id) => {
  const storage = localStorage.getItem('favoriteRecipes');
  const listOfRecipes = JSON.parse(storage);
  const newList = listOfRecipes.filter((recipeMap) => (recipeMap.id !== id));
  localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
};

/**
 * @name addInProgressRecipe
 * @description add a recipe in progress to the localStorage 'inProgressRecipes' .
 * @param {object} recipe { id, type, area, category, alcoholicOrNot, name, image }
 */

const addInProgressRecipe = (recipe, type) => {
  const storage = localStorage.getItem('inProgressRecipes');

  const typeOf = (type === 'meals') ? 'meals' : 'cocktails';
  if (!storage) {
    const content = {
      [typeOf]: [{
        ...recipe,
      }],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...content }));
    return;
  }
  const oldRecipes = JSON.parse(storage);
  const oldType = oldRecipes[typeOf];
  if (oldType) {
    oldRecipes[typeOf] = [
      ...oldType,
      { ...recipe },
    ];
  } else {
    oldRecipes[typeOf] = [
      { ...recipe },
    ];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({ ...oldRecipes }));
};

/**
 * @name editInProgressRecipe
 * @description edit a recipe in progress to the localStorage 'inProgressRecipes' .
 * @param {object} recipe { id, type, area, category, alcoholicOrNot, name, image }
 */
const editInProgressRecipe = (recipe) => {
  const storage = localStorage.getItem('inProgressRecipes');
  const listOfRecipes = JSON.parse(storage);
  const newList = listOfRecipes.map((recipeM) => {
    if (recipe.id === recipeM.id) {
      const newRecipe = { ...recipeM, ...recipe };
      return newRecipe;
    }
    return recipeM;
  });
  localStorage.setItem('inProgressRecipes', JSON.stringify(newList));
};

/**
 * @name removeProgressRecipe
 * @description remove a recipe in progress to the localStorage 'inProgressRecipes' .
 * @param {string} id { id, type, area, category, alcoholicOrNot, name, image }
 */
const removeProgressRecipe = (id) => {
  const storage = localStorage.getItem('inProgressRecipes');
  const listOfRecipes = JSON.parse(storage);
  const newList = listOfRecipes.filter((recipeMap) => (recipeMap.id !== id));
  localStorage.setItem('inProgressRecipes', JSON.stringify(newList));
};

const isInProgressRecipe = (comparedId, type) => {
  const local = localStorage.getItem('inProgressRecipes');
  console.log(local);
  if (!local) {
    return false;
  }
  const recipes = JSON.parse(local);
  if (!recipes[type]) return false;
  return Object.keys(recipes[type]).some((id) => id === comparedId);
};

const addToDoneRecipe = (recipe) => {
  const oldRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!Object.keys(oldRecipe).length) {
    localStorage.setItem('doneRecipes', [recipe]);
    return;
  }
  localStorage.setItem('doneRecipes', JSON.stringify([...oldRecipe, recipe]));
};

const isDoneRecipe = (comparedId) => {
  const doneRecipes = localStorage.getItem('doneRecipes');
  if (!doneRecipes) {
    return false;
  }
  return JSON.parse(doneRecipes).some(({ id }) => id === comparedId);
};

/**
 * @name cleanAllLocalStorage
 * @description clean the localStorage .
 */
const cleanAllLocalStorage = () => {
  localStorage.clear();
};

const storage = {
  addFavoriteRecipe,
  addInProgressRecipe,
  cleanAllLocalStorage,
  editFavoriteRecipe,
  editInProgressRecipe,
  removeFavoriteRecipe,
  removeProgressRecipe,
  saveTokensOnStorage,
  saveUserOnStorage,
  isDoneRecipe,
  addToDoneRecipe,
  isInProgressRecipe,
  isFavoriteRecipe,
};

export default storage;
