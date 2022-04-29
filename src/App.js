import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Userprofile from './Userprofile'
import { AiFillGithub } from 'react-icons/ai'
import './style.css'

// Login section
function Login() {
  return (
    <div className="login-card">
      <h2>Github User Repositories</h2>
      <p>Login to view your first 20 repositories</p>
      <button>
        Login with Github <AiFillGithub />
      </button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-profile" element={<Userprofile />} />

          {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoutes isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoutes>
          }
        /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
