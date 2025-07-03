const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function modelsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MODELS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_MODELS_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_MODELS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
