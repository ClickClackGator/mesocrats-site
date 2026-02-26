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
  { axis: "Economic Policy", republican: 80, democrat: 25, american: 52 },
  { axis: "Governance", republican: 75, democrat: 35, american: 48 },
  { axis: "Personal Liberty", republican: 30, democrat: 70, american: 65 },
  { axis: "Cultural Identity", republican: 85, democrat: 20, american: 55 },
  { axis: "Foreign Policy", republican: 80, democrat: 35, american: 45 },
  { axis: "Fiscal Approach", republican: 80, democrat: 25, american: 50 },
  { axis: "Social Structure", republican: 75, democrat: 25, american: 42 },
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
                tick={{ fill: "#9CA3AF", fontSize: 11 }}
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
        <p className="text-gray-400 text-sm text-center mt-4 max-w-2xl mx-auto">
          Most Americans don&apos;t fit neatly into either party&apos;s profile.
          The Politiverse captures what the spectrum cannot.
        </p>
      </div>
    </section>
  );
}
