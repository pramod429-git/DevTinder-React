import PropTypes from "prop-types";
const UsersCard = ({ user }) => {
  const { firstName, lastName, age, about, gender, photoUrl, skills } = user;
  return (
    <div className="card card-compact bg-base-300 w-72 shadow-xl">
      <figure>
        <img className="w-full" src={photoUrl} alt="user photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {/* {age && gender && <p>{age + ", " + gender}</p>} */}
        {age && <p>{age}</p>}
        {gender && <p>{gender}</p>}
        {about && <p>{about}</p>}
        {skills && <p>{skills}</p>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};
// ✅ Add PropTypes to remove the warning (chat-GPT)
UsersCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number,
    about: PropTypes.string,
    gender: PropTypes.string,
    photoUrl: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default UsersCard;
