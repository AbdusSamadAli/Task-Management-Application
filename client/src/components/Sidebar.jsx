import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">TaskFlow</h1>

      <div className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
    </div>
  );
};

export default Sidebar;