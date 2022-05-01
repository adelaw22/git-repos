import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from './store/authSlice'
import { useEffect } from 'react'
import axios from 'axios'

import Userprofile from './Userprofile'
import { AiFillGithub } from 'react-icons/ai'
import './style.css'

// Login section
function Login() {
  const dispatch = useDispatch()
  const { login } = authAction
  const navigate = useNavigate()

  const handleSubmit = () => {
    // dispatch(login())
    // navigate('/user-repos')
    // ;<Navigate
    //   replace
    //   to="https://github.com/login/oauth/authorize?scope=user&client_id=4d3b30605fde84f09463&redirect_uri=http://localhost:5000/auth/github/callback"
    // />
  }

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
  const { proxy_url } = state

  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes('?code=')

    if (hasCode) {
      const newUrl = url.split('?code=')
      window.history.pushState({}, null, newUrl[0])

      const data = { code: newUrl[1] }
      console.log(data)

      axios.post(`${proxy_url}authenticate`).then(function (response) {
        console.log(response)
      })
    }

    // if (hasCode) {
    //   const newUrl = url.split("?code=");
    //   window.history.pushState({}, null, newUrl[0]);
    //   setData({ ...data, isLoading: true });

    //   const requestData = {
    //     code: newUrl[1]
    //   };

    //   const proxy_url = state.proxy_url;

    //   // Use code parameter and other parameters to make POST request to proxy_server
    //   fetch(proxy_url, {
    //     method: "POST",
    //     body: JSON.stringify(requestData)
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       dispatch({
    //         type: "LOGIN",
    //         payload: { user: data, isLoggedIn: true }
    //       });
    //     })
    //     .catch(error => {
    //       setData({
    //         isLoading: false,
    //         errorMessage: "Sorry! Login failed"
    //       });
    //     });
    // }
  }, [])

  return <p>callback</p>
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
