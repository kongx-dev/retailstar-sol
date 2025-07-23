// utils/fakeWallet.ts
export const generateSolanaLikeWallet = () => {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789'; // base58-safe
  const prefix = Array.from({ length: 4 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
  const suffix = Array.from({ length: 3 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
  return `${prefix}...${suffix}`;
}; 