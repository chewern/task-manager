import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="green" text="Hello" onClick={onAdd} />
    </header>
  );
};

Header.defaultProps = {
  // defaultProps sets the default value for Header.title
  title: "Task Manager",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  //this will specify that title ought to be string, and should not be left empty
};

export default Header;
