"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Typography from "@tiptap/extension-typography";
import { common, createLowlight } from "lowlight";
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

  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use lowlight version
      }),
      Placeholder.configure({
        placeholder: "Describe your task in detail...",
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "task-list",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "task-item",
        },
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "code-block",
        },
      }),
      Typography.configure({
        // Enable various markdown-like features
        oneHalf: false,
        oneQuarter: false,
        threeQuarters: false,
        plusMinus: false,
        notEqual: false,
        laquo: false,
        raquo: false,
        multiplication: false,
        superscriptTwo: false,
        superscriptThree: false,
        trademark: false,
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none prose-invert focus:outline-none min-h-[200px] p-6 bg-transparent text-foreground prose-headings:text-primary prose-strong:text-primary prose-em:text-secondary prose-code:text-primary prose-code:bg-primary/20 prose-code:px-2 prose-code:py-1 prose-a:text-primary prose-blockquote:text-secondary prose-blockquote:border-primary/30 prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground",
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
      title={isCreating ? "Create New Task" : "Edit Task"}
      description={
        isCreating
          ? "Create a new task with details, priority, and due date"
          : "Edit task details, status, priority, and due date"
      }
      footer={
        <div className="flex items-center justify-between w-full">
          {!isCreating && onDelete && (
            <div className="flex items-center gap-3">
              {!showDeleteConfirm ? (
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isSaving || isDeleting}
                  variant="ghost"
                  className="px-6 py-3 text-destructive font-medium rounded-lg transition-all duration-300 hover:bg-destructive/10 hover:scale-105 border-none shadow-none"
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
                    variant="ghost"
                    className="px-4 py-2 text-destructive font-medium rounded-lg transition-all duration-300 hover:bg-destructive/10 hover:scale-105 border-none shadow-none"
                  >
                    {isDeleting ? "Deleting..." : "Confirm"}
                  </Button>
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    variant="ghost"
                    className="px-4 py-2 text-muted-foreground font-medium rounded-lg transition-all duration-300 hover:bg-primary/10 hover:scale-105 border-none shadow-none"
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
            variant="ghost"
            className="px-8 py-3 text-primary font-medium rounded-lg transition-all duration-300 ml-auto hover:bg-primary/10 hover:scale-105 border-none shadow-none"
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
        {/* Task Name as Title */}
        <div className="mb-2">
          <Input
            id="task-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isCreating ? "Enter task name..." : "Task name"}
            className="task-name-input text-2xl text-foreground font-medium px-0 py-0 placeholder:text-muted-foreground"
            style={{
              fontSize: "1.5rem",
              lineHeight: "2rem",
            }}
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
