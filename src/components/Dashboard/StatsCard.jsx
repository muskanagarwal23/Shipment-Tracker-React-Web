const StatsCard = ({ title, value, icon, color }) => {
  const bgClass = `bg-${color}-subtle`;
  const textClass = `text-${color}`;
  
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted text-uppercase small">{title}</h6>
            <h2 className="mb-0 fw-bold">{value}</h2>
          </div>
          <div className={`p-3 rounded-circle ${bgClass} ${textClass}`}>
            <i className={`bi bi-${icon} fs-4`}></i>
          </div>
        </div>
        <div className={`progress mt-3`} style={{height: "4px"}}>
          <div 
            className={`progress-bar bg-${color}`} 
            role="progressbar" 
            style={{width: "100%"}}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;