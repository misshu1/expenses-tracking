import {
	forwardRef,
	useCallback,
	useEffect,
	useState,
	type ChangeEvent,
	type HTMLAttributes,
	type HTMLInputTypeAttribute,
} from "react";
import {Icon} from "@iconify/react";

type TextFieldProps = {
	name: string;
	type: "text" | "number" | "textarea" | "email" | "password";
	isValid: boolean;
	isInvalid: boolean;
	label: string;
	value: string | number | undefined;
	onChange: (e?: string | number) => void;
	autoComplete?: "on" | "off";
	isDisabled?: boolean;
	placeholder?: string;
	error?: string;
};

const TextField = forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	TextFieldProps
>(
	(
		{
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
			autoComplete = "off",
		},
		ref,
	) => {
		const [inputMode, setInputMode] =
			useState<HTMLAttributes<HTMLInputElement>["inputMode"]>("text");
		const [inputType, setInputType] =
			useState<HTMLInputTypeAttribute>("text");
		const baseContainer = `flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 transition-shadow ${!isValid && !isInvalid ? "shadow-shadow-[0_0_5px_0_#9ca3af] dark:shadow-[0_0_5px_0_#6b7280]" : ""} rounded-lg`;
		const valid = isValid ? "shadow-[0_0_5px_0_#4ade80]" : "";
		const invalid = isInvalid ? "shadow-[0_0_5px_0_#ef4444]" : "";
		const focus = "focus-within:shadow-[0_0_5px_0_#38bdf8]";
		const disabled = isDisabled
			? "cursor-not-allowed grayscale brightness-60"
			: "";
		const containerClassname = `${baseContainer} ${valid} ${invalid} ${focus} ${disabled}`;

		useEffect(() => {
			switch (type) {
				case "email":
					setInputMode("email");
					setInputType("email");
					break;
				case "textarea":
					setInputMode("text");
					break;
				case "number":
					setInputMode("tel");
					setInputType("tel");
					break;
				default:
					break;
			}
		}, [type]);

		const handleOnChange = useCallback(
			(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				let targetValue: number | string = (
					e.target as HTMLInputElement
				).value;

				if (type === "number") {
					targetValue = +targetValue.replace(/\D/g, "");
				}

				if (onChange) onChange(targetValue);
			},
			[onChange, type],
		);

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
							ref={ref as React.Ref<HTMLTextAreaElement>}
							className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none outline-none text-slate-100 text-base resize-vertical min-h-32 max-h-60 block disabled:cursor-not-allowed"
							id={name}
							name={name}
							onChange={handleOnChange}
							value={value}
							placeholder={placeholder}
							disabled={isDisabled}
							autoComplete={autoComplete}
							inputMode={inputMode}
						/>
					) : (
						<input
							ref={ref as React.Ref<HTMLInputElement>}
							id={name}
							name={name}
							type={inputType}
							aria-label={label}
							inputMode={inputMode}
							onChange={handleOnChange}
							value={value}
							placeholder={placeholder}
							disabled={isDisabled}
							autoComplete={autoComplete}
							className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none outline-none h-6 text-slate-100 text-base disabled:cursor-not-allowed"
						/>
					)}
				</div>
				{error && (
					<span className="flex items-center gap-2 mt-2 text-red-400 font-bold text-sm min-w-[15px]">
						<Icon icon="ri:alert-line" width={20} />
						<span>{error}</span>
					</span>
				)}
			</div>
		);
	},
);

export default TextField;
