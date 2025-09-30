export default function StatCard({ title, value, subtitle, icon, myClass }) {
  return (
    <div
      className={`flex flex-col justify-between border dark:bg-neutral-800 dark:border-neutral-700 border-gray-200 shadow-sm rounded-lg p-5 w-[280px] h-[140px] ${myClass}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium ">{title}</span>
        <span className="text-green-500 text-lg">{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        {subtitle && <p className="text-sm ">{subtitle}</p>}
      </div>
    </div>
  );
}
