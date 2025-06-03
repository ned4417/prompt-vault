export default function Categories() {
  const categories = [
    { icon: '📊', name: 'Business', count: 127, progress: 65, color: 'blue', hoverBorder: 'hover:border-blue-200', progressBg: 'bg-blue-500' },
    { icon: '✍️', name: 'Writing', count: 89, progress: 45, color: 'purple', hoverBorder: 'hover:border-purple-200', progressBg: 'bg-purple-500' },
    { icon: '💻', name: 'Coding', count: 156, progress: 80, color: 'green', hoverBorder: 'hover:border-green-200', progressBg: 'bg-green-500' },
    { icon: '📱', name: 'Marketing', count: 94, progress: 50, color: 'pink', hoverBorder: 'hover:border-pink-200', progressBg: 'bg-pink-500' },
    { icon: '🎨', name: 'Creative', count: 73, progress: 37, color: 'yellow', hoverBorder: 'hover:border-yellow-200', progressBg: 'bg-yellow-500' },
    { icon: '⚡', name: 'Productivity', count: 112, progress: 60, color: 'indigo', hoverBorder: 'hover:border-indigo-200', progressBg: 'bg-indigo-500' }
  ]

  return (
    <div className="mb-12">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`category-btn bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl ${category.hoverBorder} transition-all duration-300 group`}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>
            <div className="font-bold text-gray-900 mb-1">{category.name}</div>
            <div className="text-sm text-gray-500">{category.count} prompts</div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-3">
              <div
                className={`${category.progressBg} h-1 rounded-full`}
                style={{ width: `${category.progress}%` }}
              ></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
