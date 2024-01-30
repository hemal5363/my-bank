"use client";

import { getDashboardData } from "@/services/dashboardService";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DoughnutChart = dynamic(
  () => import("@/components/shared/DoughnutChart"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const page = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dashboardData = await getDashboardData();

    console.log("dashboardData", dashboardData);
  };

  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6 relative text-center text-3xl font-extrabold">
      <DoughnutChart />
    </div>
  );
};

export default page;
