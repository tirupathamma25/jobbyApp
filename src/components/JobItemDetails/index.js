import {Component} from 'react'
import ReactPlayer from 'react-player/youtube'
import Cookies from 'js-cookie'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcase, BsBoxArrowUpRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import SkillItem from '../SkillItem'
import SimilarJobs from '../similarJobs'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobItemData: [],
    skillData: [],
    similarJobsData: [],
    showWebsite: false,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobUrl = `https://apis.ccbp.in/jobs/${id}`

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const fetchedJobItemData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
      }
      const fetchedSkillData = data.job_details.skills.map(eachSkillItem => ({
        imageUrl: eachSkillItem.image_url,
        name: eachSkillItem.name,
      }))
      const fetchedSimilarJobs = data.similar_jobs.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        id: eachSimilarJob.id,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))

      this.setState({
        jobItemData: fetchedJobItemData,
        skillData: fetchedSkillData,
        similarJobsData: fetchedSimilarJobs,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickWebsiteVisit = () => {
    this.setState({showWebsite: true})
  }

  renderWebsite = () => {
    const {jobItemData} = this.state
    const {companyWebsiteUrl} = jobItemData
    return (
      <div>
        <ReactPlayer url={companyWebsiteUrl} />
      </div>
    )
  }

  renderJobItem = () => {
    const {jobItemData} = this.state
    const {skillData} = this.state
    const {similarJobsData} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
    } = jobItemData

    return (
      <div className="job-item-details-container">
        <div className="job-item-details-card">
          <div className="company-logo-title-card">
            <img
              src={companyLogoUrl}
              alt="companyLogo"
              className="company-logo"
            />
            <div>
              <h1 className="jobs-list-title">{title}</h1>
              <div className="star-rating-card">
                <IoMdStar className="star" />
                <p className="jobs-list-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-card">
            <div className="location-type-card">
              <div className="star-rating-card">
                <MdLocationOn className="location-icon" />
                <p className="jobs-list-rating">{location}</p>
              </div>
              <div className="star-rating-card">
                <BsBriefcase className="location-icon" />
                <p className="jobs-list-rating">{employmentType}</p>
              </div>
            </div>
            <p className="jobs-list-package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="location-type-package-card">
            <h1 className="jobs-list-package">Description</h1>
            <button
              type="button"
              onClick={this.onClickWebsiteVisit}
              className="visit-button"
            >
              Visit
              <BsBoxArrowUpRight className="website-visit" />
            </button>
          </div>

          <p className="jobs-list-rating">{jobDescription}</p>
          <h1 className="jobs-list-title">Skills</h1>
          <ul className="un-ordered-skills">
            {skillData.map(eachSkill => (
              <SkillItem skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="jobs-list-title">Life at Company</h1>
          <div className="life-at-company-card">
            <div className="life-at-company-description-card">
              <p>{lifeAtCompanyDescription}</p>
            </div>

            <img
              src={lifeAtCompanyImageUrl}
              alt="company logo"
              className="life-at-company-image"
            />
          </div>
        </div>

        <ul className="un-ordered-skills">
          {similarJobsData.map(eachSimilarItem => (
            <SimilarJobs
              similarJobDetails={eachSimilarItem}
              key={eachSimilarItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.setState({}, this.getJobItemData)
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

  renderFinalJobItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobItem()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    const {showWebsite} = this.state
    return (
      <div className="job-item-main-container">
        <div>
          {showWebsite ? this.renderWebsite() : this.renderFinalJobItem()}
        </div>
      </div>
    )
  }
}
export default JobItemDetails
