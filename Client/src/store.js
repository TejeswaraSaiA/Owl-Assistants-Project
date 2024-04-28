import { combineReducers } from 'redux';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


//import { userRegisterReducer, userLoginReducer, getAllStudentReducer, userProfileReducer, getStudentDetailsReducer } from "./reducers/user_reducer"
//import { addBookReducer, getAllBookReducer, getOneBookReducer } from "./reducers/book_reducer"

//getEveryDayBookReducer newly
//import { issueRqquestReducer, getAllIssueBookReqReducer, userIssuedBookReducer, singleIssuedBookReducer, allIssuedBookReducer, getEveryDayBookReducer, returnedBookReducer } from "./reducers/issue_reducer"

import {courseRegisterReducer,getAllCourseReducer} from './reducers/course_reducer'
import {createApplicationReducer,getAllApplicationReducer,updateApplicationReducer} from './reducers/application_reducer'

const rootReducer = combineReducers({
    // userRegisterReducer,
    // userLoginReducer,
    // getAllStudentReducer,
    // userProfileReducer,
    // addBookReducer,
    // getAllBookReducer,
    // issueRqquestReducer,
    // getAllIssueBookReqReducer,
    // userIssuedBookReducer,
    // singleIssuedBookReducer,
    // allIssuedBookReducer,
    // getEveryDayBookReducer,
    // getOneBookReducer,
    // getStudentDetailsReducer,
    // returnedBookReducer
    getAllCourseReducer,
    courseRegisterReducer,
    createApplicationReducer,
    getAllApplicationReducer,
    updateApplicationReducer
})


//const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

// const initialState = {

//     userLoginReducer: { currentUser }
// }
const composedEnhancers = composeWithDevTools({})

const store = createStore(rootReducer, composedEnhancers(applyMiddleware(thunk)))

export default store;