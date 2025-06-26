import React from "react";

interface CategoryDetailTableProps {
	categoryName: string;
	subcategories: {
		[subcategory: string]: number[]; // 12 months
	};
}

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const CategoryDetailTable: React.FC<CategoryDetailTableProps> = ({
	categoryName,
	subcategories,
}) => {
	// Calculate totals per month
	const totals = months.map((_, monthIdx) =>
		Object.values(subcategories).reduce(
			(sum, arr) => sum + (arr[monthIdx] || 0),
			0,
		),
	);

	return (
		<div className="overflow-x-auto rounded-b-lg">
			<table className="w-full min-w-[900px] text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 border-collapse">
				<thead>
					<tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<th
							scope="col"
							className="sticky whitespace-nowrap left-0 z-20 px-6 py-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left"
						>
							{categoryName}
						</th>
						{months.map(month => (
							<th
								key={month}
								className="px-6 py-3 text-center font-semibold"
							>
								{month}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Object.entries(subcategories).map(([subcat, values]) => (
						<tr
							key={subcat}
							className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition`}
						>
							<td className="sticky whitespace-nowrap left-0 z-10 px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-inherit">
								{subcat}
							</td>
							{values.map((val, idx) => (
								<td key={idx} className="px-6 py-3 text-center">
									{val}
								</td>
							))}
						</tr>
					))}
					<tr className="bg-green-600 bg-opacity-30 dark:bg-green-900 dark:bg-opacity-80 font-bold text-green-900 dark:text-green-200">
						<td className="sticky whitespace-nowrap left-0 z-10 px-6 py-3 bg-green-600 bg-opacity-30 dark:bg-green-900 dark:bg-opacity-80">
							Total
						</td>
						{totals.map((total, idx) => (
							<td key={idx} className="px-6 py-3 text-center">
								{total}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default CategoryDetailTable;
