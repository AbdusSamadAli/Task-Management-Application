import {
  useContext,
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import { AuthContext } from "../context/AuthContext";

import API from "../services/api";

const Projects = () => {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] =
    useState([]);

  const [projectTasks, setProjectTasks] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [viewProject, setViewProject] =
    useState(null);

  const [editProject, setEditProject] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  const [editData, setEditData] =
    useState({
      title: "",
      description: "",
    });

  useEffect(() => {
    fetchProjects();
  }, []);

  /* FETCH PROJECTS */
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

  /* CREATE INPUT */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* CREATE PROJECT */
  const handleCreateProject =
    async () => {
      try {
        await API.post(
          "/projects",
          formData
        );

        setShowModal(false);

        setFormData({
          title: "",
          description: "",
        });

        fetchProjects();
      } catch (error) {
        console.log(error);
      }
    };

  /* VIEW PROJECT */
  const handleViewProject =
    async (project) => {
      try {
        setViewProject(project);

        const { data } =
          await API.get("/tasks");

        const filteredTasks =
          data.filter(
            (task) =>
              task.project_id ===
              project.id
          );

        setProjectTasks(
          filteredTasks
        );
      } catch (error) {
        console.log(error);
      }
    };

  /* OPEN EDIT */
  const handleEditClick = (
    project
  ) => {
    setEditProject(project);

    setEditData({
      title: project.title,
      description:
        project.description,
    });
  };

  /* EDIT INPUT */
  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  /* UPDATE PROJECT */
  const handleUpdateProject =
    async () => {
      try {
        await API.put(
          `/projects/${editProject.id}`,
          editData
        );

        setEditProject(null);

        fetchProjects();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        {/* ADMIN ONLY */}
        {user?.role === "Admin" && (
          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer"
          >
            + Create Project
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* PROJECTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            {/* TITLE */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                {project.title}
              </h2>

              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                Active
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mb-5">
              {project.description}
            </p>

            {/* CREATOR */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Created By
              </p>

              <p className="font-medium">
                {project.creator_name}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              {/* VIEW */}
              <button
                onClick={() =>
                  handleViewProject(
                    project
                  )
                }
                className="flex-1 bg-black text-white py-2 rounded-lg cursor-pointer"
              >
                View
              </button>

              {/* EDIT */}
              {user?.role ===
                "Admin" && (
                <button
                  onClick={() =>
                    handleEditClick(
                      project
                    )
                  }
                  className="flex-1 border border-black py-2 rounded-lg cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {projects.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No projects found
        </div>
      )}

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[400px]">
            <h2 className="text-2xl font-bold mb-5">
              Create Project
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Project Title"
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

            <div className="flex gap-3">
              <button
                onClick={
                  handleCreateProject
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
      {editProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[400px]">
            <h2 className="text-2xl font-bold mb-5">
              Edit Project
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

            <div className="flex gap-3">
              <button
                onClick={
                  handleUpdateProject
                }
                className="flex-1 bg-black text-white py-3 rounded-lg cursor-pointer"
              >
                Update
              </button>

              <button
                onClick={() =>
                  setEditProject(null)
                }
                className="flex-1 border py-3 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                {viewProject.title}
              </h2>

              <button
                onClick={() =>
                  setViewProject(null)
                }
                className="text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-5">
              <p className="text-sm text-gray-500">
                Description
              </p>

              <p className="text-lg">
                {
                  viewProject.description
                }
              </p>
            </div>

            {/* CREATOR */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Created By
              </p>

              <p className="font-semibold">
                {
                  viewProject.creator_name
                }
              </p>
            </div>

            {/* TASKS */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Tasks
              </h3>

              {projectTasks.length ===
              0 ? (
                <p className="text-gray-500">
                  No tasks found for
                  this project
                </p>
              ) : (
                <div className="space-y-4">
                  {projectTasks.map(
                    (task) => (
                      <div
                        key={
                          task.id
                        }
                        className="border rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">
                            {
                              task.title
                            }
                          </h4>

                          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                            {
                              task.status
                            }
                          </span>
                        </div>

                        <p className="text-gray-600 mb-3">
                          {
                            task.description
                          }
                        </p>

                        <div className="flex justify-between text-sm">
                          <p>
                            Assigned:
                            <span className="font-semibold ml-1">
                              {
                                task.assigned_user
                              }
                            </span>
                          </p>

                          <p>
                            Priority:
                            <span className="font-semibold ml-1">
                              {
                                task.priority
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Projects;