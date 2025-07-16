import { Card, CardContent } from "../ui/card";
import Badge from "../ui/badge";
import { Button } from "../ui/button";
import CountdownTimer from "./CountdownTimer";

export default function DomainCard({ domain, faded, isVaulted, onExpire, onPurchase, onView }) {
  return (
    <Card
      className={`relative p-4 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-700 transition-all duration-700 ${
        faded ? "opacity-0 scale-90" : "hover:scale-105"
      } ${
        domain.tier === "Epic"
          ? "animate-float border-purple-500"
          : domain.tier === "Rare"
          ? "border-blue-500"
          : "border-green-500"
      }`}
    >
      <CardContent>
        <div className="text-xl font-semibold tracking-wide mb-1">{domain.name}</div>
        <div className="text-sm text-zinc-400 mb-3">{domain.price} SOL</div>
        <div className="flex gap-2 flex-wrap mb-3">
          <Badge variant="outline">{domain.tier}</Badge>
          {domain.hasWebsite && <Badge className="bg-green-700">Website</Badge>}
          {domain.vaulted && <Badge className="bg-yellow-700">Vaulted</Badge>}
          {domain.rotationExpires && !isVaulted && (
            <Badge className="bg-purple-700">
              ⏳ <CountdownTimer expires={domain.rotationExpires} onExpire={onExpire} />
            </Badge>
          )}
        </div>
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500"
          onClick={() => (isVaulted ? onPurchase(domain.name) : onView(domain.name))}
        >
          {isVaulted ? "Buy from Vault" : "View Details"}
        </Button>
      </CardContent>
    </Card>
  );
} 