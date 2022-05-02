import {
  IoLocationOutline,
  IoMailOutline,
  IoLogoTwitter,
} from 'react-icons/io5'
import './style.css'
import { useSelector } from 'react-redux'

import RepoList from './components/repoList'

const User = () => {
  const auth = useSelector((state) => state.auth)
  const {
    login,
    avatar_url,
    followers,
    following,
    email,
    name,
    twitter_username,
    location,
  } = auth.user

  return (
    <div className="user-profile container">
      <div className="row">
        <div className="user-details col-md-3">
          <img src={avatar_url} alt="" />
          <h4>{login}</h4>
          <p>{name}</p>

          <div className="mb-2">
            <span>{followers} followers</span>
            <span>{following} following</span>
          </div>

          <p>
            <IoLocationOutline />
            {location}
          </p>

          <p>
            <IoMailOutline />
            {email}
          </p>

          <p>
            <IoLogoTwitter />
            {twitter_username}
          </p>
        </div>

        <div className="col-md-9">
          <h2>Public Repositories</h2>

          <div>
            <RepoList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
