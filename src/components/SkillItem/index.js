import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="skill-list-item">
      <img src={imageUrl} alt="company logo" className="skill-image" />
      <p className="jobs-list-rating">{name}</p>
    </li>
  )
}

export default SkillItem
