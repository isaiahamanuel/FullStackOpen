const Success = (props) => {
  if (props.val === null) {
    return null;
  }
  return <div className="success-message">{props.val}</div>;
};

export default Success;
