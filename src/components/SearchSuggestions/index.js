import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import {AiOutlineRight} from 'react-icons/ai'

import './index.css'

const SearchSuggestions = props => {
  const {stateCode, stateName, id} = props

  return (
    <li className="list">
      <Link to={`/state/${id}`}>
        <button type="button" className="button">
          <p className="para">{stateName}</p>
          <div>
            {stateCode}
            <BiChevronRightSquare />
          </div>
        </button>
      </Link>
    </li>
  )
}

export default SearchSuggestions
