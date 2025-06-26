import React from "react";

interface CategorySelectorTableProps {
	incomeCategories: string[];
	expenseCategories: string[];
	onSelectCategory: (category: string) => void;
}

const CategorySelectorTable: React.FC<CategorySelectorTableProps> = ({
	incomeCategories,
	expenseCategories,
	onSelectCategory,
}) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full border-separate border-spacing-y-1">
				<thead>
					<tr>
						<th
							colSpan={2}
							className="text-left text-lg font-semibold py-2 px-4 bg-gray-100 dark:bg-gray-800"
						>
							Income Categories
						</th>
					</tr>
				</thead>
				<tbody>
					{incomeCategories.map(cat => (
						<tr
							key={cat}
							className="cursor-pointer transition hover:bg-blue-100 dark:hover:bg-blue-900"
							onClick={() => onSelectCategory(cat)}
						>
							<td
								className="py-2 px-4 border-b border-gray-200 dark:border-gray-700"
								colSpan={2}
							>
								{cat}
							</td>
						</tr>
					))}
				</tbody>
				<thead>
					<tr>
						<th
							colSpan={2}
							className="text-left text-lg font-semibold py-2 px-4 bg-gray-100 dark:bg-gray-800"
						>
							Expense Categories
						</th>
					</tr>
				</thead>
				<tbody>
					{expenseCategories.map(cat => (
						<tr
							key={cat}
							className="cursor-pointer transition hover:bg-blue-100 dark:hover:bg-blue-900"
							onClick={() => onSelectCategory(cat)}
						>
							<td
								className="py-2 px-4 border-b border-gray-200 dark:border-gray-700"
								colSpan={2}
							>
								{cat}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CategorySelectorTable;
