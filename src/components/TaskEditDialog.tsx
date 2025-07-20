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
      <DialogContent 
        className="p-0 bg-transparent border-0 shadow-none soul-dive mx-8"
        showCloseButton={false}
        style={{ maxWidth: '42rem', width: '95vw' }}
      >
        {/* Persona 3-style Shadow - Large Rotated Dialog Shape */}
        <div 
          className="absolute inset-0 border-2 transform -rotate-[13.5deg] translate-x-8 translate-y-6 -z-10"
          style={{ 
            borderRadius: '80px / 35px',
            backgroundColor: '#1E90FF',
            borderColor: '#1E90FF',
            width: '100%',
            height: '100%',
            opacity: '0.85'
          }}
        ></div>

        {/* Large Angled Triangular Accent Element - Positioned Outside Card */}
        <div className="absolute -top-[30px] left-[20px] z-20">
          <svg
            width="200"
            height="80"
            viewBox="0 0 200 80"
            className="overflow-visible"
          >
            <path
              d="M 15 10 L 180 20 L 60 65 Z"
              fill="hsl(var(--secondary) / 0.7)"
              className="drop-shadow-lg"
              transform="rotate(-5 100 40) scale(-1, 1)"
            />
          </svg>
        </div>

        {/* Main Dialog Rectangle */}
        <div 
          className="relative border-2 border-primary/40 overflow-hidden shadow-2xl shadow-primary/20"
          style={{ 
            backgroundColor: 'hsl(var(--card))',
            borderRadius: '80px / 35px'
          }}
        >

          {/* Main Dialog Content */}
          <div className="pt-12 px-12 pb-10">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl text-foreground font-medium mb-2">
                Edit Task Details
              </DialogTitle>
              <DialogDescription className="text-secondary/80 text-sm">
                Modify your task parameters and dive deeper into the details
              </DialogDescription>
            </DialogHeader>

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
                      setStatus(e.target.value as Task["status"])
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
                      setPriority(e.target.value as Task["priority"])
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

            <DialogFooter className="pt-6 border-t border-primary/20 mt-6">
              <Button
                onClick={handleSave}
                disabled={isSaving || !name.trim()}
                className="px-8 py-3 bg-primary border-2 border-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 ml-auto"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
