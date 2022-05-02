import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from './store/authSlice'
import { useEffect } from 'react'
import axios from 'axios'

import Userprofile from './Userprofile'
import { AiFillGithub } from 'react-icons/ai'
import './style.css'
import Loader from './images/Loading_icon.gif'

// Login section
function Login() {
  return (
    <div className="login-card">
      <h2>Github User Repositories</h2>
      <p>Login to view your first 20 repositories</p>

      <a href="https://github.com/login/oauth/authorize?scope=user&client_id=4d3b30605fde84f09463&redirect_uri=http://localhost:3000/auth/github/callback">
        Login with Github <AiFillGithub />
      </a>
    </div>
  )
}

// protected Routes
function ProtectedRoutes({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    ;<Navigate to="/" />
  }

  return children
}

function CallBack() {
  const state = useSelector((state) => state.auth)
  const { proxy_url, isLoading } = state
  const dispatch = useDispatch()
  const { login, setLoading } = authAction
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setLoading(true))
    const url = window.location.href
    const hasCode = url.includes('?code=')

    if (hasCode) {
      const newUrl = url.split('?code=')
      window.history.pushState({}, null, newUrl[0])

      const data = { code: newUrl[1] }

      axios.post(`${proxy_url}authenticate`, data).then(function (response) {
        const { data } = response
        dispatch(login(data))
        dispatch(setLoading(false))
        navigate('/user-repos')
      })
    }
  }, [dispatch, login, navigate, proxy_url, setLoading])

  if (isLoading) {
    return (
      <div>
        <img className="loading-img" src={Loader} alt="" />
      </div>
    )
  }
}

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/github/callback" element={<CallBack />} />

          <Route
            path="/user-repos"
            element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <Userprofile />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
