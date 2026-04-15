function Loader({ text = "Cargando información..." }) {
  return (
    <div className="card loader-box">
      <h3>Un momento...</h3>
      <p>{text}</p>
    </div>
  );
}

export default Loader;