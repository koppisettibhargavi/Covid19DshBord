import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import StatesData from '../StatesData'
import './index.css'
import Footer from '../Footer'
import Header from '../Header'
import SearchSuggestions from '../SearchSuggestions'
import LoaderSpinner from '../LoaderSpinner'
import Vaccination from '../Vaccination'

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

class Home extends Component {
  state = {
    searchInput: '',
    CovidList: [],
    activeCases: 0,
    recoveredCases: 0,
    deceasedCases: 0,
    confirmedCases: 0,
    isShowMobileView: false,
    isLoading: true,
    isSearch: false,
  }

  componentDidMount() {
    this.getData()
  }

  onclickMenu = () => {
    this.setState({
      isShowMobileView: true,
    })
  }

  close = () => {
    this.setState({isShowMobileView: false})
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      let activeCases = 0
      let recoveredCases = 0
      let deceasedCases = 0
      let confirmedCases = 0
      statesList.forEach(eachState => {
        if (data[eachState.state_code]) {
          const {total} = data[eachState.state_code]
          confirmedCases += total.confirmed ? total.confirmed : 0
          recoveredCases += total.recovered ? total.recovered : 0
          deceasedCases += total.deceased ? total.deceased : 0
        }
      })
      activeCases += confirmedCases - (recoveredCases + deceasedCases)
      // console.log(activeCases, recoveredCases, deceasedCases, confirmedCases)
      const statesData = statesList.map(eachState => ({
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        id: eachState.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.deceased),
        other: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        CovidList: statesData,
        activeCases,
        recoveredCases,
        deceasedCases,
        confirmedCases,
        isLoading: false,
      })
    } else {
      console.log('fetch error')
    }
  }

  onClickSortingAsc = () => {
    const {CovidList} = this.state
    const sortedList = CovidList.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    console.log(sortedList)
    this.setState({CovidList: sortedList})
  }

  onClickSortingDesc = () => {
    const {CovidList} = this.state
    const sortedList = CovidList.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    console.log(sortedList)
    this.setState({CovidList: sortedList})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value, isSearch: true})
  }

  getSearchList = () => {
    const {CovidList, searchInput} = this.state
    const newSuggetionList = CovidList.filter(each =>
      each.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(newSuggetionList)
    return (
      <>
        {newSuggetionList.length !== 0 && (
          <ul className="sugList" testid="searchResultsUnorderedList">
            {newSuggetionList.map(each => (
              <SearchSuggestions
                stateName={each.stateName}
                stateCode={each.stateCode}
                id={each.id}
                key={each.id}
              />
            ))}
          </ul>
        )}
      </>
    )
  }

  getTableData = () => {
    const {
      CovidList,
      confirmedCases,
      recoveredCases,
      deceasedCases,
      activeCases,
    } = this.state
    return (
      <>
        <div className="stats-container">
          <div className="cardconfirm" testid="countryWideConfirmedCases">
            <p>Confirmed</p>
            <img
              src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401422/check-mark_1_djvado.png"
              alt="country wide confirmed cases pic"
              className="img"
            />
            <p>{confirmedCases}</p>
          </div>
          <div className="cardactive" testid="countryWideActiveCases">
            <p>Active</p>
            <img
              src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401347/protection_1_gxcas9.png"
              alt="country wide active cases pic"
              className="img"
            />
            <p>{activeCases}</p>
          </div>
          <div className="cardRecovered" testid="countryWideRecoveredCases">
            <p>Recovered</p>
            <img
              src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401115/recovered_1_zik7os.png"
              alt="country wide recovered cases pic"
              className="img"
            />
            <p>{recoveredCases}</p>
          </div>
          <div className="cardDeceased" testid="countryWideDeceasedCases">
            <p>Deceased</p>
            <img
              src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401274/breathing_1_1_wfkllh.png"
              alt="country wide deceased cases pic"
              className="img"
            />
            <p>{deceasedCases}</p>
          </div>
        </div>
        <div className="contentTable" testid="stateWiseCovidDataTable">
          <div className="horizontalCongtainer">
            <div className="sta">
              <p className="rowHeading">States/UT</p>

              <button
                type="button"
                className="sorting-icon"
                onClick={this.onClickSortingAsc}
                testid="ascendingSort"
              >
                <FcGenericSortingAsc size="20" className="sorting-icon" />
              </button>

              <button
                type="button"
                className="sorting-icon"
                onClick={this.onClickSortingDesc}
                testid="descendingSort"
              >
                <FcGenericSortingDesc size="20" className="sorting-icon" />
              </button>
            </div>
            <p className="rowHeading">Confirmed</p>
            <p className="rowHeading">Active</p>
            <p className="rowHeading">Recovered</p>
            <p className="rowHeading">Deceased</p>
            <p className="rowHeading">Population</p>
          </div>

          <div className="hori">
            <hr />
          </div>

          <ul className="rows">
            {CovidList.map(each => (
              <StatesData data={each} key={each.id} id={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {
      searchInput,
      isShowMobileView,
      isLoading,
      isSearch,
      CovidList,
    } = this.state

    return (
      <div className="container">
        <Header
          isShowMobileView={isShowMobileView}
          onclickMenu={this.onclickMenu}
          close={this.close}
        />

        {isLoading ? (
          <div testid="homeRouteLoader">
            <LoaderSpinner />
          </div>
        ) : (
          <>
            <div className="hemMenu">
              {isShowMobileView && (
                <ul className="hemContainer">
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
                  <li>
                    <Link to="/Vaccination" className="item">
                      Vaccination
                    </Link>
                  </li>
                  <li>
                    <button type="button" onClick={this.close} className="but">
                      <AiFillCloseCircle />
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <div className="inputContainer">
              <BsSearch className="icon" />
              <input
                type="search"
                value={searchInput}
                onChange={this.onSearch}
                className="input"
                placeholder="Enter the State"
              />
            </div>

            {isSearch ? (
              this.getSearchList()
            ) : (
              <>
                {this.getTableData()}
                <Footer />
              </>
            )}
          </>
        )}
      </div>
    )
  }
}
export default Home
