const ProgressBar = ({ now, variant = "primary" }) => {
  return (
    <div className="progress" style={{height: "6px"}}>
      <div 
        className={`progress-bar bg-${variant}`}
        role="progressbar" 
        style={{width: `${now}%`}}
        aria-valuenow={now}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBar;