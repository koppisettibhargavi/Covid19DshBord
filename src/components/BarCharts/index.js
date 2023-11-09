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
    const {stateCode, category} = this.props

    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const keyNames = Object.keys(data[stateCode].dates)

    const list = keyNames.map(date => ({
      date,
      confirmed: data[stateCode].dates[date].total.confirmed,
      deceased: data[stateCode].dates[date].total.deceased,
      recovered: data[stateCode].dates[date].total.recovered,
      active:
        data[stateCode].dates[date].total.confirmed -
        (data[stateCode].dates[date].total.deceased +
          data[stateCode].dates[date].total.recovered),
      tested: data[stateCode].dates[date].total.tested,
    }))
    console.log(list)
    this.setState({listData: list, isLoading: false, category})
  }

  getTimeLineChart = (chartColor, chartType) => {
    //  const chartData = this.getChartData(chartType)

    const {listData} = this.state
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
