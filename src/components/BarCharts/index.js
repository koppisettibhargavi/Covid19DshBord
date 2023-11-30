import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import LoaderSpinner from '../LoaderSpinner'
import './index.css'

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

class BarCharts extends Component {
  state = {listData: [], isLoading: true}

  componentDidMount() {
    this.getDataBar()
  }

  getChartData = category => {
    const {listData} = this.state
    switch (category) {
      case 'confirmed':
        return listData.map(each => ({
          name: each.date,
          color: 'red',
          backColor: '#331427',
          values: each.confirmed ? each.confirmed : 0,
        }))
      case 'active':
        return listData.map(each => ({
          name: each.date,
          color: 'blue',
          backColor: '#132240',
          values:
            each.confirmed - (each.recovered + each.deceased)
              ? each.confirmed - (each.recovered + each.deceased)
              : 0,
        }))
      case 'deceased':
        return listData.map(each => ({
          name: each.date,
          color: '#6C757D',
          backColor: '#1C1C2B',
          values: each.deceased ? each.deceased : 0,
        }))
      case 'recovered':
        return listData.map(each => ({
          name: each.date,
          color: 'green',
          backColor: '#182829',
          values: each.recovered ? each.recovered : 0,
        }))
      case 'tested':
        return listData.map(each => ({
          name: each.date,
          color: '#230F41',
          backColor: '#9673B9',
          values: each.tested ? each.tested : 0,
        }))

      default:
        return null
    }
  }

  getColor = category => {
    switch (category) {
      case 'confirmed':
        return '#9A0E31'
      case 'active':
        return '#0A4FA0'
      case 'recovered':
        return '#216837'
      case 'deceased':
        return '#474C57'
      default:
        return null
    }
  }

  getDataBar = async () => {
    const {stateId, category} = this.props
    console.log(stateId)
    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data, 'data')
    const keyNames = Object.keys(data[stateId].dates)
    console.log(keyNames, 'keys')
    const list = keyNames.map(date => ({
      date,
      confirmed: data[stateId].dates[date].total.confirmed,
      deceased: data[stateId].dates[date].total.deceased,
      recovered: data[stateId].dates[date].total.recovered,
      active:
        data[stateId].dates[date].total.confirmed -
        (data[stateId].dates[date].total.deceased +
          data[stateId].dates[date].total.recovered),
      tested: data[stateId].dates[date].total.tested,
    }))
    console.log(list)
    this.setState({listData: list, isLoading: false, category})
  }

  getTimeLineChart = (chartColor, chartType) => {
    //  const chartData = this.getChartData(chartType)

    const {listData} = this.state
    console.log(listData, 'list')
    const maxSearchChart = listData.slice(Math.max(listData.length - 10, 0))
    const DataFormatter = number => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`
      }
      return number.toString()
    }

    return (
      <div>
        <h1>Line Chart</h1>
        <div className="App">
          <LineChart
            width={730}
            height={250}
            data={listData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={chartType} stroke={chartColor} />
          </LineChart>
        </div>
      </div>
    )
  }

  render() {
    const {category} = this.props
    const {listData, isLoading} = this.state
    const color = this.getColor(category)
    // const ChartData = this.getChartData(category)
    const maxSearchChart = listData.slice(Math.max(listData.length - 10, 0))
    const DataFormatter = number => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`
      }
      return number.toString()
    }

    return (
      <>
        {isLoading ? (
          <div testid="timelinesDataLoader">
            <LoaderSpinner />
          </div>
        ) : (
          <>
            <h1>Bar Chart</h1>
            <div>
              <BarChart width={800} height={450} data={maxSearchChart}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={category}
                  fill={color}
                  className="bar"
                  label={{position: 'top', color: 'white'}}
                />
              </BarChart>
            </div>

            <h1>Spread Trends</h1>
            <div testid="lineChartsContainer">
              <div className="lineContainer1">
                {this.getTimeLineChart('red', 'confirmed')}
              </div>
              <div className="lineContainer2">
                {this.getTimeLineChart('blue', 'active')}
              </div>
              <div className="lineContainer3">
                {this.getTimeLineChart('green', 'recovered')}
              </div>
              <div className="lineContainer4">
                {this.getTimeLineChart('#6C757D', 'deceased')}
              </div>
              <div className="lineContainer5">
                {this.getTimeLineChart('#230F41', 'tested')}
              </div>
            </div>
          </>
        )}
      </>
    )
  }
}
export default withRouter(BarCharts)
