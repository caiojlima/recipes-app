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
const addFavoriteRecipe = (recipe) => {
  const storage = localStorage.getItem('favoriteRecipes');
  if (!storage) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
    return;
  }
  const oldRecipes = JSON.parse(storage);
  localStorage.setItem('favoriteRecipes', JSON.stringify([...oldRecipes, recipe]));
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
const addInProgressRecipe = (recipe) => {
  const storage = localStorage.getItem('inProgressRecipes');
  if (!storage) {
    localStorage.setItem('inProgressRecipes', JSON.stringify([recipe]));
    return;
  }
  const oldRecipes = JSON.parse(storage);
  localStorage.setItem('inProgressRecipes', JSON.stringify([...oldRecipes, recipe]));
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
};

export default storage;
