import {toast} from "react-toastify";
import Toast from "./Toast";
import styles from "./Toast.module.css";

export const useNotifications = () => {
	const showSuccess = (title: string, message: string) =>
		toast.success(Toast, {
			data: {title, message},
			className: styles.success,
		});

	const showInfo = (title: string, message: string) =>
		toast.info(Toast, {
			data: {title, message},
			className: styles.info,
		});

	const showWarning = (title: string, message: string) =>
		toast.info(Toast, {
			data: {title, message},
			className: styles.warning,
		});

	const showError = (title: string, message: string, code?: number) =>
		toast.error(Toast, {
			data: {title, message, code},
			className: styles.error,
		});

	return {
		showSuccess,
		showInfo,
		showWarning,
		showError,
	};
};
