import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modelsReducer from "./modelsReducer";
import papersReducer from "./papersReducer";
import discussionsReducer from "./discussionsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  models: modelsReducer,
  papers: papersReducer,
  discussions: discussionsReducer,
});

export default rootReducer;
