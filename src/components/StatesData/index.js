import {Link} from 'react-router-dom'
import './index.css'

const StatesData = props => {
  const {data} = props
  const {
    stateName,
    confirmed,
    recovered,
    deceased,
    population,
    stateCode,
  } = data
  const active = confirmed - recovered - deceased
  return (
    <li className="stateRow">
      <Link to={`/state/${stateCode}`}>
        <p className="state">{stateName}</p>
      </Link>
      <p className="confirm">{confirmed}</p>
      <p className="active">{active}</p>
      <p className="recover">{recovered}</p>
      <p className="deceased">{deceased}</p>
      <p className="population">{population}</p>
    </li>
  )
}
export default StatesData
