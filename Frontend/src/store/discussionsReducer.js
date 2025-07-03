const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function discussionsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DISCUSSIONS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_DISCUSSIONS_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_DISCUSSIONS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
