import { connect } from 'react-redux'
import Currency from '../components/Currency'
import { fetchHistoricalData } from '../actions/currency'

const mapStateToProps = state => ({
  data: state.history
})

const Container = connect(mapStateToProps, {
  fetchHistoricalData
})(Currency)

export default Container
