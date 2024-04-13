import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { newStudentReducer, studentDetailsReducer, studentReducer } from './reducers/studentReducer';
import { courseDetailsReducer, courseReducer, newCourseReducer } from './reducers/courseReducer';
import { resultReducer, newResultReducer, resultDetailsReducer } from './reducers/resultReducer';
import { userReducer } from './reducers/userReducer';


const reducer = combineReducers({
  students: studentReducer,
  newStudent: newStudentReducer,
  student : studentDetailsReducer,

  courses: courseReducer,
  newCourse: newCourseReducer,
  course : courseDetailsReducer,

  results: resultReducer,
  newResult: newResultReducer,
  result: resultDetailsReducer,

  user: userReducer,
});


let preloadedState = {
  
};


const store = configureStore({
  reducer, preloadedState,
});

export default store;