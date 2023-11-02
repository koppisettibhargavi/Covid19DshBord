import {Component} from 'react'
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
    category: 'confirmed',
    list: [],
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
      category: 'confirmed',
    }))
  }

  clickActive = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
      isConfirm: false,
      isRecover: false,
      isDecease: false,
      category: 'active',
    }))
  }

  clickRecover = () => {
    this.setState(prevState => ({
      isRecover: !prevState.isRecover,
      isActive: false,
      isConfirm: false,
      isDecease: false,
      category: 'recovered',
    }))
  }

  clickDecease = () => {
    this.setState(prevState => ({
      isDecease: !prevState.isDecease,
      isRecover: false,
      isConfirm: false,
      isActive: false,
      category: 'deceased',
    }))
  }

  onclickMenu = () => {
    this.setState({
      isShowMobileView: true,
    })
  }

  getcolor = category => {
    switch (category) {
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

  getUpdatedData = (stateCode, data) => {
    const stateSpecificDataList = []

    if (data[stateCode]) {
      const {total} = data[stateCode]
      const confirmed = total.confirmed ? total.confirmed : 0
      const deceased = total.deceased ? total.deceased : 0
      const recovered = total.recovered ? total.recovered : 0
      const tested = total.tested ? total.tested : 0
      const lastUpDated = data[stateCode].meta.last_updated
        ? data[stateCode].meta.last_updated
        : 0
      stateSpecificDataList.push({
        name: statesList.find(state => state.stateCode === stateCode)
          .state_name,
        confirmed,
        deceased,
        recovered,
        tested,
        lastUpDated,
        active: confirmed - (deceased + recovered),
      })
    }
    return stateSpecificDataList
  }

  getStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    // console.log(params)
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'Get',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const stateData = data[stateCode]
    const keys = Object.keys(stateData.districts)
    const statesName = statesList.filter(each => each.state_code === stateCode)
    const distData = stateData.districts
    // console.log(distData[keys[0]])
    let activeCases = 0
    let recoveredCases = 0
    let deceasedCases = 0
    let confirmedCases = 0
    let testedCases = 0
    keys.forEach(eachDist => {
      if (stateData.districts[eachDist]) {
        const {total} = stateData.districts[eachDist]
        confirmedCases += total.confirmed ? total.confirmed : 0
        recoveredCases += total.recovered ? total.recovered : 0
        deceasedCases += total.deceased ? total.deceased : 0
        testedCases += total.tested ? total.tested : 0
        // console.log(total.tested)
      }
    })

    const newArray = keys.map(each => ({
      districtName: each,
      confirmed: distData[each].total.confirmed,
      recovered: distData[each].total.recovered,
      deceased: distData[each].total.deceased,
    }))
    // console.log(newArray.active, 'active')

    activeCases += confirmedCases - (recoveredCases + deceasedCases)
    const dateString = new Date(stateData.meta.last_updated)
    // console.log(testedCases)
    this.setState({
      activeCases,
      recoveredCases,
      deceasedCases,
      confirmedCases,
      testedCases,
      name: statesName[0].state_name,
      isLoading: false,
      date: dateString,
      list: newArray,
    })
  }

  getTopDistricData = () => {
    const {list, category} = this.state
    switch (category) {
      case 'confirmed':
        return list.map(each => ({
          name: each.districtName,
          values: each.confirmed ? each.confirmed : 0,
        }))
      case 'active':
        return list.map(each => ({
          name: each.districtName,
          values:
            each.confirmed - (each.recovered + each.deceased)
              ? each.confirmed - (each.recovered + each.deceased)
              : 0,
        }))
      case 'deceased':
        return list.map(each => ({
          name: each.districtName,
          values: each.deceased ? each.deceased : 0,
        }))
      case 'recovered':
        return list.map(each => ({
          name: each.districtName,
          values: each.recovered ? each.recovered : 0,
        }))
      default:
        return null
    }
  }

  getTopDistricUi = () => {
    const {category} = this.state
    const HeadingColor = this.getcolor(category)
    const TopDistricData = this.getTopDistricData()
    TopDistricData.sort((a, b) => b.values - a.values)
    return (
      <>
        <h1 className={HeadingColor}>Top districts</h1>
        <ul className="list" testid="topDistrictsUnorderedList">
          {TopDistricData.map(each => (
            <TopDistric name={each.name} number={each.values} key={each.name} />
          ))}
        </ul>
      </>
    )
  }

  getSpecificData = () => {
    const {
      name,
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
      <>
        <div testid="stateSpecificConfirmedCasesContainer">
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
        <div testid="stateSpecificActiveCasesContainer">
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
            <p>{confirmedCases}</p>
          </button>
        </div>
        <div testid="stateSpecificRecoveredCasesContainer">
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
        <div testid="stateSpecificDeceasedCasesContainer" key="deceased">
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
      </>
    )
  }

  render() {
    const {
      isShowMobileView,
      category,
      isLoading,
      stateCode,
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

    return (
      <div className="containerSpecific">
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
          <>
            <h1 className="heading">{name}</h1>
            <p className="tested">Tested</p>
            <p className="testedNumber">{testedCases}</p>
            <p className="datePara">Last update on nov 22th 2029</p>
            {this.getSpecificData()}
            {this.getTopDistricUi()}
            <BarCharts stateCode={stateCode} category={category} />
            <Footer />
          </>
        )}
      </div>
    )
  }
}
export default stateSpecificRoute
