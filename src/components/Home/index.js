import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-text-image-card">
      <div className="home-text-card">
        <h1 className="home-heading">
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs, salary information, company
          reviews.Find the Job that firs your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-button">
            Find Jobs
          </button>
        </Link>
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/home-sm-bg.png"
        alt="company logo"
        className="company-logo-sm"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
        alt="company logo"
        className="company-logo-lg"
      />
    </div>
  </div>
)

export default Home
