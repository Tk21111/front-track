import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user : null , token: null , aka : null , image : null},
    reducers: {
        setCredentials: (state, action) => {
            const { user , accessToken , image ,aka  , userId , score} = action.payload

            console.log(action.payload)
            if (user) {
                state.user = user
            } 
            if (accessToken){
                state.token = accessToken
            }
            if (aka){
                state.aka = aka
            }
            if (image){
                state.image = image
            }
            if (userId){
                state.userId = userId
            }
            if (score) {
                state.score = score
            }
            
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.image = null
            state.aka = null
            state.userId = null
            state.score = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentImage = (state) => state.auth.image
export const selectCurrentAka= (state) => state.auth.aka
export const selectCurrentUserId = (state) => state.auth.userId 
export const selectCurrentScore = (state) => state.auth.score