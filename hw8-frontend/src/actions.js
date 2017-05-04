import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

export const url = 'https://secure-ocean-62748.herokuapp.com'

export const resource = (method, endpoint, payload, isJson=true) => {

    const options =  {
        method,
        credentials: 'include',
    }
    if (isJson) options.headers = { 'Content-Type': 'application/json' }
    if (payload) options.body = isJson ?  JSON.stringify(payload) : payload

    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                // useful for debugging, but remove in production
                // console.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
}

export const succRegisterAction = {
    type: 'REGISTER_INFO',
    info: 'Register Success'
}

export const failRegisterAction = {
    type: 'REGISTER_INFO',
    info: 'Fail to Register'
}

export const toMainAction = {
    type: 'TO_MAIN_PAGE'
}

export default resource