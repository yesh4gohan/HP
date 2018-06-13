const initialState = {
                    loggedin:false,
                    currentPage:1,
                    loader:false     
                };
export const reducer = function(state = initialState,action){
    
    switch(action.type){
        
        case "LOG_IN":
        return Object.assign({},state,{loggedin:true})
        case "LOG_OUT":
        return Object.assign({},state,{loggedin:false})
        case "PAGE_NO":
        return Object.assign({},state,{currentPage:action.payload})
        case "SET_LOADER":
        return Object.assign({},state,{loader:true})
        case "UNSET_LOADER":
        return Object.assign({},state,{loader:false})
        default:
        return{
            state
        }
    }
}