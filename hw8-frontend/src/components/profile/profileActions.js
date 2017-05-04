import { resource } from '../../actions'

export const initProfile = () => {
    return (dispatch) => {
        const user = {}
        const emailPromise = resource('GET', 'email')
        .then((response) => user.email = response.email)
        const zipcodePromise = resource('GET', 'zipcode')
        .then((response) => user.zipCode = response.zipcode)
        const dobPromise = resource('GET', 'dob')
        .then((response) => user.dateOfBirth = new Date(response.dob).toLocaleDateString())
        const avatarPromise = resource('GET', 'avatars')
        .then((response) => user.avatar = response.avatars[0].avatar)
        Promise.all([emailPromise, zipcodePromise, dobPromise, avatarPromise]).then(() => {
            dispatch({type: 'INIT_PROFILE', profile: user})
        })
    }
}

export const updateProfile = (profile) => {
    return (dispatch) => {
        const emailPromise = resource('PUT', 'email', { email: profile.email})
        const zipcodePromise = resource('PUT', 'zipcode', { zipcode: profile.zipCode})
        const passwordPromise = resource('PUT', 'password', { password: profile.password})
        .then((response) => {
            dispatch({type:'UPDATE_INFO', info: response.message})
        })
        Promise.all([emailPromise, zipcodePromise, passwordPromise]).then(() => {
            dispatch(initProfile())
        })
    }
}

// export const postAvatar = (fd) => {
//     return (dispatch) => {
//         resource('PUT', 'avatar', fd, false)
//         .then((response) => {
//             dispatch(initProfile())
//         })
//     }
// }

// The action to update profile avatar (image)
export const postAvatar = (fd) => {
    return (dispatch) => {
        resource('PUT', 'avatar', fd, false)
            .then((response) => {
                const avatar = response.avatar
                dispatch({
                    type: 'UPDATE_AVATAR',
                    img: avatar
                })
                dispatch(initProfile())
            })
    }
}