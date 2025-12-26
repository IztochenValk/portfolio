export const addProduct = (productBoxId: string) => ({
  type: "ADD_PRODUCT",
  product: productBoxId,
});

export const removeProduct = (productBoxId: string) => ({
  type: "REMOVE_PRODUCT",
  product: productBoxId,
});

export const toggleNavProductBox = (productBoxId: string) => ({
  type: "TOGGLE_PRODUCT_BOX",
  productBoxId,
});

export const addMitre = (mitreIds: string[]) => ({
  type: "ADD_MITRE",
  mitre: mitreIds,
});

export const removeMitre = (mitreIds: string[]) => ({
  type: "REMOVE_MITRE",
  mitre: mitreIds,
});

export const savePlan = (products: string[]) => ({
  type: "SAVE_PLAN",
  products,
});
