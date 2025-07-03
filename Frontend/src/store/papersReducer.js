const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function papersReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PAPERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PAPERS_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_PAPERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
