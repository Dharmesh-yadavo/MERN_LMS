import axiosInstance from "@/api/axiosinstance";

export const registerServices = async (formData) => {
  const data = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
};

export const loginService = async (formData) => {
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
};

export const checkAuthService = async () => {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
};

export const mediaUploadService = async (formData) => {
  const { data } = await axiosInstance.post("/media/upload", formData);

  return data;
};

export const mediaDeleteService = async (id) => {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);
  return data;
};
