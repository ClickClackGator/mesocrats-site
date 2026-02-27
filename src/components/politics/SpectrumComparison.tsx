"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";

// Scattered dots representing ideological positions
const conservativePoints = [
  { x: 78, y: 68 }, { x: 82, y: 72 }, { x: 75, y: 62 },
  { x: 85, y: 75 }, { x: 70, y: 65 }, { x: 88, y: 70 },
  { x: 72, y: 78 }, { x: 80, y: 60 }, { x: 76, y: 74 },
];

const liberalPoints = [
  { x: 22, y: 32 }, { x: 18, y: 28 }, { x: 25, y: 38 },
  { x: 15, y: 25 }, { x: 30, y: 35 }, { x: 20, y: 40 },
  { x: 28, y: 22 }, { x: 12, y: 30 }, { x: 24, y: 42 },
];

const otherPoints = [
  { x: 60, y: 20 }, { x: 35, y: 70 }, { x: 65, y: 30 },
  { x: 40, y: 60 }, { x: 55, y: 25 }, { x: 30, y: 55 },
  { x: 70, y: 40 }, { x: 45, y: 15 }, { x: 20, y: 60 },
  { x: 60, y: 80 }, { x: 38, y: 48 }, { x: 62, y: 55 },
];

const mesocratPoints = [
  { x: 48, y: 48 }, { x: 52, y: 52 }, { x: 50, y: 46 },
  { x: 46, y: 54 }, { x: 54, y: 50 }, { x: 49, y: 51 },
  { x: 51, y: 47 }, { x: 47, y: 53 }, { x: 53, y: 49 },
  { x: 50, y: 50 }, { x: 48, y: 52 }, { x: 52, y: 48 },
];

export default function SpectrumComparison() {
  return (
    <section className="my-12 -mx-4 sm:mx-0">
      <div className="bg-gray-900 rounded-lg p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left panel — The Line */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6 text-center">
              The Line
            </h4>
            <div className="px-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-500 font-bold text-sm">DEM</span>
                <span className="inline-block bg-brand-purple/20 text-brand-purple border border-brand-purple/40 rounded-full px-3 py-1 text-xs font-semibold">
                  Unrepresented
                </span>
                <span className="text-red-500 font-bold text-sm">GOP</span>
              </div>
              <div className="relative h-4 rounded-full bg-gradient-to-r from-blue-600 via-gray-500 to-red-600">
                <div className="absolute inset-y-0 left-1/4 right-1/4 bg-brand-purple/60 border-x-2 border-brand-purple rounded" />
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-blue-500 font-bold text-sm w-1/4 text-center">27%</span>
                <span className="text-brand-purple font-bold text-sm w-1/2 text-center">45%</span>
                <span className="text-red-500 font-bold text-sm w-1/4 text-center">27%</span>
              </div>
              <p className="text-gray-500 text-[10px] text-center mt-1">
                Gallup 2025 Party Identification
              </p>
              <p className="text-gray-400 text-xs text-center mt-2">
                Most Americans are unrepresented
              </p>
            </div>
          </div>

          {/* Right panel — Beyond the Line */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6 text-center">
              Beyond the Line
            </h4>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 25, left: 25 }}>
                  <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 100]}
                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    tickCount={5}
                  >
                    <Label
                      value="Economic Left / Right"
                      position="bottom"
                      offset={0}
                      fill="#9CA3AF"
                      fontSize={11}
                    />
                  </XAxis>
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0, 100]}
                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    tickCount={5}
                  >
                    <Label
                      value="Libertarian / Authoritarian"
                      angle={-90}
                      position="insideLeft"
                      dy={0}
                      style={{ textAnchor: "middle" }}
                      fill="#9CA3AF"
                      fontSize={11}
                    />
                  </YAxis>
                  <Scatter data={conservativePoints} fill="#DC2626" opacity={0.7} />
                  <Scatter data={liberalPoints} fill="#2563EB" opacity={0.7} />
                  <Scatter data={otherPoints} fill="#6B7280" opacity={0.5} />
                  <Scatter data={mesocratPoints} fill="#6c3393" opacity={0.9} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center max-w-2xl mx-auto">
          <div className="w-[60px] h-px bg-brand-purple mb-4" />
          <p className="text-white/80 text-lg font-extralight italic text-center">
            When you stop forcing people onto a line, you see where they actually
            stand
          </p>
        </div>
      </div>
    </section>
  );
}
