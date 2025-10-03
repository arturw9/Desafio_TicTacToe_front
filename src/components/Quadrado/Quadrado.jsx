import './Quadrado.css';

const Quadrado = ({ value, onClick }) => {
  let className = "square";
  if (value === "X") className += " square-x";
  if (value === "O") className += " square-o";

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Quadrado;