import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobDetailsItem extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobDetails: {}}

  componentDidMount() {
    this.getEachJobDetails()
  }

  getEachJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: data.job_details.life_at_company,
        similarJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => {
    this.getEachJobDetails()
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
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
      similarJobs,
    } = jobDetails
    return (
      <>
        <div className="each-job-item-specific">
          <div className="first-row-specific">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="second-row-specific">
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
            <p className="rating-specific">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line-specific" />
          <div className="description-visit-container">
            <h2 className="description-heading-specific">Description</h2>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit"
              style={{textDecoration: 'none'}}
            >
              Visit <BsBoxArrowUpRight />
            </a>
          </div>
          <p className="rating-specific">{jobDescription}</p>
          <h2 className="description-heading-specific">Skills</h2>
          <ul className="unordered-skills-container">
            {skills.map(eachSkill => (
              <li
                className="similar-job-logo-name-container"
                key={eachSkill.name}
              >
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="similar-job-logo"
                />
                <p className="similar-job-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-container">
            <div>
              <h2 className="description-heading-specific">Life at Company</h2>
              <p className="rating-specific">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <div className="similar-jobs-rendering-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="unordered-similar-jobs-container">
            {similarJobs.map(each => (
              <SimilarJobItem similarJobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
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
    return (
      <div className="specific-job-details-container">
        <Header />
        {this.renderJobsBasedOnApi()}
      </div>
    )
  }
}
export default JobDetailsItem
