const Error = (props) => {
  if (props.val === null) {
    return null;
  }
  return <div className="error-message">{props.val}</div>;
};

export default Error;
