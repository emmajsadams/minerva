"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Task {
  _id: string;
  name: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  deleted?: boolean;
}

interface TaskEditDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<Task>) => Promise<void>;
}

export function TaskEditDialog({
  task,
  isOpen,
  onClose,
  onSave,
}: TaskEditDialogProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [dueDate, setDueDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "// Enter task description...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] max-w-none prose-invert prose-green font-mono text-sm bg-input/50 backdrop-blur-sm border border-primary/30 rounded-sm p-4",
      },
    },
  });

  // Update form when task changes
  useEffect(() => {
    if (task) {
      setName(task.name);
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate || "");
      editor?.commands.setContent(task.description || "");
    }
  }, [task, editor]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setStatus("todo");
      setPriority("medium");
      setDueDate("");
      editor?.commands.clearContent();
    }
  }, [isOpen, editor]);

  const handleSave = async () => {
    if (!task || !name.trim()) return;

    setIsSaving(true);
    try {
      const description = editor?.getHTML() || "";
      await onSave(task._id, {
        name: name.trim(),
        description,
        status,
        priority,
        dueDate: dueDate || undefined,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card/90 backdrop-blur-md border border-primary/30 shadow-lg shadow-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-mono text-primary tracking-wider">
            EDIT_TASK.exe
          </DialogTitle>
          <DialogDescription className="text-accent font-mono text-sm">
            {`// Modify task parameters and description`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Task Name */}
          <div className="space-y-3">
            <Label
              htmlFor="task-name"
              className="text-blue-300 font-mono text-sm tracking-wider"
            >
              &gt; TASK_NAME:
            </Label>
            <Input
              id="task-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="task.name"
              className="lain-input cyber-border"
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label
                htmlFor="status"
                className="text-blue-300 font-mono text-sm tracking-wider"
              >
                &gt; STATUS:
              </Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])}
                className="w-full h-10 bg-input/50 backdrop-blur-sm border border-primary/30 text-purple-100 font-mono text-sm px-3 rounded-sm focus:border-accent focus:shadow-lg focus:shadow-accent/30 outline-none"
              >
                <option value="todo">TODO</option>
                <option value="in_progress">IN_PROGRESS</option>
                <option value="done">COMPLETED</option>
              </select>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="priority"
                className="text-blue-300 font-mono text-sm tracking-wider"
              >
                &gt; PRIORITY:
              </Label>
              <select
                id="priority"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Task["priority"])
                }
                className="w-full h-10 bg-input/50 backdrop-blur-sm border border-primary/30 text-purple-100 font-mono text-sm px-3 rounded-sm focus:border-accent focus:shadow-lg focus:shadow-accent/30 outline-none"
              >
                <option value="low">LOW</option>
                <option value="medium">MEDIUM</option>
                <option value="high">HIGH</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-3">
            <Label
              htmlFor="due-date"
              className="text-blue-300 font-mono text-sm tracking-wider"
            >
              &gt; DUE_DATE:
            </Label>
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="lain-input cyber-border"
            />
          </div>

          {/* Description Editor */}
          <div className="space-y-3">
            <Label className="text-blue-300 font-mono text-sm tracking-wider">
              &gt; DESCRIPTION:
            </Label>
            <div className="min-h-[200px] border border-primary/30 rounded-sm overflow-hidden cyber-border">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
            className="font-mono"
          >
            [CANCEL]
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="font-mono"
          >
            {isSaving ? "[SAVING...]" : "[SAVE_CHANGES]"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
