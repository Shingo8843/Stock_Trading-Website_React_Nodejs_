import PropTypes from "prop-types";

function UserGreeting(props) {
  const welcomeMessage = (
    <h1 className="welcome-message">Welcome {props.username}!</h1>
  );
  const signupMessage = <h1 className="signup-message">Please sign up.</h1>;

  return props.isLoggedIn ? welcomeMessage : signupMessage;
}

UserGreeting.defaultProps = {
  isLoggedIn: false,
  username: "Guest",
};
UserGreeting.propTypes = {
  isLoggedIn: PropTypes.bool,
  username: PropTypes.string,
};
export default UserGreeting;
