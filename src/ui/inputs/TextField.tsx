import {type ChangeEvent, type FC, type JSX} from "react";

type TextFieldProps = {
	name: string;
	type: "text" | "textarea" | "email" | "password";
	isValid: boolean;
	isInvalid: boolean;
	label: string;
	value: string;
	onChange: (e: ChangeEvent) => void;
	autoComplete?: "on" | "off";
	isDisabled?: boolean;
	placeholder?: string;
	error?: string;
	children?: JSX.Element;
};

const TextField: FC<TextFieldProps> = ({
	type,
	name,
	isValid,
	isInvalid,
	error,
	onChange,
	label,
	value,
	isDisabled,
	placeholder,
	children,
	autoComplete = "off",
}) => {
	const baseContainer =
		"flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 transition-shadow border border-gray-200 dark:border-gray-700 rounded-lg";
	const valid = isValid ? "shadow-[0_0_5px_0_#4ade80]" : "";
	const invalid = isInvalid ? "shadow-[0_0_5px_0_#ef4444]" : "";
	const focus = "focus-within:shadow-[0_0_5px_0_#38bdf8]";
	const disabled = isDisabled ? "cursor-not-allowed grayscale" : "";
	const containerClassname = `${baseContainer} ${valid} ${invalid} ${focus} ${disabled}`;

	return (
		<div className="flex flex-col">
			<div className={containerClassname}>
				<label
					htmlFor={name}
					className="text-xs bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-1"
				>
					{label}
				</label>
				{type === "textarea" ? (
					<textarea
						className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none outline-none text-slate-100 text-base resize-vertical min-h-32 max-h-60 block disabled:cursor-not-allowed disabled:grayscale"
						id={name}
						name={name}
						onChange={onChange}
						value={value}
						placeholder={placeholder}
						disabled={isDisabled}
						autoComplete={autoComplete}
					/>
				) : (
					<input
						id={name}
						name={name}
						type={type}
						onChange={onChange}
						value={value}
						placeholder={placeholder}
						disabled={isDisabled}
						autoComplete={autoComplete}
						className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none outline-none h-6 text-slate-100 text-base disabled:cursor-not-allowed disabled:grayscale"
					/>
				)}
			</div>
			{error && (
				<span className="flex items-center gap-2 mt-2 text-red-400 font-bold text-sm min-w-[15px]">
					{children && <span>{children}</span>}
					<span>{error}</span>
				</span>
			)}
		</div>
	);
};

export default TextField;
