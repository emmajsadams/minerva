"use client";

import { useQuery, useMutation } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const { signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const tasks = useQuery(api.tasks.getTasks);
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [newTaskName, setNewTaskName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    try {
      await createTask({
        name: newTaskName,
        status: "todo",
        priority: "medium",
      });
      setNewTaskName("");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleStatusChange = async (taskId: string, status: "todo" | "in_progress" | "done") => {
    try {
      await updateTask({ id: taskId as any, status });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask({ id: taskId as any });
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Add authentication check
  useEffect(() => {
    console.log("Auth state:", { isAuthenticated, isLoading });
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    );
  }

  if (tasks === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Terminal Header */}
      <div className="bg-card/20 border-b border-border shadow-lg backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="text-primary font-mono text-lg">
                <span className="terminal-text">&gt; minerva_shell.exe</span>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-2 border border-primary/30 shadow-lg shadow-destructive/30/50 font-mono text-sm tracking-wide transition-all duration-200"
            >
              [LOGOUT]
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Create Task Button */}
        <div className="mb-8">
          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 border border-primary/30 shadow-lg shadow-primary/30 font-mono text-sm tracking-wider transition-all duration-200"
            >
              [+] NEW_TASK.exe
            </button>
          ) : (
            <form onSubmit={handleCreateTask} className="bg-card/30 p-6 border border-primary/30 backdrop-blur-sm">
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="text-accent font-mono text-sm mb-2">&gt; TASK_NAME:</div>
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="task.name"
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 border border-primary/30 shadow-lg shadow-primary/30 font-mono text-sm tracking-wide"
                  >
                    [CREATE]
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewTaskName("");
                    }}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 border border-primary/30 font-mono text-sm"
                  >
                    [CANCEL]
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Tasks Database */}
        <div className="bg-card/20 border border-primary/30 backdrop-blur-sm overflow-hidden">
          <div className="bg-card/30 px-6 py-3 border-b border-border">
            <h2 className="text-accent font-mono text-sm tracking-wider">&gt; DATABASE_RECORDS.tbl</h2>
          </div>
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-card/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-mono text-accent uppercase tracking-wider">
                  TASK_NAME
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono text-accent uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono text-accent uppercase tracking-wider">
                  PRIORITY
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono text-accent uppercase tracking-wider">
                  DUE_DATE
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono text-accent uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-card/10 divide-y divide-border/30">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-mono">
                    // NO_DATA_FOUND - Initialize database with first record
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-card/20 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-foreground">{task.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value as any)}
                        className="bg-input border border-primary/30 font-mono text-foreground text-sm px-2 py-1 rounded-sm focus:border-accent focus:shadow-lg focus:shadow-accent/20 focus:outline-none hover:border-primary/50 transition-all duration-200"
                      >
                        <option value="todo">TODO</option>
                        <option value="in_progress">IN_PROGRESS</option>
                        <option value="done">COMPLETED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-mono rounded border ${
                        task.priority === "high" ? "bg-destructive/20 text-destructive border-destructive/30 shadow-lg shadow-destructive/30/30" :
                        task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                        "bg-primary/20 text-primary border-primary/30 shadow-lg shadow-primary/30/30"
                      }`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-muted-foreground">
                      {task.dueDate || "NULL"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-destructive hover:text-destructive/80 font-mono text-sm border border-primary/30 px-2 py-1 shadow-lg shadow-destructive/30/30 hover:shadow-lg shadow-destructive/30 transition-all duration-200"
                      >
                        [DELETE]
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}