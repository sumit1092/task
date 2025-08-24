import app from './slices/appSlice.jsx';
import auth from './slices/authSlice.jsx';
import task from './slices/taskSlice.jsx';

const rootReducer = { app, auth, task };
export default rootReducer;
