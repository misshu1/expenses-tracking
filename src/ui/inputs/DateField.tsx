import type {FC, ChangeEvent} from "react";
import {Icon} from "@iconify/react";

type DateFieldProps = {
	name: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	isValid?: boolean;
	isInvalid?: boolean;
	isDisabled?: boolean;
	error?: string;
	autoComplete?: "on" | "off";
};

const DateField: FC<DateFieldProps> = ({
	name,
	label,
	value,
	onChange,
	isValid = false,
	isInvalid = false,
	isDisabled = false,
	error,
	autoComplete = "off",
}) => {
	const baseContainer = `flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 transition-shadow ${!isValid && !isInvalid ? "shadow-shadow-[0_0_5px_0_#9ca3af] dark:shadow-[0_0_5px_0_#6b7280]" : ""} rounded-lg`;
	const valid = isValid ? "shadow-[0_0_5px_0_#4ade80]" : "";
	const invalid = isInvalid ? "shadow-[0_0_5px_0_#ef4444]" : "";
	const focus = "focus-within:shadow-[0_0_5px_0_#38bdf8]";
	const disabled = isDisabled
		? "cursor-not-allowed grayscale brightness-60"
		: "";
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
				<input
					id={name}
					name={name}
					type="date"
					value={value}
					onChange={onChange}
					disabled={isDisabled}
					autoComplete={autoComplete}
					className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none outline-none h-6 text-slate-100 text-base disabled:cursor-not-allowed dark:[color-scheme:dark]"
				/>
			</div>
			{error && (
				<span className="flex items-center gap-2 mt-2 text-red-400 font-bold text-sm min-w-[15px]">
					<Icon icon="ri:alert-line" width={20} />
					<span>{error}</span>
				</span>
			)}
		</div>
	);
};

export default DateField;
