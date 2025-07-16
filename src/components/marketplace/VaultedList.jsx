import DomainCard from "./DomainCard";

export default function VaultedList({ vaulted, showVaulted, toggleShowVaulted, onPurchase }) {
  if (!vaulted.length) return null;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">⛓️ Vaulted Domains</h2>
        <button
          className="text-sm underline text-zinc-400 hover:text-white"
          onClick={toggleShowVaulted}
        >
          {showVaulted ? "Hide" : "Show"}
        </button>
      </div>
      {showVaulted && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vaulted.map((domain, idx) => (
            <DomainCard
              key={domain.name + idx}
              domain={domain}
              faded={false}
              isVaulted={true}
              onPurchase={onPurchase}
              onView={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
} 