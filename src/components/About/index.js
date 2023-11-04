import {Component} from 'react'

import Header from '../Header'

import Footer from '../Footer'

import AboutItem from '../AboutItem'

import LoaderSpinner from '../LoaderSpinner'

import './index.css'

class About extends Component {
  state = {
    faqList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getAboutFaqs()
  }

  getAboutFaqs = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)
    this.setState({faqList: data.faq, isLoading: false})
  }

  renderAbout = () => {
    const {faqList} = this.state

    return (
      <div className="about-container">
        <p className="about-heading">About</p>
        <p className="about-date">Last updated March 21, 2022</p>
        <p className="about-description">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul
          className="list-items-container"
          // testid="faqsUnorderedList"
        >
          {faqList.map(eachFaq => (
            <AboutItem key={eachFaq.qno} faqDetails={eachFaq} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? (
          <div
          // testid="aboutRouteLoader"
          >
            <LoaderSpinner />
          </div>
        ) : (
          <div>
            {this.renderAbout()}
            <Footer />
          </div>
        )}
      </>
    )
  }
}

export default About
