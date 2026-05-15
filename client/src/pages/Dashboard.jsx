import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const overdueTasks = tasks.filter((task) => {
    return (
      new Date(task.due_date) < new Date() &&
      task.status !== "Completed"
    );
  }).length;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Tasks</h2>

          <p className="text-3xl font-bold">
            {totalTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2>Completed</h2>

          <p className="text-3xl font-bold text-green-600">
            {completedTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2>Pending</h2>

          <p className="text-3xl font-bold text-yellow-500">
            {pendingTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2>Overdue</h2>

          <p className="text-3xl font-bold text-red-500">
            {overdueTasks}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;