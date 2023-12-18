// AppContext.tsx
import React, { createContext, useContext, useState } from "react";
import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface User {
  id: string;
  username: string;
}

interface Task {
  title: ReactNode;
  id: string;
  // Add other task properties as needed
}

interface AppContextProps {
  user: User | null;
  tasks: Task[];
  login: (username: string, password: string) => void;
  register: (
    username: string,
    password: string,
    linkedinProfile: string
  ) => void;
  logout: () => void;
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updatedTask: Task) => void;
  getTasks: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);
let data ;
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(localStorage.getItem("userData") || null);
  const [tasks, setTasks] = useState([]);

  const login = async (email: string, password: string) => {
    console.log("loginnnnnnnnnnnnnnnnnnnnnnnnnnn");
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      setUser(response.data.userRegistreration);
      console.log(response.data);

      localStorage.setItem(
        "userData",
        JSON.stringify(response.data.userRegistreration)
      );
    } catch (error) {
      throw new Error("User Not Found");

      // Handle login error
    }
  };

  const register = async (
    email: string,
    password: string,
    linkedinProfile: string
  ) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
        linkedinProfile,
      });

      console.log(response);

      setUser(response.data.userRegistreration);
      console.log(response.data);
      localStorage.setItem(
        "userData",
        JSON.stringify(response.data.userRegistreration)
      );
    } catch (error) {
      throw new Error("user cant register");
      console.error("Error during registration:", error);
      // Handle registration error
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:3000/tasks", task);

      const newTask = response.data;

      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error during add task:", error);
      // Handle add task error
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error during delete task:", error);
      // Handle delete task error
    }
  };

  const updateTask = async (taskId: string, updatedTask: Task) => {
    try {
      const response = await axiosInstance.put(
        `/tasks/${taskId}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const updatedTaskData: Task = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTaskData : task))
      );
    } catch (error) {
      console.error("Error during update task:", error);
      // Handle update task error
    }
  };

  const getTasks = async () => {
    try {
      const userIdFrom =
        JSON.parse(localStorage.getItem("userData")).id || null;
      if (userIdFrom == null) {
        throw new Error("user not found");
      }
      const response = await axios.get(
        `http://localhost:3000/tasks?userId=${userIdFrom}`
      );

      const tasksData = response.data;
      data =tasksData
      setTasks(tasksData);
    } catch (error) {
      console.error("Error during get tasks:", error);
      // Handle get tasks error
    }
  };
  const filterTasks = (condition) => {
    switch (condition) {
      case "Sport":
        setTasks((prevTasks) =>
          prevTasks.filter((el) => el.description === "Sport")
        );
        break;

        case "Eductional":
          setTasks((prevTasks) =>
            prevTasks.filter((el) => el.description === "Eductional")
          );
          break;

          case "Eductional":
            setTasks((prevTasks) =>
              prevTasks.filter((el) => el.description === "Eductional")
            );
            break;

            case "Eductional":
              setTasks((prevTasks) =>
                prevTasks.filter((el) => el.description === "Eductional")
              );
              break;
      // Add more cases for different conditions as needed
  
      default:
        // Handle the default case by setting tasks to the original array
        setTasks(data);
        console.log("not sport you clicked")
        console.log(condition)
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        tasks,
        login,
        register,
        logout,
        addTask,
        deleteTask,
        updateTask,
        getTasks,
        filterTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
