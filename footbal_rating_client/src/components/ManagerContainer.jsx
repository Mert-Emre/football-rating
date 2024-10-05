import "../styles/manager.css";
import ManagerRefItem from "./Manager";

const ManagerContainer = ({ homeManager, awayManager, mode }) => {
  return (
    <div className="manager-container">
      <ManagerRefItem mode={mode} name={homeManager.name} id={homeManager.id} />
      <ManagerRefItem mode={mode} name={awayManager.name} id={awayManager.id} />
    </div>
  );
};

export default ManagerContainer;
