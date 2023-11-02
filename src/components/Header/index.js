import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {onclickMenu} = props
  const menuFunction = () => {
    onclickMenu()
  }

  return (
    <div className="HeaderContainer">
      <Link to="/" className="logo">
        COVID19<span className="span">INDIAN</span>
      </Link>

      <ul className="home">
        <li>
          <Link to="/" className="item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="item">
            About
          </Link>
        </li>
      </ul>

      <div className="showMenu">
        <button type="button" className="hemburgerMenu" onClick={menuFunction}>
          <img
            src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698550989/add-to-queue_1_hxmjh2.png"
            alt="menu"
          />
        </button>
      </div>
    </div>
  )
}

export default Header
