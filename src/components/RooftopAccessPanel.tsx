interface RooftopAccessPanelProps {
  dao: boolean;
}

export default function RooftopAccessPanel({ dao }: RooftopAccessPanelProps) {
  return (
    <div className="rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-black/40">
      <h3 className="text-lg font-semibold text-white/90 mb-3">
        Lounge Status
      </h3>

      <div className="text-white/70 text-sm space-y-2">
        <p>DAO Membership Required</p>
        <p>Private events, high-tier drops, and exclusive insights.</p>
      </div>

      <div className="mt-4">
        {dao ? (
          <span className="text-green-300 text-sm">✔ Access Granted</span>
        ) : (
          <span className="text-red-300 text-sm">✘ Access Denied</span>
        )}
      </div>
    </div>
  );
}

