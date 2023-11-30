import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import LoaderSpinner from '../LoaderSpinner'
import './index.css'
import TopDistric from '../TopDistric'
import BarCharts from '../BarCharts'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class stateSpecificRoute extends Component {
  state = {
    isLoading: true,
    isShowMobileView: false,
    isConfirm: true,
    isActive: false,
    isRecover: false,
    isDecease: false,
    category: 'Confirmed',
    List: [],
  }

  componentDidMount() {
    this.getStateData()
  }

  clickConfirm = () => {
    this.setState(prevState => ({
      isConfirm: true,
      isActive: false,
      isRecover: false,
      isDecease: false,
      category: 'Confirmed',
    }))
  }

  clickActive = () => {
    this.setState(prevState => ({
      isActive: true,
      isConfirm: false,
      isRecover: false,
      isDecease: false,
      category: 'Active',
    }))
  }

  clickRecover = () => {
    this.setState(prevState => ({
      isRecover: true,
      isActive: false,
      isConfirm: false,
      isDecease: false,
      category: 'Recovered',
    }))
  }

  clickDecease = () => {
    this.setState(prevState => ({
      isDecease: true,
      isRecover: false,
      isConfirm: false,
      isActive: false,
      category: 'Deceased',
    }))
  }

  onclickMenu = () => {
    this.setState({
      isShowMobileView: true,
    })
  }

  getcolor = category => {
    const cat = category.toLowerCase()
    switch (cat) {
      case 'confirmed':
        return 'confirmedColor'
      case 'active':
        return 'activeColor'
      case 'recovered':
        return 'recoveredColor'
      case 'deceased':
        return 'deceasedColor'
      default:
        return null
    }
  }

  getStateData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'Get',
    }
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const response = await fetch(url, options)
    const List = []
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const s = statesList.map(each => {
        if (each.state_code) {
          return {
            stateName: each.state_name,
            stateId: each.state_code,
            stateConfirmed: data[each.state_code].total.confirmed,
            stateDeceased: data[each.state_code].total.deceased,
            stateRecovered: data[each.state_code].total.recovered,
            stateTested: data[each.state_code].total.tested,
            stateActiveCases:
              data[each.state_code].total.confirmed -
              (data[each.state_code].total.recovered +
                data[each.state_code].total.deceased),
            statePopulation: data[each.state_code].meta.population,
            lastUpdated: data[each.state_code].meta.date,
            districData: data[each.state_code].districts,
          }
        }
        return {
          stateName: '',
          stateId: each.state_code,
          stateConfirmed: 0,
          stateDeceased: 0,
          stateRecovered: 0,
          stateTested: 0,
          stateActiveCases: 0,
          statePopulation: 0,
          lastUpdated: 0,
          districData: {unknown: {vacination: 0}},
        }
      })
      this.setState({List: s, isLoading: false})
      console.log(s, 'newarray')
    } else {
      console.log('fetch error')
    }
  }

  getSpecificData = () => {
    const {isConfirm, isActive, isDecease, isRecover, List} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(stateCode, 'code')
    console.log(List, 'list')
    const specificState = List.filter(each => each.stateId === stateCode)
    console.log(specificState, 'specificState')
    const {stateConfirmed, stateDeceased, stateRecovered, stateActiveCases} = {
      ...specificState[0],
    }
    console.log(stateConfirmed, 'confirmed')
    return (
      <ul>
        <li testid="stateSpecificConfirmedCasesContainer" key="confirm">
          <div>
            <button
              type="button"
              className={isConfirm ? 'back1' : 'card1'}
              onClick={this.clickConfirm}
            >
              <p>Confirmed</p>
              <img
                src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401422/check-mark_1_djvado.png"
                alt="state specific confirmed cases pic"
                className="img"
              />
              <p>{stateConfirmed}</p>
            </button>
          </div>
        </li>
        <li testid="stateSpecificActiveCasesContainer" key="active">
          <div>
            <button
              type="button"
              className={isActive ? 'back2' : 'card2'}
              onClick={this.clickActive}
            >
              <p>Active</p>
              <img
                src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401347/protection_1_gxcas9.png"
                alt="state specific active cases pic"
                className="img"
              />
              <p>{stateActiveCases}</p>
            </button>
          </div>
        </li>
        <li testid="stateSpecificRecoveredCasesContainer" key="recovered">
          <div>
            <button
              type="button"
              className={isRecover ? 'back3' : 'card3'}
              onClick={this.clickRecover}
            >
              <p>Recovered</p>
              <img
                src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401115/recovered_1_zik7os.png"
                alt="state specific recovered cases pic"
                className="img"
              />
              <p>{stateRecovered}</p>
            </button>
          </div>
        </li>
        <li testid="stateSpecificDeceasedCasesContainer" key="deceased">
          <div key="deceased">
            <button
              type="button"
              className={isDecease ? 'back4' : 'card4'}
              onClick={this.clickDecease}
            >
              <p>Deceased</p>
              <img
                src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401274/breathing_1_1_wfkllh.png"
                alt="state specific deceased cases pic"
                className="img"
              />
              <p>{stateDeceased}</p>
            </button>
          </div>
        </li>
      </ul>
    )
  }

  getTopData = () => {
    const {List, category} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(stateCode, 'code')
    console.log(List, 'list')
    const specificState = List.filter(each => each.stateId === stateCode)
    console.log(specificState, 'specificState')
    const {districData} = {
      ...specificState[0],
    }
    console.log(districData, 'distric')
    const listOfDistricts = Object.keys(districData)
    const lowerCategory = category.toLowerCase()
    if (districData === undefined) {
      return null
    }
    const dataElement = listOfDistricts.map(eachItem =>
      districData[eachItem].total === undefined
        ? {
            name: eachItem,
            value: 0,
          }
        : {
            name: eachItem,
            value: districData[eachItem].total[lowerCategory]
              ? districData[eachItem].total[lowerCategory]
              : 0,
          },
    )

    dataElement.sort((a, b) => b.value - a.value)

    const activeData = listOfDistricts.map(eachActive =>
      districData[eachActive].total === undefined
        ? {
            name: eachActive,
            value: 0,
          }
        : {
            name: eachActive,
            value:
              districData[eachActive].total.confirmed -
              (districData[eachActive].total.recovered +
                districData[eachActive].total.deceased)
                ? districData[eachActive].total.confirmed -
                  (districData[eachActive].total.recovered +
                    districData[eachActive].total.deceased)
                : 0,
          },
    )

    activeData.sort((a, b) => b.value - a.value)

    if (category === 'Active') {
      return activeData
    }
    return dataElement
  }

  getTopDistricUi = () => {
    const {category} = this.state
    const HeadingColor = this.getcolor(category)
    const TopDistrictData = this.getTopData()
    console.log(TopDistrictData, 'topData')
    return (
      <>
        <h1 className={HeadingColor}>Top Districts</h1>
        <ul className="list" testid="topDistrictsUnorderedList">
          {TopDistrictData.map(each => (
            <TopDistric name={each.name} number={each.value} key={each.name} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {List, isShowMobileView, isLoading, category} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(stateCode, 'code')
    console.log(List, 'list')
    const specificState = List.filter(each => each.stateId === stateCode)
    console.log(specificState, 'specificState')
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const {stateId, stateName, stateTested, lastUpdated} = {...specificState[0]}
    const isState = statesList.find(each => each.state_code === stateCode)
    console.log(isState, 'isstate')
    return (
      <div>
        {isState && (
          <div>
            <Header
              isShowMobileView={isShowMobileView}
              onclickMenu={this.onclickMenu}
              close={this.close}
            />

            {isLoading ? (
              <div testid="stateDetailsLoader">
                <LoaderSpinner />
              </div>
            ) : (
              <div className="containerSpecific">
                <div className="headingBack">
                  <h1 className="heading">{stateName}</h1>
                </div>
                <p className="tested">Tested</p>
                <p className="testedNumber">{stateTested}</p>
                <p className="datePara"> {`last update on ${lastUpdated}`}</p>
                {this.getSpecificData()}
                {this.getTopDistricUi()}
                {
                  <BarCharts
                    stateId={stateId}
                    category={category.toLowerCase()}
                  />
                }
                <Footer />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
export default stateSpecificRoute
