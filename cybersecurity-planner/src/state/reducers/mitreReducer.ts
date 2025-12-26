const initialState = {
  selectedProducts: [],
  selectedMitre: [],
};

export default function mitreReducer(state = initialState, action: any) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, selectedProducts: [...state.selectedProducts, action.product] };
    case "REMOVE_PRODUCT":
      return { ...state, selectedProducts: state.selectedProducts.filter(p => p !== action.product) };
    case "ADD_MITRE":
      return { ...state, selectedMitre: [...state.selectedMitre, ...action.mitre] };
    case "REMOVE_MITRE":
      return { ...state, selectedMitre: state.selectedMitre.filter(id => !action.mitre.includes(id)) };
    default:
      return state;
  }
}
