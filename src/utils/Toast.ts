import Toast from "react-native-toast-message";

const successToast = (message: string) => {
    Toast.show({
              type: "success",
              text1: message,
              position: "bottom",
              visibilityTime: 2000,
            });
}

const errorToast = (message: string) => {
    Toast.show({
              type: "error",
              text1: message,
              position: "bottom",
              visibilityTime: 2000,
            });
}

export { errorToast, successToast };

