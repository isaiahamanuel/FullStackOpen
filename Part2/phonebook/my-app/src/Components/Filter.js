const Filter = (props) => {
  return (
    <div>
      filter: <input value={props.val} onChange={props.change} />
    </div>
  );
};

export default Filter;
