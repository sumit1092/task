import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.jsx';

const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export default store;
