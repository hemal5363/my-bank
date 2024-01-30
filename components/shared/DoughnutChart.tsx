"use client";

import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

export interface IChartData {
  name: string;
  value: number;
  color: string;
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={fill} fontSize={12}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={fill} fontSize={12}>
        {value}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill} fontSize={12}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 4}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const DoughnutChart = ({ data }: { data: IChartData[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={300} height={300}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={150}
        cy={150}
        innerRadius={60}
        outerRadius={90}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default DoughnutChart;
