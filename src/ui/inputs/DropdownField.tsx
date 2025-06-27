import type {FC, ChangeEvent, JSX} from "react";

type Option = {
	label: string;
	value: string;
};

type DropdownFieldProps = {
	name: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	options: Option[];
	isValid?: boolean;
	isInvalid?: boolean;
	isDisabled?: boolean;
	error?: string;
	autoComplete?: "on" | "off";
	children?: JSX.Element;
};

const DropdownField: FC<DropdownFieldProps> = ({
	name,
	label,
	value,
	onChange,
	options,
	isValid = false,
	isInvalid = false,
	isDisabled = false,
	error,
	autoComplete = "off",
	children,
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
				<select
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					disabled={isDisabled}
					autoComplete={autoComplete}
					className="bg-transparent border-none outline-none h-6 text-slate-100 text-base disabled:cursor-not-allowed disabled:grayscale"
				>
					{options.map(opt => (
						<option
							key={opt.value}
							value={opt.value}
							className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
						>
							{opt.label}
						</option>
					))}
				</select>
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

export default DropdownField;
