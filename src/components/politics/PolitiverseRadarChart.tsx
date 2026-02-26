"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const radarData = [
  { axis: "Economic Policy (free market -> regulated)", republican: 25, democrat: 80, american: 55 },
  { axis: "Governance (distributed -> centralized)", republican: 35, democrat: 75, american: 50 },
  { axis: "Personal Liberty (collective -> individual)", republican: 40, democrat: 45, american: 65 },
  { axis: "Cultural Identity (evolution -> tradition)", republican: 85, democrat: 25, american: 55 },
  { axis: "Foreign Policy (non-interventionist -> interventionist)", republican: 65, democrat: 60, american: 35 },
  { axis: "Fiscal Approach (investment -> austerity)", republican: 80, democrat: 20, american: 45 },
  { axis: "Social Structure (egalitarian -> hierarchical)", republican: 70, democrat: 25, american: 45 },
];

export default function PolitiverseRadarChart() {
  return (
    <section className="my-12 -mx-4 sm:mx-0">
      <div className="bg-gray-900 rounded-lg p-6 sm:p-8">
        <div className="w-full" style={{ height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "#9CA3AF", fontSize: 9 }}
              />
              <PolarRadiusAxis
                tick={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Radar
                name="Typical Republican"
                dataKey="republican"
                stroke="#DC2626"
                fill="#DC2626"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name="Typical Democrat"
                dataKey="democrat"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name="Typical American"
                dataKey="american"
                stroke="#6c3393"
                fill="#6c3393"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Legend
                wrapperStyle={{ paddingTop: 16 }}
                formatter={(value: string) => (
                  <span className="text-gray-300 text-sm">{value}</span>
                )}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 flex flex-col items-center max-w-2xl mx-auto">
          <div className="w-[60px] h-px bg-brand-purple mb-4" />
          <p className="text-white/80 text-lg font-extralight italic text-center">
            Most Americans don&apos;t fit neatly into either party&apos;s profile.
            The Politiverse captures what the spectrum cannot
          </p>
        </div>
      </div>
    </section>
  );
}
