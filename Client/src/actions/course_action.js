import axios from "axios";

export const registerCourse = (book) => async(dispatch) => {
    dispatch({
        type: "REGISTER_COURSE_REQUEST",
    });

    try {
        const response = await axios.post("/api/courses/add_course", book);
        // const response2 = await axios.get('/api/books/allBook');

        dispatch({
            type: "REGISTER_COURSE_REQUEST_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "REGISTER_COURSE_REQUEST_FAILED",
            payload: error,
        });
    }
};

export const updateCourse = (book) => async(dispatch) => {
    dispatch({
        type: "GET_COURSE_REQUEST",
    });

    try {
        const response = await axios.post("/api/courses/update_course", book);
        // const response2 = await axios.get('/api/books/allBook');

        dispatch({
            type: "GET_COURSE_REQUEST_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "GET_COURSE_REQUEST_FAILED",
            payload: error,
        });
    }
};
export const getCourse = ()=>async(dispatch) => {
    dispatch({
        type: "GET_COURSE_REQUEST"
    })

    try{
        const response = await axios.get("/api/courses/get_courses");
        dispatch({
            type: "GET_COURSE_REQUEST_SUCCESS",
            payload: response.data,
        });
    }
    catch (error) {
        dispatch({
            type: "GET_COURSE_REQUEST_FAILED",
            payload: error,
        });
    }
}