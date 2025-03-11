"use client";

import { IChartData } from "@/components/shared/DoughnutChart";
import { getDashboardData } from "@/services/dashboardService";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MONTHS } from "@/constants";
import { hideLoader, showLoader } from "@/utils/helper";

const DoughnutChart = dynamic(
  () => import("@/components/shared/DoughnutChart"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const DashboardCharts = () => {
  const [overAllAccountData, setOverAllAccountData] = useState<IChartData[]>(
    []
  );
  const [monthlyExpenseData, setMonthlyExpenseData] = useState<IChartData[]>(
    []
  );
  const [monthlyExpenseTypeData, setMonthlyExpenseTypeData] = useState<
    IChartData[]
  >([]);

  const fetchData = async (month?: number) => {
    showLoader();
    const dashboardData = await getDashboardData(month);

    setOverAllAccountData([
      {
        name: "Balance",
        value: dashboardData.totalAvailableAmount,
        color: "#0048ba",
      },
      { name: "Due", value: dashboardData.totalDueAmount, color: "#e32636" },
    ]);

    setMonthlyExpenseData(
      dashboardData.totalMonthlyExpenseAmount?.map((expense: any) => ({
        name: format(new Date(expense.year, expense.month, 0), "MMM yyyy"),
        value: expense.totalAmount,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      }))
    );

    setMonthlyExpenseTypeData(
      dashboardData.totalMonthlyTypeExpenseAmount?.map((typeExpense: any) => ({
        name: typeExpense.expenseTypeDetails.name,
        value: typeExpense.totalAmount,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      }))
    );
    hideLoader();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-auto flex flex-col sm:flex-row justify-around sm:items-end items-center">
      <DoughnutChart data={overAllAccountData} />
      <DoughnutChart data={monthlyExpenseData} />
      <div className="flex flex-col sm:items-end items-center mt-1">
        <Select onValueChange={(v) => fetchData(MONTHS.indexOf(v))}>
          <SelectTrigger className="col-span-3 w-52">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {MONTHS?.map((month) => (
                <SelectItem value={month} key={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DoughnutChart data={monthlyExpenseTypeData} />
      </div>
    </div>
  );
};

export default DashboardCharts;
