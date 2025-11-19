interface RooftopConsoleProps {
  dao: boolean;
  level: string;
}

export default function RooftopConsole({ dao, level }: RooftopConsoleProps) {
  return (
    <div className="w-full rounded-lg p-6 bg-purple-900/20 border border-purple-500/30 backdrop-blur-md shadow-xl shadow-purple-800/40">
      <h2 className="font-semibold text-purple-200 text-xl mb-3">
        Rooftop Lounge Console • v3.0
      </h2>

      <div className="space-y-3 text-sm text-white/70">
        <div className="flex justify-between">
          <span>Access Level:</span>
          <span className="text-purple-300">{level}</span>
        </div>

        <div className="flex justify-between">
          <span>DAO Membership:</span>
          <span className={dao ? "text-green-300" : "text-red-300"}>
            {dao ? "Verified" : "Restricted"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Benefits:</span>
          <span className="text-pink-300">Elite</span>
        </div>
      </div>
    </div>
  );
}


