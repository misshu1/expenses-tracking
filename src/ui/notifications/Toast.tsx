import type {ToastContentProps} from "react-toastify";

type ToastData = {
	title: string;
	message: string;
	code?: number;
};

function Toast({
	toastProps,
	data: {message, title, code},
}: ToastContentProps<ToastData>) {
	const toastType = toastProps.type;
	const typeBgMap = {
		success: "bg-green-700",
		info: "bg-blue-600",
		warning: "bg-amber-600",
		error: "bg-red-700",
		default: "bg-gray-800",
	};
	const typeBg = typeBgMap[toastType] || typeBgMap.default;

	return (
		<div
			className={`flex flex-col w-full text-white ${typeBg} rounded-md p-4`}
		>
			<h3 className="flex items-center font-semibold text-base mb-1">
				{title}
			</h3>
			<p className="leading-relaxed break-words my-2">{message}</p>
			{code && (toastType === "warning" || toastType === "error") && (
				<p>
					{`${toastType === "warning" ? "Warn" : "Error"} code `}
					<span className="font-bold">{code}</span>
				</p>
			)}
		</div>
	);
}

export default Toast;
