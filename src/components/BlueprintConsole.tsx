interface BlueprintConsoleProps {
  tier: string;
  verified: boolean;
}

export default function BlueprintConsole({ tier, verified }: BlueprintConsoleProps) {
  return (
    <div className="w-full rounded-lg p-6 bg-cyan-900/20 border border-cyan-500/20 backdrop-blur-md shadow-lg shadow-cyan-500/20">
      <h2 className="font-semibold text-cyan-300 text-lg mb-2">
        Blueprint Console • v2.1
      </h2>
      <div className="space-y-2 text-sm text-white/80">
        <div className="flex justify-between">
          <span>Tier Access:</span>
          <span className="text-cyan-200">{tier}</span>
        </div>
        <div className="flex justify-between">
          <span>WifHoodie Verified:</span>
          <span className={verified ? "text-green-300" : "text-red-300"}>
            {verified ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Premium Benefits:</span>
          <span className="text-purple-300">Active</span>
        </div>
      </div>
    </div>
  );
}


