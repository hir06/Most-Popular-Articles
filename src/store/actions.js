import axios from 'axios';
import { dispatch } from 'rxjs/internal/observable/pairs';
export const ARTICLE_DATA_RESOLVING = 'ARTICLE_DATA_RESOLVING';
export const ARTICLE_DATA_RESOLVED = 'ARTICLE_DATA_RESOLVED';
export const ARTICLE_DATA_ERROR = 'ARTICLE_DATA_RESOLVED';

const baseUrl = `https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/`;
let apiKey = 'xpcqd2xKGwcbsRxUPDeDEflzdE2hw82G';

export function articlesResolved(payload) {
    return {
        type: ARTICLE_DATA_RESOLVED,
        payload: payload
    };
}

export function articlesResolving() {
    return {
        type: ARTICLE_DATA_RESOLVING
    };
}

export function articlesError() {
    return {
        type: ARTICLE_DATA_ERROR
    };
}

export function fetchArticles(period) {
    return dispatch => {
        dispatch(articlesResolving());
        axios.get(`${baseUrl}${period}.json?api-key=${apiKey}`)
            .then(
                response => {
                    dispatch(articlesResolved(response.data.results))
                },
                error => dispatch(articlesError())
            )
    }

}

