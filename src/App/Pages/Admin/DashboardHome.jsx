import { useSelector } from "react-redux";
import DashCard from "../../Components/DashCard";
import Text from "../../SharedElements/Text";
import { IoCubeOutline, IoCartOutline, IoPeopleOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";

function DashboardHome() {
  const myContent = useSelector((state) => state.myLang.content);
  const statsData = [
    {
      title: myContent.totalProducts,
      value: "1,250",
      percentageChange: 20.1,
      icon: <IoCubeOutline className="text-4xl text-gray-600 dark:text-gray-400" />,
    },
    {
      title: myContent.totalOrders,
      value: "789",
      percentageChange: 15.3,
      icon: <IoCartOutline className="text-4xl text-gray-600 dark:text-gray-400" />,
    },
    {
      title: myContent.totalSales,
      value: "12,450",
      percentageChange: 25.8,
      icon: <LuDollarSign className="text-4xl text-gray-600 dark:text-gray-400" />,
    },
    {
      title: myContent.activeUsers,
      value: "345",
      percentageChange: 5.1,
      icon: <IoPeopleOutline className="text-4xl text-gray-600 dark:text-gray-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 dark:bg-neutral-800 rounded-3xl">
      {/* Banner */}
      <div
        className="p-6 rounded-3xl shadow-lg mb-8 
        bg-gradient-to-r from-green-400 via-green-500 to-green-600 
        dark:bg-gradient-to-r dark:from-green-700 dark:via-green-800 dark:to-green-900"
      >
        <Text 
          as="h1" 
          content={myContent.dashboardWelcome} 
          MyClass="text-3xl font-bold text-gray-700 dark:text-white mb-2" 
        />
        <Text 
          as="p" 
          content={myContent.dashboardOverview} 
          MyClass="text-gray-700 dark:text-gray-200" 
        />
      </div>
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {statsData.map((stat, index) => (
          <DashCard
            key={index}
            title={stat.title}
            value={stat.value}
            percentageChange={stat.percentageChange}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
export default DashboardHome;
