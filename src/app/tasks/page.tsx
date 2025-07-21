"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { EditIcon, DeleteIcon, ConfirmIcon } from "@/components/ui/icons";
import { Plus } from "lucide-react";
import { TaskEditDialog } from "@/components/TaskEditDialog";
import type { Doc, Id } from "../../../convex/_generated/dataModel";

export default function TasksPage() {
  const tasks = useQuery(api.tasks.getTasks);
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
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

  const handleDeleteTask = async (taskId: string) => {
    if (deleteConfirmId === taskId) {
      // Second click - actually delete
      try {
        await deleteTask({ id: taskId as Id<"tasks"> });
        setDeleteConfirmId(null);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    } else {
      // First click - enter confirmation mode
      setDeleteConfirmId(taskId);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => {
        setDeleteConfirmId(null);
      }, 3000);
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
      <div className="w-full p-8">
        {/* Tasks Collection */}
        <div className="w-full min-w-[800px] max-w-6xl mx-auto bg-transparent rounded-xl overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-transparent">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-medium text-secondary">
                  <div className="flex items-center gap-3">
                    Task
                    <button
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="glass-panel hover:glow-aqua w-8 h-8 flex items-center justify-center text-primary border border-primary/30 rounded transition-all duration-300 hover:scale-105"
                      title="Create New Task"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </th>
                <th className="px-8 py-6 text-left text-sm font-medium text-secondary">
                  Status
                </th>
                <th className="px-8 py-6 text-left text-sm font-medium text-secondary">
                  Priority
                </th>
                <th className="px-8 py-6 text-left text-sm font-medium text-secondary">
                  Due Date
                </th>
                <th className="px-8 py-6 text-left text-sm font-medium text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <div className="text-secondary/60 text-lg mb-2">
                      No tasks yet
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Create your first task to begin your journey
                    </div>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-card/30 transition-all duration-300 group"
                  >
                    <td className="px-8 py-6">
                      <div className="text-foreground font-medium">
                        {task.name}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task._id,
                            e.target.value as "todo" | "in_progress" | "done"
                          )
                        }
                        className="persona-input text-sm px-3 py-2 rounded-lg"
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Completed</option>
                      </select>
                    </td>
                    <td className="px-8 py-6">
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
                    </td>
                    <td className="px-8 py-6 text-sm text-muted-foreground">
                      {task.dueDate || "—"}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleEditTask(task._id)}
                          className="glass-panel hover:glow-aqua p-2 rounded-lg border border-primary/30 transition-all duration-300"
                          title="Edit task"
                        >
                          <EditIcon className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className={`glass-panel p-2 rounded-lg border transition-all duration-300 ${
                            deleteConfirmId === task._id
                              ? "border-destructive/50 hover:glow-red bg-destructive/10"
                              : "border-destructive/30 hover:glow-red"
                          }`}
                          title={
                            deleteConfirmId === task._id
                              ? "Click again to confirm delete"
                              : "Delete task"
                          }
                        >
                          {deleteConfirmId === task._id ? (
                            <ConfirmIcon className="w-4 h-4 text-destructive" />
                          ) : (
                            <DeleteIcon className="w-4 h-4 text-destructive" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TaskEditDialog
        task={editingTask}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveTask}
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
