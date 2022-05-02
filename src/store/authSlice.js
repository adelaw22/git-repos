import { createSlice } from '@reduxjs/toolkit'

console.log(process.env)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    user: localStorage.getItem('user') || null,
    isLoading: false,
    redirect_url: 'http://localhost:3000/auth/github/callback',
    client_secret: '325b8e87a4fc1cc247e304a86f9c27d13a36226f',
    client_id: '4d3b30605fde84f09463',
    proxy_url: 'http://localhost:5000/',
  },
  reducers: {
    login(state, action) {
      localStorage.setItem('user', JSON.stringify(action.payload))
      localStorage.setItem('isLoggedIn', true)
      state.isLoggedIn = true
      state.user = action.payload
    },
    logout(state) {
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
      state.isLoggedIn = false
      state.user = null
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const authAction = authSlice.actions

export default authSlice.reducer
