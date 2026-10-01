import { CheckCircle2, Clock, Plus, User } from 'lucide-react';
import React from 'react';

interface Task {
  id: string;
  title: string;
  status: 'TO DO' | 'IN PROGRESS' | 'COMPLETE';
  assignee: string;
  dueDate: string;
}

const statusColors = {
  'TO DO': 'bg-gray-500/20 text-gray-300 border-gray-500/40',
  'IN PROGRESS': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  'COMPLETE': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
};

export const TaskListView: React.FC = () => {
  const tasks: Task[] = [
    { id: '1', title: 'Integrate ClickUp theme tokens into relay.css', status: 'IN PROGRESS', assignee: 'Shubham', dueDate: 'Today' },
    { id: '2', title: 'Refactor AppSidebar hierarchy', status: 'TO DO', assignee: 'Dev Team', dueDate: 'Oct 3' },
    { id: '3', title: 'Add dynamic view tab toolbar', status: 'COMPLETE', assignee: 'Shubham', dueDate: 'Yesterday' }
  ];

  return (
    <div className="flex-1 bg-[#18191B] text-gray-200 p-6 overflow-x-auto">
      {/* View Header Toolbar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#333538] mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-white">Frontend Sprint</h1>
          <div className="flex bg-[#242528] p-1 rounded-lg border border-[#333538] text-xs font-medium">
            <button className="px-3 py-1 rounded-md bg-[#7B68EE] text-white shadow-sm">List</button>
            <button className="px-3 py-1 rounded-md text-gray-400 hover:text-white transition">Board</button>
            <button className="px-3 py-1 rounded-md text-gray-400 hover:text-white transition">Calendar</button>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7B68EE] hover:bg-[#6855e0] text-white rounded-lg text-xs font-semibold shadow-md transition">
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Task List Table */}
      <div className="w-full border border-[#333538] rounded-lg overflow-hidden bg-[#1E1F23]">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-[#242528] border-b border-[#333538] text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2">Assignee</div>
          <div className="col-span-2">Due Date</div>
        </div>

        <div className="divide-y divide-[#333538]">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-[#2A2B2D] transition text-sm cursor-pointer group"
            >
              <div className="col-span-5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gray-500 group-hover:text-[#7B68EE] transition" />
                <span className="font-medium text-white">{task.title}</span>
              </div>
              
              <div className="col-span-3">
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${statusColors[task.status]}`}>
                  {task.status}
                </span>
              </div>

              <div className="col-span-2 flex items-center gap-1.5 text-xs text-gray-300">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>{task.assignee}</span>
              </div>

              <div className="col-span-2 flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>{task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};