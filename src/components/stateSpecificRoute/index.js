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
    lastUpDated: '',
    isShowMobileView: false,
    isConfirm: false,
    isActive: false,
    isRecover: false,
    isDecease: false,
    category: 'Confirmed',
    id: '',
    DistrictData: [],
  }

  componentDidMount() {
    this.getStateData()
  }

  clickConfirm = () => {
    this.setState(prevState => ({
      isConfirm: !prevState.isConfirm,
      isActive: false,
      isRecover: false,
      isDecease: false,
      category: 'Confirmed',
    }))
  }

  clickActive = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
      isConfirm: false,
      isRecover: false,
      isDecease: false,
      category: 'Active',
    }))
  }

  clickRecover = () => {
    this.setState(prevState => ({
      isRecover: !prevState.isRecover,
      isActive: false,
      isConfirm: false,
      isDecease: false,
      category: 'Recovered',
    }))
  }

  clickDecease = () => {
    this.setState(prevState => ({
      isDecease: !prevState.isDecease,
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
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'Get',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const isStateCode = statesList.filter(
      eachitem => eachitem.state_code === stateCode,
    )
    const Name = isStateCode[0].state_name

    let recoveredCases = 0
    let deceasedCases = 0
    let confirmedCases = 0
    let testedCases = 0
    statesList.forEach(eachState => {
      if (data[eachState.state_code]) {
        const {total} = data[eachState.state_code]
        confirmedCases += total.confirmed ? total.confirmed : 0
        recoveredCases += total.recovered ? total.recovered : 0
        deceasedCases += total.deceased ? total.deceased : 0
        testedCases += total.tested ? total.tested : 0
      }
    })
    const dc = deceasedCases + recoveredCases
    const date = data[stateCode].meta.last_updated
    const rowData = data

    this.setState({
      activeCases: confirmedCases - dc,
      recoveredCases,
      deceasedCases,
      confirmedCases,
      testedCases,
      isLoading: false,
      date,
      id: stateCode,
      name: Name,
      rowData,
    })
  }

  getTopData = category => {
    const {rowData, id} = this.state
    const DistrictsData = rowData[id].districts
    const listOfDistricts = Object.keys(DistrictsData)
    console.log(DistrictsData)
    const lowerCategory = category.toLowerCase()
    const dataElement = listOfDistricts.map(eachItem =>
      DistrictsData[eachItem].total === undefined
        ? {
            name: eachItem,
            value: 0,
          }
        : {
            name: eachItem,
            value: DistrictsData[eachItem].total[lowerCategory]
              ? DistrictsData[eachItem].total[lowerCategory]
              : 0,
          },
    )

    console.log(dataElement)
    dataElement.sort((a, b) => b.value - a.value)
    const activeData = listOfDistricts.map(eachActive =>
      DistrictsData[eachActive].total === undefined
        ? {
            name: eachActive,
            value: 0,
          }
        : {
            name: eachActive,
            value:
              DistrictsData[eachActive].total.confirmed -
              (DistrictsData[eachActive].total.recovered +
                DistrictsData[eachActive].total.deceased)
                ? DistrictsData[eachActive].total.confirmed -
                  (DistrictsData[eachActive].total.recovered +
                    DistrictsData[eachActive].total.deceased)
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
    const TopDistrictData = this.getTopData(category)
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

  getSpecificData = () => {
    const {
      date,
      testedCases,
      activeCases,
      recoveredCases,
      deceasedCases,
      confirmedCases,
      isLoading,
      isActive,
      isConfirm,
      isDecease,
      isRecover,
      category,
      list,
      stateCode,
    } = this.state

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
              <p>{confirmedCases}</p>
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
              <p>{activeCases}</p>
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
              <p>{recoveredCases}</p>
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
              <p>{deceasedCases}</p>
            </button>
          </div>
        </li>
      </ul>
    )
  }

  render() {
    const {
      isShowMobileView,
      category,
      isLoading,
      id,
      name,
      testedCases,
    } = this.state

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
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const isState = statesList.find(each => each.state_code === stateCode)
    if (isState === undefined) {
      return <Redirect to="/bad-path" />
    }
    return (
      <>
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
              <h1 className="heading">{name}</h1>
            </div>
            <p className="tested">Tested</p>
            <h1 className="testedNumber">{testedCases}</h1>
            <p className="datePara">Last update on nov 22th 2029</p>
            {this.getSpecificData()}
            {this.getTopDistricUi()}
            <BarCharts stateCode={id} category={category.toLowerCase()} />
            <Footer />
          </div>
        )}
      </>
    )
  }
}
export default stateSpecificRoute
