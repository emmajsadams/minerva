"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { TaskEditDialog } from "@/components/TaskEditDialog";
import type { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

interface TaskPageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export default function TaskPage({ params }: TaskPageProps) {
  const router = useRouter();
  const [taskId, setTaskId] = useState<string | null>(null);

  const tasks = useQuery(api.tasks.getTasks);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [task, setTask] = useState<Doc<"tasks"> | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(true);

  // Handle async params
  useEffect(() => {
    params.then(({ taskId: id }) => {
      setTaskId(id);
    });
  }, [params]);

  // Find the specific task
  useEffect(() => {
    if (tasks && taskId) {
      const foundTask = tasks.find((t) => t._id === taskId);
      if (foundTask) {
        setTask(foundTask);
      } else {
        // Task not found, redirect to tasks page
        router.push("/tasks");
      }
    }
  }, [tasks, taskId, router]);

  const handleSaveTask = async (
    taskId: string,
    updates: Partial<Doc<"tasks">>
  ) => {
    try {
      await updateTask({ id: taskId as Id<"tasks">, ...updates });
      router.push("/tasks");
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask({ id: taskId as Id<"tasks"> });
      router.push("/tasks");
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    router.push("/tasks");
  };

  if (!task || !taskId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg">Loading task...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative bg-background text-foreground">
      {/* Task Details View */}
      <div
        className="w-full p-8"
        style={{ paddingLeft: "6rem", paddingRight: "6rem" }}
      >
        <div className="w-full min-w-[800px] max-w-4xl mx-auto bg-transparent rounded-xl">
          <div className="space-y-4" style={{ marginTop: "1.5rem" }}>
            {/* Task Header */}
            <div className="px-8 py-6 bg-slate-800/60 rounded-xl shadow-lg shadow-black/20">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {task.name}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="text-sm">
                  Status:{" "}
                  {task.status === "todo"
                    ? "To Do"
                    : task.status === "in_progress"
                      ? "In Progress"
                      : "Completed"}
                </span>
                <span className="text-sm">Priority: {task.priority}</span>
                {task.dueDate && (
                  <span className="text-sm">Due: {task.dueDate}</span>
                )}
              </div>
              {task.description && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{task.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <TaskEditDialog
        task={task}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
