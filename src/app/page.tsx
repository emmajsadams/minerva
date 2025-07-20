export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Minerva
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your personal productivity companion with task management, note storage, and AI integration.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-3">Task Management</h2>
            <p className="text-gray-600">
              Organize and track your tasks with priorities, due dates, and rich markdown descriptions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-3">Note Storage</h2>
            <p className="text-gray-600">
              Create and organize your notes with a powerful markdown editor.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-3">AI Integration</h2>
            <p className="text-gray-600">
              Get AI-powered assistance for your tasks and notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}