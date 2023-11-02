import {Link} from 'react-router-dom'
import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import './index.css'

const Footer = () => (
  <div className="Contain">
    <h1>
      COVID19<span className="span">INDIAN</span>
    </h1>
    <p>we stand with everyone fighting on the front lines</p>
    <div className="iconContainer">
      <FiInstagram className="itemIcon" />
      <FaTwitter className="itemIcon" />
      <VscGithubAlt className="itemIcon" />
    </div>
  </div>
)

export default Footer
