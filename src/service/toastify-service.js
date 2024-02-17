import { toast } from "react-toastify";

export const successToast = (message) => {
  toast.success(`${message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    style: {
      fontFamily: "Montserrat, sans-serif",
    },
  });
};

export const errorToast = (message) => {
  toast.error(`${message}`, {
    position: "top-right",
    autoClose: 5000,

    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    style: {
      fontFamily: "Montserrat, sans-serif",
    },
  });
};

export const infoToast = (message) => {
  toast.info(`${message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    style: {
      fontFamily: "Montserrat, sans-serif",
    },
  });
};
