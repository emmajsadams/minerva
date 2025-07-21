"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { PlusIcon } from "@/components/ui/icons";
import { TaskEditDialog } from "@/components/TaskEditDialog";
import type { Doc, Id } from "../../../convex/_generated/dataModel";

export default function TasksPage() {
  const tasks = useQuery(api.tasks.getTasks);
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [editingTask, setEditingTask] = useState<Doc<"tasks"> | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateTask = async (taskData: {
    name: string;
    description?: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate?: string;
  }) => {
    try {
      await createTask(taskData);
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const handleStatusChange = async (
    taskId: string,
    status: "todo" | "in_progress" | "done"
  ) => {
    try {
      await updateTask({ id: taskId as Id<"tasks">, status });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks?.find((t) => t._id === taskId);
    if (task) {
      setEditingTask(task);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveTask = async (
    taskId: string,
    updates: Partial<Doc<"tasks">>
  ) => {
    try {
      await updateTask({ id: taskId as Id<"tasks">, ...updates });
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingTask(null);
  };

  if (tasks === undefined) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative bg-background text-foreground">
      {/* Main Content */}
      <div
        className="w-full p-8"
        style={{ paddingLeft: "6rem", paddingRight: "6rem" }}
      >
        {/* Tasks Collection */}
        <div className="w-full min-w-[800px] max-w-4xl mx-auto bg-transparent rounded-xl">
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-10 gap-4 px-8 py-6 text-left text-sm font-medium text-secondary">
              <div className="col-span-4 flex items-center gap-3">
                Task
                <button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="w-8 h-8 flex items-center justify-center text-primary transition-all duration-300 hover:scale-105 rounded-full bg-primary/10 hover:bg-primary/20 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/30 relative overflow-hidden group"
                  title="Create New Task"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full transform" />
                  <PlusIcon className="w-4 h-4 relative z-10" />
                </button>
              </div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-2">Due Date</div>
            </div>

            {/* Tasks */}
            {tasks.length === 0 ? (
              <div className="px-8 py-16 text-center bg-slate-800/60 rounded-xl shadow-lg shadow-black/20">
                <div className="text-secondary/60 text-lg mb-2">
                  No tasks yet
                </div>
                <div className="text-muted-foreground text-sm">
                  Create your first task to begin your journey
                </div>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  onClick={() => handleEditTask(task._id)}
                  className="grid grid-cols-10 gap-4 p-8 bg-slate-800 hover:bg-slate-700 transition-all duration-300 rounded-xl group shadow-lg shadow-black/20 mb-6 cursor-pointer hover:shadow-xl hover:shadow-black/30 hover:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                    padding: "2rem",
                    marginBottom: "1.5rem",
                    borderRadius: "0.75rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className="col-span-4">
                    <div className="text-foreground font-medium">
                      {task.name}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <select
                      value={task.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(
                          task._id,
                          e.target.value as "todo" | "in_progress" | "done"
                        );
                      }}
                      className="persona-input text-sm px-3 py-2 rounded-lg w-full"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Completed</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        task.priority === "high"
                          ? "bg-destructive/20 text-destructive border border-destructive/30"
                          : task.priority === "medium"
                            ? "bg-gold/20 text-gold border border-gold/30"
                            : "bg-primary/20 text-primary border border-primary/30"
                      }`}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {task.dueDate || "—"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <TaskEditDialog
        task={editingTask}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveTask}
        onDelete={async (taskId: string) => {
          await deleteTask({ id: taskId as Id<"tasks"> });
        }}
      />

      <TaskEditDialog
        task={null}
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={() => Promise.resolve()}
        onCreate={handleCreateTask}
        isCreating={true}
      />
    </div>
  );
}
