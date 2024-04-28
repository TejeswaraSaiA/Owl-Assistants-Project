export const createApplicationReducer = (state = { applications: [] }, action) => {
    switch (action.type) {
        case 'APPLICATION_REQUEST':
            return {...state, loading: true }
        case 'APPLICATION_REQUEST_SUCCESS':
            return {...state,
                applications: [...state.applications, action.payload],
                loading: false
            }
        case 'APPLICATION_REQUEST_FAILED':
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const updateApplicationReducer = (state = { applications: [] }, action) => {
    switch (action.type) {
        case 'APPLICATION_REQUEST':
            return {...state, loading: true }
        case 'APPLICATION_REQUEST_SUCCESS':
            return {...state,
                applications: [...state.applications, action.payload],
                loading: false
            }
        case 'APPLICATION_REQUEST_FAILED':
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

// export const updateApplicationReducer = (state = { applications: [] }, action) => {
//     switch (action.type) {
//         case 'USER_ISSUED_BOOK':
//             return {...state, loading: true }
//         case 'USER_ISSUED_BOOK_SUCCESS':
//             return {
//                 userIssuedBook: action.payload,
//                 loading: false
//             }
//         case 'USER_ISSUED_BOOK_FAILED':
//             return { error: action.payload, loading: false }
//         default:

//             return state
//     }
// }

export const getAllApplicationReducer = (state = { applications: [] }, action) => {
    switch (action.type) {
        case 'GET_APPLICATION_REQUEST':
            return {...state, loading: true }
        case 'GET_APPLICATION_REQUEST_SUCCESS':
            return {
                applications: action.payload,
                loading: false
            }
        case 'GET_APPLICATION_REQUEST_FAILED':
            return { error: action.payload, loading: false }
        default:
            return state
    }
}