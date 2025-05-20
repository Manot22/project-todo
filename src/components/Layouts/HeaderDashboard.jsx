const HeaderDashboard = (props) => {
  const { pendingTasks, completedTasks, handleOpenModal } = props;
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <div className="flex space-x-3">
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {pendingTasks.length} Pending
            </span>
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {completedTasks.length} Completed
            </span>
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Task
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderDashboard;
