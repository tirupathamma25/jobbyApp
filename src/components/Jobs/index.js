import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import './index.css'
import JobItem from '../JobItem'

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

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiConstants.initial,
    showSearchInput: false,
    searchInput: '',
    employment: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/jobs'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const fetchedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: fetchedJobsData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderNoJobsFound = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view"
      />
      <h1 className="jobs-list-title">No Jobs Found</h1>
      <p className="jobs-list-rating">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  searchResultView = () => {
    const {jobsList, searchInput} = this.state
    const searchJobResult = jobsList.filter(eachJobDataInfo =>
      eachJobDataInfo.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const searchResultLength = searchJobResult.length < 1
    return (
      <ul>
        {searchResultLength
          ? this.renderNoJobsFound()
          : searchJobResult.map(eachJobData => (
              <JobItem jobDetails={eachJobData} key={eachJobData.id} />
            ))}
      </ul>
    )
  }

  withOutSearchResultView = () => {
    const {jobsList} = this.state
    return (
      <ul>
        {jobsList.map(eachJobData => (
          <JobItem jobDetails={eachJobData} key={eachJobData.id} />
        ))}
      </ul>
    )
  }

  renderJobsList = () => {
    const {showSearchInput} = this.state

    return (
      <ul className="un-ordered-job-list">
        {showSearchInput
          ? this.searchResultView()
          : this.withOutSearchResultView()}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.setState({}, this.getJobsList)
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="jobs-list-title">Oops! Something Went Wrong</h1>
      <p className="jobs-list-rating">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="find-button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderFinalJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobsList()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  onClickSearchInput = () => {
    this.setState({showSearchInput: true})
  }

  onClickCheckBox = event => {
    this.setState({employment: event.target.value})
  }

  render() {
    const {searchInput, employment} = this.state

    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="jobs-left-text-card">
            <ProfileCard />
            <hr className="hr-line" />
            <h1 className="employment-h1">Type of Employment</h1>
            <ul className="employ-list-card">
              {employmentTypesList.map(eachEmploy => (
                <div className="employ-info-card">
                  <input
                    type="checkbox"
                    value={employment}
                    id={eachEmploy.employmentTypeId}
                    onClick={this.onClickCheckBox}
                  />
                  <label
                    htmlFor={eachEmploy.employmentTypeId}
                    className="employ-label-text"
                  >
                    {eachEmploy.label}
                  </label>
                </div>
              ))}
            </ul>
            <hr className="hr-line" />
            <h1 className="employment-h1">Salary Range</h1>
            <ul className="employ-list-card">
              {salaryRangesList.map(eachSalary => (
                <div className="employ-info-card">
                  <input type="radio" id={eachSalary.salaryRangeId} />
                  <label
                    htmlFor={eachSalary.salaryRangeId}
                    className="employ-label-text"
                  >
                    {eachSalary.label}
                  </label>
                </div>
              ))}
            </ul>
          </div>
          <div className="jobs-list-container">
            <div className="search-input-card">
              <input
                type="search"
                id="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <label htmlFor="search">
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickSearchInput}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
                    alt="search icon"
                    className="search"
                  />
                </button>
              </label>
            </div>
            <div className="jobs-list-card">{this.renderFinalJobsList()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
