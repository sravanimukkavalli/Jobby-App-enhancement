import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <ul className="unordered-list-container-lg">
        <Link to="/" style={{textDecoration: 'none'}}>
          <li className="lg-each-item">Home</li>
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <li className="lg-each-item">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
      <ul className="unordered-icons-container">
        <Link to="/">
          <li className="each-icon">
            <IoMdHome size={28} />
          </li>
        </Link>
        <Link to="/jobs">
          <li className="each-icon">
            <BsBriefcaseFill size={26} />
          </li>
        </Link>
        <FiLogOut
          className="each-icon"
          size={26}
          id="icon"
          onClick={onClickLogout}
        />
      </ul>
    </div>
  )
}
export default withRouter(Header)