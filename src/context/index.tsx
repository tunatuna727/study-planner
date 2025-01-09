'use client';
import { Task } from '@/types/task';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Taskの配列を管理するためのコンテキストを作成
const TaskContext = createContext<
  | {
      tasks: Task[];
      temporaryTasks: Task[];
      addTask: (task: Task) => void;
      addTemporaryTask: (task: Task) => void;
      resetTemporaryTasks: () => void;
      updateTask: (index: number, updatedTask: Task) => void;
    }
  | undefined
>(undefined);

// コンテキストプロバイダーを作成
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [temporaryTasks, setTemporaryTasks] = useState<Task[]>([]);
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  }, []);

  useEffect(() => {
    // タスクが変更されたときにローカルストレージに保存
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const addTemporaryTask = (task: Task) => {
    setTemporaryTasks((prevTasks) => [...prevTasks, task]);
  };

  const resetTemporaryTasks = () => {
    setTemporaryTasks([]);
  };

  const updateTask = (index: number, updatedTask: Task) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = updatedTask;
      return newTasks;
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, temporaryTasks, addTask, addTemporaryTask, resetTemporaryTasks, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
