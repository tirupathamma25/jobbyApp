import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-list-item">
      <div className="company-logo-title-card">
        <img src={companyLogoUrl} alt="companyLogo" className="company-logo" />
        <div>
          <h1 className="jobs-list-title">{title}</h1>
          <div className="star-rating-card">
            <IoMdStar className="star" />
            <p className="jobs-list-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="jobs-list-title">Description</h1>
      <p className="jobs-list-rating">{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJobs
