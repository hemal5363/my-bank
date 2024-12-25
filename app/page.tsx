import DashboardCharts from "@/components/shared/DashboardCharts";

const Page = () => {
  return (
    <div className="md:m-32 sm:m-16 m-8 border-2 rounded-3xl sm:p-12 p-6 text-center text-3xl font-extrabold">
      <div className="flex sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">My Statistics</h1>
      </div>
      <DashboardCharts />
    </div>
  );
};

export default Page;
