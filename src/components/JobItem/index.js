import {Link} from 'react-router-dom'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-list-item-card">
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
        <h1 className="jobs-list-package">Description</h1>
        <p className="jobs-list-rating">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
