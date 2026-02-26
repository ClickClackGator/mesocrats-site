const positions = [
  {
    policy: "Healthcare",
    conservative: "Private supplemental insurance (choice)",
    liberal: "Universal baseline coverage (access)",
    insight:
      "Both -- the market and the safety net, working together",
  },
  {
    policy: "Tax Reform",
    conservative: "15% flat tax (simplicity)",
    liberal: "No corporate loopholes (fairness)",
    insight: "A tax code that treats everyone the same",
  },
  {
    policy: "Education",
    conservative: "$100K teacher pay tied to performance (accountability)",
    liberal: "Free through bachelor's degree (investment)",
    insight: "Invest big, expect results",
  },
  {
    policy: "Gun Reform",
    conservative: "No bans, no registry (liberty)",
    liberal: "Universal background checks (safety)",
    insight: "Protect rights AND protect people",
  },
  {
    policy: "Immigration",
    conservative: "Strong borders with technology (security)",
    liberal: "Streamlined legal pathways (inclusion)",
    insight: "Secure and welcoming aren't opposites",
  },
  {
    policy: "Housing",
    conservative: "Ban institutional investors from single-family homes",
    liberal: "N/A",
    insight: "Neither left nor right -- middle class protection",
  },
];

export default function PositionMap() {
  return (
    <section className="my-12 -mx-4 sm:mx-0">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-4 py-3 text-left font-semibold">Policy</th>
              <th className="px-4 py-3 text-left font-semibold">
                Conservative Element
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Liberal Element
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Politiverse Insight
              </th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos, i) => (
              <tr
                key={pos.policy}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {pos.policy}
                </td>
                <td className="px-4 py-3 text-gray-600">{pos.conservative}</td>
                <td className="px-4 py-3 text-gray-600">{pos.liberal}</td>
                <td className="px-4 py-3 text-brand-purple font-medium">
                  {pos.insight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {positions.map((pos, i) => (
          <div
            key={pos.policy}
            className={`rounded-lg border border-gray-200 overflow-hidden ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="bg-gray-900 text-white px-4 py-2 font-semibold text-sm">
              {pos.policy}
            </div>
            <div className="px-4 py-3 space-y-3 text-sm">
              <div>
                <span className="font-semibold text-red-600">
                  Conservative:
                </span>
                <p className="text-gray-600 mt-1">{pos.conservative}</p>
              </div>
              <div>
                <span className="font-semibold text-blue-600">Liberal:</span>
                <p className="text-gray-600 mt-1">{pos.liberal}</p>
              </div>
              <div>
                <span className="font-semibold text-brand-purple">
                  Politiverse:
                </span>
                <p className="text-brand-purple mt-1">{pos.insight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-sm text-center mt-6 max-w-2xl mx-auto">
        This is what multi-dimensional politics looks like. Not a point on a
        line. A position in the Politiverse.
      </p>
    </section>
  );
}
