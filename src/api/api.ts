import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const signup = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/signup`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const signin = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/signin`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const changePassword = async (userData: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axios.patch(
      `${SERVER_URL}/api/changepassword`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const uploadTool = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/uploadtool`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const createTool = async (toolData: {
  name: string;
  description: string;
  brand: string;
  image: string;
}) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/tool`, toolData, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const readTools = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/tool`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const readTool = async (id: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/tool/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const updateTool = async (
  id: string,
  toolData: {
    name: string;
    description: string;
    brand: string;
  },
) => {
  try {
    const response = await axios.patch(
      `${SERVER_URL}/api/tool/${id}`,
      toolData,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const deleteTool = async (id: string) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/api/tool/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const addWorker = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/user/add`, userData, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const getWorkers = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/user/get`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const removeWorker = async (id: string) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/api/user/remove/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const addTool = async (id: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/tool/add/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const removeTool = async (id: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/tool/remove/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const approveTool = async (id: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/tool/approve/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const rejectTool = async (id: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/tool/reject/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const toolsByWorker = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/logs/worker`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const toolsByTime = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/logs/tool`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response.data.message || error.response.data.msg;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};
