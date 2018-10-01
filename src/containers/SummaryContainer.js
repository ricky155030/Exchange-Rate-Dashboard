import { connect } from 'react-redux'
import Summary from '../components/Summary'
import { fetchSummaryData } from '../actions/currency'

const mapStateToProps = state => ({
  data: state.summary.data
})

const Container = connect(mapStateToProps, {
  fetchSummaryData
})(Summary)

export default Container
