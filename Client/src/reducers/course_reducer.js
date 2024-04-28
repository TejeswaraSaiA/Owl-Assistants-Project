export const courseRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REGISTER_COURSE_REQUEST':
            return {
                loading: true
            }
        case 'REGISTER_COURSE_REQUEST_SUCCESS':
            return { loading: false, success: true }
        case 'REGISTER_COURSE_REQUEST_FAILED':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const getAllCourseReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
        case 'GET_COURSE_REQUEST':
            return {...state, loading: true }
        case 'GET_COURSE_REQUEST_SUCCESS':
            return {
                courses: action.payload,
                loading: false
            }
        case 'GET_COURSE_REQUEST':
            return { error: action.payload, loading: false }
        default:
            return state
    }
}
