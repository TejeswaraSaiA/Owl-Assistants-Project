export const messageRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REGISTER_MESSAGE_REQUEST':
            return {
                loading: true
            }
        case 'REGISTER_MESSAGE_REQUEST_SUCCESS':
            return { loading: false, success: true }
        case 'REGISTER_MESSAGE_REQUEST_FAILED':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const messagesGetReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case 'GET_MESSAGE_REQUEST':
            return {...state, loading: true }
        case 'GET_MESSAGE_REQUEST_SUCCESS':
            return {
                messages: action.payload,
                loading: false
            }
        case 'GET_MESSAGE_REQUEST_FAILED':
            return { error: action.payload, loading: false }
        default:
            return state
    }
}