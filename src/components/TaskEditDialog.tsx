"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { StyledDialog } from "@/components/StyledDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Doc } from "../../convex/_generated/dataModel";

interface TaskEditDialogProps {
  task: Doc<"tasks"> | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<Doc<"tasks">>) => Promise<void>;
  onCreate?: (
    taskData: Omit<
      Doc<"tasks">,
      "_id" | "_creationTime" | "deleted" | "userId" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;
  onDelete?: (taskId: string) => Promise<void>;
  isCreating?: boolean;
}

export function TaskEditDialog({
  task,
  isOpen,
  onClose,
  onSave,
  onCreate,
  onDelete,
  isCreating = false,
}: TaskEditDialogProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Doc<"tasks">["status"]>("todo");
  const [priority, setPriority] = useState<Doc<"tasks">["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Describe your task in detail...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none prose-invert focus:outline-none min-h-[200px] p-6 bg-transparent text-foreground prose-headings:text-primary prose-strong:text-primary prose-em:text-secondary prose-code:text-primary prose-code:bg-primary/20 prose-code:px-2 prose-code:py-1 prose-a:text-primary prose-blockquote:text-secondary prose-blockquote:border-primary/30",
      },
    },
  });

  // Update form when task changes
  useEffect(() => {
    if (task && !isCreating) {
      setName(task.name);
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate || "");
      editor?.commands.setContent(task.description || "");
    } else if (isCreating) {
      // Reset to defaults for creating new task
      setName("");
      setStatus("todo");
      setPriority("medium");
      setDueDate("");
      editor?.commands.clearContent();
    }
  }, [task, editor, isCreating]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setStatus("todo");
      setPriority("medium");
      setDueDate("");
      setShowDeleteConfirm(false);
      editor?.commands.clearContent();
    }
  }, [isOpen, editor]);

  const handleSave = async () => {
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      const description = editor?.getHTML() || "";
      const taskData = {
        name: name.trim(),
        description,
        status,
        priority,
        dueDate: dueDate || undefined,
      };

      if (isCreating && onCreate) {
        await onCreate(taskData);
      } else if (task && onSave) {
        await onSave(task._id, taskData);
      }
      onClose();
    } catch (error) {
      console.error(
        isCreating ? "Failed to create task:" : "Failed to update task:",
        error
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!task || !onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(task._id);
      onClose();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <StyledDialog
      isOpen={isOpen}
      onClose={onClose}
      title={isCreating ? "Create New Task" : "Edit Task Details"}
      description={
        isCreating
          ? "Define your task parameters and dive into the details"
          : "Modify your task parameters and dive deeper into the details"
      }
      footer={
        <div className="flex items-center justify-between w-full">
          {!isCreating && onDelete && (
            <div className="flex items-center gap-3">
              {!showDeleteConfirm ? (
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isSaving || isDeleting}
                  className="px-6 py-3 bg-destructive/20 border-2 border-destructive/30 text-destructive font-medium rounded-lg hover:bg-destructive/30 hover:border-destructive/50 transition-all duration-300"
                >
                  Delete Task
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    Are you sure?
                  </span>
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-destructive border-2 border-destructive text-destructive-foreground font-medium rounded-lg hover:bg-destructive/90 transition-all duration-300"
                  >
                    {isDeleting ? "Deleting..." : "Confirm"}
                  </Button>
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-muted border-2 border-muted text-muted-foreground font-medium rounded-lg hover:bg-muted/80 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving || !name.trim() || isDeleting}
            className="px-8 py-3 bg-primary border-2 border-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 ml-auto"
          >
            {isSaving
              ? isCreating
                ? "Creating..."
                : "Saving..."
              : isCreating
                ? "Create Task"
                : "Save Changes"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-8 py-4">
        {/* Task Name */}
        <div className="space-y-3">
          <Label
            htmlFor="task-name"
            className="text-secondary font-medium text-sm"
          >
            Task Name
          </Label>
          <Input
            id="task-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name..."
            className="bg-input border border-transparent text-foreground px-4 py-3 font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
          />
        </div>

        {/* Status and Priority */}
        <div className="flex gap-6">
          <div className="flex-1 space-y-3">
            <Label
              htmlFor="status"
              className="text-secondary font-medium text-sm"
            >
              Status
            </Label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Doc<"tasks">["status"])
              }
              className="w-full bg-input border border-transparent text-foreground px-4 py-3 font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Completed</option>
            </select>
          </div>

          <div className="flex-1 space-y-3">
            <Label
              htmlFor="priority"
              className="text-secondary font-medium text-sm"
            >
              Priority
            </Label>
            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Doc<"tasks">["priority"])
              }
              className="w-full bg-input border border-transparent text-foreground px-4 py-3 font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-3">
          <Label
            htmlFor="due-date"
            className="text-secondary font-medium text-sm"
          >
            Due Date
          </Label>
          <Input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-input border border-transparent text-foreground px-4 py-3 font-medium rounded-lg hover:border-primary/30 focus:border-primary focus:shadow-lg focus:shadow-primary/20 transition-all duration-300"
          />
        </div>

        {/* Description Editor */}
        <div className="space-y-3">
          <Label className="text-secondary font-medium text-sm">
            Description
          </Label>
          <div className="min-h-[200px] bg-input border border-transparent rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </StyledDialog>
  );
}
