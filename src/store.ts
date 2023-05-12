import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { takeEvery, debounce } from "redux-saga/effects";
import { QueryChange, ShowDetailLoaded } from "./actions/Show";
import CastReducer from "./reducers/Cast";
import ShowDetailReducer from "./reducers/ShowDetail";
import ShowReducer from "./reducers/ShowReducer";
import { fetchShowDetail } from "./sagas/ShowDetail";
import { fetchShows } from "./sagas/Shows";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  shows: ShowReducer,
  Detail: ShowDetailReducer,
  cast: CastReducer,
});
function* rootSaga() {
  yield debounce(200, QueryChange, fetchShows);
  yield takeEvery(ShowDetailLoaded, fetchShowDetail);
}
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof reducer>;

// const store = createStore(
//   reducer,
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__()
// );

export default store;
