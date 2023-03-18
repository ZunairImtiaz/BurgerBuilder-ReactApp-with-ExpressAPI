
//  burger builder actions
export const addIngreient = ingName => ({ type: 'AAD_INGREDIENT', ingName });
export const removeIngredient = ingName => ({ type: 'REMOVE_INGREDIENT', ingName });
export const showBackdrop = () => ({ type: 'SHOW_BACKDROP' });
export const hideBackdrop = () => ({ type: 'HIDE_BACKDROP' });
export const showDrawer = () => ({ type: 'SHOW_DRAWER' });
export const hideDrawer = () => ({ type: 'HIDE_DRWAER' });

export const setIngredients = ingredients => ({ type: 'SET_INGREDIENTS', ingredients });