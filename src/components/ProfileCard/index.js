import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    profileData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
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
      const fetchedProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: fetchedProfile,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderProfileData = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div>
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-p">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.setState({}, this.getProfileData)
  }

  renderFailureView = () => (
    <button type="button" className="find-button" onClick={this.onClickRetry}>
      Retry
    </button>
  )

  renderFinalProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderProfileData()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return <div className="profile-card">{this.renderFinalProfileView()}</div>
  }
}
export default ProfileCard
