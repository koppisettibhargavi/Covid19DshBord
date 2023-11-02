import './index.css'

const AboutItem = props => {
  const {faqDetails} = props
  const {question, answer} = faqDetails
  return (
    <li className="question-details" key={faqDetails.id}>
      <p className="question">{question}</p>
      <p className="answer">{answer}</p>
    </li>
  )
}

export default AboutItem
