/* eslint-disable no-unused-vars */
import { toast } from "sonner";

// 🔹 Handles API error messages consistently
export const handleErrors = (errorMessage) => {
  if (typeof errorMessage === "string") {
    toast.error(errorMessage);
  } else if (errorMessage && typeof errorMessage === "object") {
    Object.entries(errorMessage).forEach(([key, value]) => {
      const message = Array.isArray(value) ? value.join(", ") : String(value);
      toast.error(message);
    });
  } else {
    toast.error("An unexpected error occurred");
  }
};

// 🔹 Universal submit handler for RTK Query or async API calls
export const handleSubmit = async ({
  values,
  apiCall,
  refetch = () => {},
  transformValues = (vals) => vals,
  successMessage = "",
  onSuccess = () => {},
  onError = () => {},
  navigate,
  successRedirect,
  showToast = true,
}) => {
  try {
    // Transform payload if necessary (e.g., FormData conversion)
    const payload = transformValues(values);

    // Execute API call
    console.log("first",payload)
    const response = await apiCall(payload).unwrap();

    if (response?.success) {
      if (showToast)
        toast.success(successMessage ? successMessage : response?.message);
      refetch();
      onSuccess(response?.data);
      if (navigate && successRedirect) navigate(successRedirect);
    } else {
      handleErrors(response?.message || "Failed to complete the operation");
      onError(response);
    }

    return response;
  } catch (error) {
    console.error("Submit error:", error);

    const errorMsg =
      error?.data?.message ||
      error?.data?.error ||
      error?.message ||
      "An unexpected error occurred";

    handleErrors(errorMsg);
    onError(error);
  }
};
