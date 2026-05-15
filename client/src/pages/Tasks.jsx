import {
  useContext,
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";
import { AuthContext } from "../context/AuthContext";

import API from "../services/api";

const Tasks = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] =
    useState([]);
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [editTask, setEditTask] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      project_id: "",
      assigned_to: "",
      status: "Pending",
      priority: "Medium",
      due_date: "",
    });

  const [editData, setEditData] =
    useState({
      title: "",
      description: "",
      status: "",
      priority: "",
      due_date: "",
    });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(
        "/tasks"
      );

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await API.get(
        "/projects"
      );

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await API.get(
        "/auth/users"
      );

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async () => {
    try {
      await API.post("/tasks", formData);

      setShowModal(false);

      setFormData({
        title: "",
        description: "",
        project_id: "",
        assigned_to: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (task) => {
    setEditTask(task);

    setEditData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date
        ?.split("T")[0],
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateTask = async () => {
    try {
      await API.put(
        `/tasks/${editTask.id}`,
        editData
      );

      setEditTask(null);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        {user?.role === "Admin" && (
          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer"
          >
            + Create Task
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* TASKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            {/* TOP */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {task.title}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm
                ${
                  task.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : task.priority ===
                      "Medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {task.priority}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mb-4">
              {task.description}
            </p>

            {/* ASSIGNED USER */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">
                Assigned To
              </p>

              <p className="font-medium">
                {task.assigned_user ||
                  "Not Assigned"}
              </p>
            </div>

            {/* DUE DATE */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Due Date
              </p>

              <p className="font-medium">
                {task.due_date
                  ? task.due_date.split(
                      "T"
                    )[0]
                  : "No Date"}
              </p>
            </div>

            {/* STATUS */}
            <div className="flex items-center justify-between">
              {user?.role === "Member" ? (
                <select
                  defaultValue={
                    task.status
                  }
                  className="border p-2 rounded-lg"
                >
                  <option>
                    Pending
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Completed
                  </option>
                </select>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm
                  ${
                    task.status ===
                    "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status ===
                        "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              )}

              {/* EDIT */}
              {user?.role === "Admin" && (
                <button
                  onClick={() =>
                    handleEditClick(task)
                  }
                  className="border border-black px-4 py-2 rounded-lg cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {tasks.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No tasks found
        </div>
      )}

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[450px]">
            <h2 className="text-2xl font-bold mb-5">
              Create Task
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            />

            {/* PROJECT */}
            <select
              name="project_id"
              value={
                formData.project_id
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            >
              <option value="">
                Select Project
              </option>

              {projects.map(
                (project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.title}
                  </option>
                )
              )}
            </select>

            {/* MEMBER */}
            <select
              name="assigned_to"
              value={
                formData.assigned_to
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            >
              <option value="">
                Assign Member
              </option>

              {users
                .filter(
                  (user) =>
                    user.role ===
                    "Member"
                )
                .map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
            </select>

            {/* PRIORITY */}
            <select
              name="priority"
              value={
                formData.priority
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            >
              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>
            </select>

            {/* DATE */}
            <input
              type="date"
              name="due_date"
              value={
                formData.due_date
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
            />

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={
                  handleCreateTask
                }
                className="flex-1 bg-black text-white py-3 rounded-lg cursor-pointer"
              >
                Create
              </button>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="flex-1 border py-3 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[450px]">
            <h2 className="text-2xl font-bold mb-5">
              Edit Task
            </h2>

            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={
                handleEditChange
              }
              className="w-full border p-3 rounded-lg mb-4"
            />

            <textarea
              name="description"
              value={
                editData.description
              }
              onChange={
                handleEditChange
              }
              className="w-full border p-3 rounded-lg mb-4"
            />

            <select
              name="status"
              value={editData.status}
              onChange={
                handleEditChange
              }
              className="w-full border p-3 rounded-lg mb-4"
            >
              <option>
                Pending
              </option>

              <option>
                In Progress
              </option>

              <option>
                Completed
              </option>
            </select>

            <select
              name="priority"
              value={
                editData.priority
              }
              onChange={
                handleEditChange
              }
              className="w-full border p-3 rounded-lg mb-4"
            >
              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>
            </select>

            <input
              type="date"
              name="due_date"
              value={
                editData.due_date
              }
              onChange={
                handleEditChange
              }
              className="w-full border p-3 rounded-lg mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={
                  handleUpdateTask
                }
                className="flex-1 bg-black text-white py-3 rounded-lg cursor-pointer"
              >
                Update
              </button>

              <button
                onClick={() =>
                  setEditTask(null)
                }
                className="flex-1 border py-3 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Tasks;