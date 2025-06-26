import * as React from "react";
import {Icon} from "@iconify/react";
import {formatCurrency} from "@utils/currencyUtils";
import type {Currency} from "@utils/currencyUtils";

interface StatsCardsProps {
	income: number;
	spent: number;
	currency: Currency;
}

const StatsCards: React.FC<StatsCardsProps> = ({income, spent, currency}) => {
	const balance = income - spent;
	const savingsPct = income > 0 ? (balance / income) * 100 : 0;
	const overBudget = spent >= income;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
			<div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 flex flex-col items-center">
				<Icon
					icon="ri:wallet-3-line"
					width={28}
					height={28}
					className="text-blue-600 dark:text-blue-300 mb-1"
				/>
				<span className="text-xs text-blue-700 dark:text-blue-200">
					Total Income
				</span>
				<span className="text-lg font-bold text-gray-900 dark:text-gray-100">
					{formatCurrency(income, currency)}
				</span>
			</div>
			<div
				className={`rounded-lg p-4 flex flex-col items-center ${overBudget ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"}`}
			>
				<Icon
					icon="ri:shopping-bag-3-line"
					width={28}
					height={28}
					className={
						overBudget
							? "text-red-600 dark:text-red-300 mb-1"
							: "text-green-600 dark:text-green-300 mb-1"
					}
				/>
				<span
					className={
						overBudget
							? "text-xs text-red-700 dark:text-red-200"
							: "text-xs text-green-700 dark:text-green-200"
					}
				>
					Total Spent
				</span>
				<span className="text-lg font-bold text-gray-900 dark:text-gray-100">
					{formatCurrency(spent, currency)}
				</span>
				{overBudget && (
					<span className="text-xs text-red-700 dark:text-red-200 font-semibold mt-1">
						Over budget!
					</span>
				)}
			</div>
			<div className="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 flex flex-col items-center">
				<Icon
					icon="ri:bank-card-line"
					width={28}
					height={28}
					className="text-yellow-600 dark:text-yellow-300 mb-1"
				/>
				<span className="text-xs text-yellow-700 dark:text-yellow-200">
					Remaining
				</span>
				<span className="text-lg font-bold text-gray-900 dark:text-gray-100">
					{formatCurrency(balance, currency)}
				</span>
			</div>
			<div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 flex flex-col items-center">
				<Icon
					icon="ri:pie-chart-2-line"
					width={28}
					height={28}
					className="text-purple-600 dark:text-purple-300 mb-1"
				/>
				<span className="text-xs text-purple-700 dark:text-purple-200">
					Savings %
				</span>
				<span className="text-lg font-bold text-gray-900 dark:text-gray-100">
					{savingsPct.toFixed(1)}%
				</span>
			</div>
		</div>
	);
};

export default StatsCards;
