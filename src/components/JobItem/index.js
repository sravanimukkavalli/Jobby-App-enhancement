import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {eachJobDetail} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = eachJobDetail
  return (
    <li className="each-job-item">
      <Link to={`jobs/${id}`} style={{textDecoration: 'none'}}>
        <div className="first-row">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-img"
          />
          <div className="first-row-second-column">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar size={20} fill="#fbbf24" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="second-row">
          <div className="first-row">
            <div className="second-row-each-item">
              <MdLocationOn fill="#ffffff" size={20} />
              <p className="rating">{location}</p>
            </div>
            <div className="second-row-each-item">
              <BsBriefcaseFill fill="#ffffff" size={20} />
              <p className="rating">{employmentType}</p>
            </div>
          </div>
          <p className="rating">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h2 className="description-heading">Description</h2>
        <p className="rating">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
