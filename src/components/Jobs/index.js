import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import Filters from '../Filters'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const locationDetails = [
  {label: 'Hyderabad', locationTypeId: 'HYDERABAD'},
  {label: 'Bangalore', locationTypeId: 'BANGALORE'},
  {label: 'Chennai', locationTypeId: 'CHENNAI'},
  {label: 'Delhi', locationTypeId: 'DELHI'},
  {label: 'Mumbai', locationTypeId: 'MUMBAI'},
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    employeeType: [],
    salaryRange: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    locations: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, salaryRange, employeeType} = this.state
    const employees = employeeType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employees}&minimum_package=${salaryRange}&search=${searchInput}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeLocations = location => {
    this.setState(prevState => ({
      locations: [...prevState.locations, location],
    }))
  }

  onRemoveLocations = location => {
    const {locations} = this.state
    const filteredLocations = locations.filter(each => each !== location)
    this.setState({locations: filteredLocations})
  }

  onChangeEmployees = employeeId => {
    this.setState(
      prevState => ({
        employeeType: [...prevState.employeeType, employeeId],
      }),
      this.getJobs,
    )
  }

  onRemoveEmployees = employeeId => {
    const {employeeType} = this.state
    const filteredList = employeeType.filter(each => each !== employeeId)
    this.setState({employeeType: filteredList}, this.getJobs)
  }

  onChangeSalary = salaryId => {
    this.setState({salaryRange: salaryId}, this.getJobs)
  }

  onClickSearch = () => {
    this.getJobs()
  }

  renderLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryBtn = () => {
    this.getJobs()
  }

  renderFailureView = () => (
    <div className="loading-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-job-img"
      />
      <h1 className="failure-job-heading">Oops! Something Went Wrong</h1>
      <p className="failure-job-info">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList, locations} = this.state
    console.log(locations)
    let filteredJobList = jobsList
    if (locations.length > 0) {
      filteredJobList = jobsList.filter(each =>
        locations.includes(each.location),
      )
    }
    return (
      <>
        {jobsList.length > 0 ? (
          <div className="success-container">
            <ul className="unordered-jobs-list-container">
              {filteredJobList.map(each => (
                <JobItem key={each.id} eachJobDetail={each} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="loading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="failure-job-img"
            />
            <h1 className="failure-job-heading">No Jobs Found</h1>
            <p className="failure-job-info">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderJobsBasedOnApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-main-container">
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              onClick={this.onClickSearch}
            >
              <BsSearch aria-label="button" className="search-icon" />
            </button>
          </div>
          <div className="profile-filters-container">
            <ProfileDetails />
            <hr className="hr-line" />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeEmployees={this.onChangeEmployees}
              onRemoveEmployees={this.onRemoveEmployees}
              onChangeSalary={this.onChangeSalary}
              locationDetails={locationDetails}
              onChangeLocations={this.onChangeLocations}
              onRemoveLocations={this.onRemoveLocations}
            />
          </div>
          <div className="job-details-container">
            <div className="search-container-lg">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <BsSearch aria-label="button" className="search-icon" />
              </button>
            </div>
            {this.renderJobsBasedOnApi()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
