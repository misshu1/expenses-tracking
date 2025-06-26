import * as React from "react";
import {Icon} from "@iconify/react";

interface AlertBoxProps {
	message: string;
}

const AlertBox: React.FC<AlertBoxProps> = ({message}) => (
	<div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg p-3 my-4 flex items-center gap-2 font-semibold">
		<Icon
			icon="ri:error-warning-line"
			width={22}
			height={22}
			className="text-red-600 dark:text-red-300"
		/>
		<span>{message}</span>
	</div>
);

export default AlertBox;
