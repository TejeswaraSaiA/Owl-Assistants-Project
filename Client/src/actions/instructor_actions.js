import axios from "axios";
export const getMessages = ()=>async(dispatch) => {
    dispatch({
        type: "GET_MESSAGE_REQUEST"
    })

    try{
        const response = await axios.get("/api/messages",);
        dispatch({
            type: "GET_MESSAGE_REQUEST_SUCCESS",
            payload: response.data,
        });
    }
    catch (error) {
        dispatch({
            type: "GET_MESSAGE_REQUEST_FAILED",
            payload: error,
        });
    }
}

export const setMessages = (message) => async(dispatch) => {
    dispatch({
        type: "REGISTER_MESSAGE_REQUEST",
    });

    try {
        const response = await axios.post("/api/messages", message);
        // const response2 = await axios.get('/api/books/allBook');

        dispatch({
            type: "REGISTER_MESSAGE_REQUEST_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "REGISTER_MESSAGE_REQUEST_FAILED",
            payload: error,
        });
    }
};