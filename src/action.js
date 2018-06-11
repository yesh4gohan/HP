export const login = function(){
    return{
        type:"LOG_IN",
    }
}
export const logout = function(){
    return{
        type:"LOG_OUT",
    }
}

export const updatePage = function(page_no){
    return {
        type: "PAGE_NO",
        payload:page_no
    }
}

export const setLoader = function(){
    return {
        type: "SET_LOADER"
    }
}

export const unsetLoader = function(){
    return {
        type: "UNSET_LOADER"
    }
}