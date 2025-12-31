import axiosInstance from "@/api/axiosinstance";

export const registerServices = async (formData) => {
  const data = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
};
