import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      richColors
      position="top-center"
      duration={4000}
      toastOptions={{
        success: {
          style: {
            background: "#fff",
            color: "#004A8D",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "12px 20px",
            width: "400px",
          },
        },
        error: {
          style: {
            background: "#fff",
            color: "#ff0000",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "12px 20px",
            border: "2px solid #ff0000",
            width: "400px",
          },
        },
      }}
    />
  );
}
