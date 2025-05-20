const HeaderDashboard = (props) => {
  const { pendingTasks, completedTasks, handleOpenModal } = props;
  return (
    <header className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-black/50 backdrop-blur-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-200">Task Management</h1>
          <div className="flex space-x-3">
            <span className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold  text-gray-200">
              {pendingTasks.length} Pending
            </span>
            <span className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold text-gray-200">
              {completedTasks.length} Completed
            </span>
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold text-gray-200"
            >
             + Add Task
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderDashboard;
