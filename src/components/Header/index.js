import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <Link to="/jobs">
        <li className="list-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </li>
      </Link>
      <div className="home-jobs-list-card">
        <Link to="/">
          <li className="header-home">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="header-home">Jobs</li>
        </Link>
      </div>

      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
