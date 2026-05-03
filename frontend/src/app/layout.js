import { Space_Mono } from "next/font/google";
import "./globals.css";

const mono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: "EthCredit | Autonomous Bond & Credit Agents",
  description: "Next-generation credit scoring and bond automation powered by 0G Network and Uniswap.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mono.variable}>
        <nav>
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="none" stroke="#06b6d4" strokeWidth="2" />
              <path d="M7 17V7L17 17H7Z" fill="#06b6d4" />
              <path d="M17 7V17" stroke="#14b8a6" strokeWidth="2" strokeLinecap="square" />
            </svg>
            EthCredit_Terminal
          </div>
          <div className="nav-links">
            <a href="/" className="active">Dashboard</a>
            <a href="/agents">Agents</a>
            <a href="/swap">Swap</a>
            <a href="/vault">Vault</a>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--success-text)', marginRight: '1rem' }}>
              <span className="status-indicator"></span>
              NODE_ONLINE
            </span>
            <button className="btn-primary">[ CONNECT_WALLET ]</button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
