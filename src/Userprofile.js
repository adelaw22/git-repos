import {
  IoLocationOutline,
  IoMailOutline,
  IoLogoTwitter,
} from 'react-icons/io5'
import './style.css'

import RepoList from './components/repoList'

const User = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <img src="" alt="" />
          <h4>John Doe</h4>
          <p></p>

          <div>
            <span>followers</span>
            <span>following</span>
          </div>

          <p>
            <IoLocationOutline /> Jos
          </p>

          <p>
            <IoMailOutline />
          </p>

          <p>
            <IoLogoTwitter />
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
