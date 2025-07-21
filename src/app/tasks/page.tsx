"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { TaskEditDialog } from "@/components/TaskEditDialog";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const tasks = useQuery(api.tasks.getTasks);
  const createTask = useMutation(api.tasks.createTask);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleEditTask = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  // Listen for create task and search events from sidebar
  useEffect(() => {
    const handleCreateTaskEvent = () => {
      setIsCreateDialogOpen(true);
    };

    const handleSearchTasksEvent = (event: CustomEvent) => {
      setSearchTerm(event.detail.searchTerm);
    };

    window.addEventListener("create-task", handleCreateTaskEvent);
    window.addEventListener(
      "search-tasks",
      handleSearchTasksEvent as EventListener
    );
    return () => {
      window.removeEventListener("create-task", handleCreateTaskEvent);
      window.removeEventListener(
        "search-tasks",
        handleSearchTasksEvent as EventListener
      );
    };
  }, []);

  if (tasks === undefined) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-full w-full relative bg-background text-foreground">
      {/* Main Content */}
      <div
        className="w-full p-8"
        style={{ paddingLeft: "6rem", paddingRight: "6rem" }}
      >
        {/* Tasks Collection */}
        <div className="w-full min-w-[800px] max-w-4xl mx-auto bg-transparent rounded-xl">
          <div className="space-y-4" style={{ marginTop: "1.5rem" }}>
            {/* Tasks */}
            {filteredTasks.length === 0 ? (
              <div className="px-8 py-16 text-center bg-slate-800/60 rounded-xl shadow-lg shadow-black/20">
                <div className="text-secondary/60 text-lg mb-2">
                  {searchTerm ? "No tasks found" : "No tasks yet"}
                </div>
                <div className="text-muted-foreground text-sm">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Create your first task to begin your journey"}
                </div>
              </div>
            ) : (
              filteredTasks.map((task) => (
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
                    <span className="text-sm text-muted-foreground">
                      {task.status === "todo"
                        ? "To Do"
                        : task.status === "in_progress"
                          ? "In Progress"
                          : "Completed"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        task.priority === "high"
                          ? "bg-destructive/20 text-destructive"
                          : task.priority === "medium"
                            ? "bg-gold/20 text-gold"
                            : "bg-primary/20 text-primary"
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
