import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      {/* HERO */}
      <div className="bg-white rounded-2xl shadow p-10 mb-8">
        <h1 className="text-5xl font-bold mb-4">
          TaskFlow
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl">
          A role-based project
          management system where
          Admins can create
          projects, assign tasks,
          and track team progress,
          while Members can manage
          assigned tasks and update
          statuses in real-time.
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-3">
            Authentication
          </h2>

          <p className="text-gray-600">
            Secure Signup/Login with
            JWT authentication and
            protected routes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-3">
            Project Management
          </h2>

          <p className="text-gray-600">
            Admins can create,
            update, and manage
            multiple projects.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-3">
            Task Tracking
          </h2>

          <p className="text-gray-600">
            Create tasks, assign
            members, set priorities,
            and track status
            updates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-3">
            Role-Based Access
          </h2>

          <p className="text-gray-600">
            Admins manage projects
            and tasks while Members
            update assigned work
            only.
          </p>
        </div>
      </div>

      {/* WORKFLOW */}
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-3xl font-bold mb-6">
          Workflow
        </h2>

        <div className="space-y-5">
          <div className="border-l-4 border-black pl-4">
            <h3 className="font-bold text-lg">
              1. User Authentication
            </h3>

            <p className="text-gray-600">
              Users register and
              login as Admin or
              Member.
            </p>
          </div>

          <div className="border-l-4 border-black pl-4">
            <h3 className="font-bold text-lg">
              2. Project Creation
            </h3>

            <p className="text-gray-600">
              Admin creates projects
              and manages team
              tasks.
            </p>
          </div>

          <div className="border-l-4 border-black pl-4">
            <h3 className="font-bold text-lg">
              3. Task Assignment
            </h3>

            <p className="text-gray-600">
              Tasks are assigned to
              members with due dates
              and priorities.
            </p>
          </div>

          <div className="border-l-4 border-black pl-4">
            <h3 className="font-bold text-lg">
              4. Progress Tracking
            </h3>

            <p className="text-gray-600">
              Members update task
              statuses and dashboard
              statistics update
              dynamically.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;