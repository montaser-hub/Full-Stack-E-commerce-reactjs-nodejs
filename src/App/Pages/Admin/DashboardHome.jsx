import React from 'react';
import DashCard from '../../Components/DashCard';
import { IoCubeOutline, IoCartOutline, IoPeopleOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";

function DashboardHome() {
  const statsData = [
    {
      title: 'Total Products',
      value: '1,250',
      percentageChange: 20.1,
      icon: <IoCubeOutline className="text-4xl text-gray-600 dark:text-gray-400" />,
    },
    {
      title: 'Total Orders',
      value: '789',
      percentageChange: 15.3,
      icon: <IoCartOutline className="text-4xl text-gray-600 dark:text-gray-400" />,
    },
    {
      title: 'Total Sales',
      value: '12,450',
      percentageChange: 25.8,
      icon: <LuDollarSign className="text-4xl text-gray-600 dark:text-gray-400" />,
    },
    {
      title: 'Active Users',
      value: '345',
      percentageChange: 5.1,
      icon: <IoPeopleOutline className="text-4xl text-gray-600 dark:text-gray-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8  dark:bg-neutral-800 rounded-3xl">

      <div className="bg-white p-6 rounded-3xl shadow-lg mb-8 dark:bg-neutral-600 dark:shadow-2xl ">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
          Welcome Back, Admin!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's a quick overview of your e-commerce platform's performance.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center ">
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