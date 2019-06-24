const popularData = {
    status: 'INITIAL',
    list: []
}

const reducer = (state = popularData, action) => {
    if (action.type === 'ARTICLE_DATA_RESOLVED') {
        return {
            status: 'RESOLVED',
            list: action.payload
        }
    } 
    if (action.type === 'ARTICLE_DATA_RESOLVING') {
        return {
            status: 'RESOLVING'
        }
    } 
    if (action.type === 'ARTICLE_DATA_ERROR') {
        return {
            status: 'ERROR'
        }
    } 
    return state;
};


export default reducer;