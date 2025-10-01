function DashCard({ title, value, percentageChange, icon }) {
const textColorClass = percentageChange >= 0 ? 'text-green-500' : 'text-red-500';
const percentIcon = percentageChange >= 0 ? '▲' : '▼';
const formattedValue = title === 'Total Sales' ? `$${value}` : value;
return (
<div className="bg-white p-6 rounded-3xl shadow-lg flex-1 min-w-[250px] transition duration-300 hover:shadow-xl dark:bg-neutral-700 dark:shadow-2xl dark:hover:shadow-3xl">
    <div className="flex justify-between items-start mb-4">
    <p className="text-gray-600 font-medium dark:text-gray-400">{title}</p>
    <span className="text-2xl text-gray-400 dark:text-gray-500">{icon}</span>
    </div>

    <h2 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">
    {formattedValue}
    </h2>

    <p className={`text-sm ${textColorClass}`}>
    <span className="font-semibold">{`${percentIcon} ${Math.abs(percentageChange)}%`}</span> from last month
    </p>
</div>
);
}
export default DashCard;