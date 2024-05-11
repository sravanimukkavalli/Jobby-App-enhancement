import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJobDetails

  return (
    <div className="each-job-item-specific-similar">
      <div className="first-row-specific">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-img-specific"
        />
        <div className="first-row-second-column-specific">
          <h1 className="job-title-specific">{title}</h1>
          <div className="rating-container-specific">
            <FaStar size={24} fill="#fbbf24" />
            <p className="rating-specific">{rating}</p>
          </div>
        </div>
      </div>
      <h2 className="description-heading-specific">Description</h2>
      <p className="rating-specific">{jobDescription}</p>
      <div className="first-row-specific">
        <div className="second-row-each-item-specific">
          <MdLocationOn fill="#ffffff" size={24} />
          <p className="rating-specific">{location}</p>
        </div>
        <div className="second-row-each-item-specific">
          <BsBriefcaseFill fill="#ffffff" size={24} />
          <p className="rating-specific">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}
export default SimilarJobItem
