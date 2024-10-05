import "../styles/useError.css";

export const useError = (errors, prop) => {
  if (errors && errors[prop]) {
    return (
      <div className="error-container">
        <span className="error">{errors[prop]}</span>
      </div>
    );
  }
  return;
};
