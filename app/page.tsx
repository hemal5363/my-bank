"use client";

import { IChartData } from "@/components/shared/DoughnutChart";
import { getDashboardData } from "@/services/dashboardService";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DoughnutChart = dynamic(
  () => import("@/components/shared/DoughnutChart"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const page = () => {
  const [overAllAccountData, setOverAllAccountData] = useState<IChartData[]>(
    []
  );

  const [monthlyExpenseData, setMonthlyExpenseData] = useState<IChartData[]>(
    []
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dashboardData = await getDashboardData();

    console.log("dashboardData", dashboardData);

    setOverAllAccountData([
      {
        name: "Balance",
        value: dashboardData.totalAvailableAmount,
        color: "#0048ba",
      },
      { name: "Due", value: dashboardData.totalDueAmount, color: "#e32636" },
    ]);

    setMonthlyExpenseData(
      dashboardData.totalMonthlyExpenseAmount.map((expense: any) => ({
        name: format(new Date(expense.year, expense.month, 0), "MMM yyyy"),
        value: expense.totalAmount,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      }))
    );
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6 text-center text-3xl font-extrabold">
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">My Statistics</h1>
      </div>
      <div className="overflow-auto flex flex-col sm:flex-row justify-around items-center">
        <DoughnutChart data={overAllAccountData} />
        <DoughnutChart data={monthlyExpenseData} />
      </div>
    </div>
  );
};

export default page;
