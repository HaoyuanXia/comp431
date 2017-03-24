import { resource } from '../../actions'

export const initProfile = () => {
    return (dispatch) => {
        const user = {
            displayName: 'Sammy'
        }
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
        Promise.all([emailPromise, zipcodePromise, passwordPromise]).then(() => {
            dispatch(initProfile())
        })
    }
}