import './index.css'

const TopDistric = props => {
  const {name, number} = props

  return (
    <li className="row">
      <h1 className="head">{number}</h1>
      <p className="para">{name}</p>
    </li>
  )
}
export default TopDistric
