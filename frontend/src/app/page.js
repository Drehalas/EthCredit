export default function Home() {
  return (
    <main className="premium-container">
      <section className="hero">
        <div className="terminal-line">
          <span className="prompt">ethcredit@0g-network:~$</span>
          <span className="cmd">./init_agents.sh --deploy --all</span>
        </div>
        <h1>Agentic Command Center</h1>
        <p>
          Deploy sovereign AI agents that commission work, settle payments in USDC escrow, and interact with the physical world through the decentralized economy layer.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">_DEPLOY_AGENT</button>
          <button className="btn-secondary">VIEW_REGISTRY()</button>
        </div>
      </section>

      {/* Main Grid showing Multi-Session / Dashboard / Transactions */}
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
        
        {/* Active Sessions Panel (Multi-Agent Chat UI style) */}
        <div className="webtui-panel" style={{ gridColumn: 'span 12' }}>
          <div className="panel-header">
            <span><span className="status-indicator"></span> ACTIVE_SESSIONS (2)</span>
            <span>SYS.MEM: 45% | CPU: 12%</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            
            {/* Session 1: RAG & Context Agent */}
            <div style={{ border: '1px solid var(--border)', background: 'var(--cream)', padding: '1rem', position: 'relative' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                [ ID: AGENT-RAG-001 ]
              </div>
              <div className="terminal-line"><span className="prompt">Query:</span> "What are the requirements for the bond issuance?"</div>
              <div className="terminal-line" style={{ marginTop: '0.5rem' }}>
                <span className="cmd" style={{ color: 'var(--text-muted)' }}>[Source: 0x8a9b... Document.pdf (0G Storage)]</span>
              </div>
              <div className="terminal-line" style={{ marginTop: '0.5rem', color: 'var(--void)' }}>
                {'>'} Bond issuance requires 10,000 USDC collateral in Escrow Vault V2.
              </div>
            </div>

            {/* Session 2: On-Chain Exec Agent */}
            <div style={{ border: '1px solid var(--border)', background: 'var(--cream)', padding: '1rem', position: 'relative' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--accent-teal)' }}>
                [ ID: AGENT-SWAP-042 ]
              </div>
              <div className="terminal-line"><span className="prompt">Task:</span> Arbitrage ETH/USDC</div>
              <div className="terminal-line" style={{ marginTop: '0.5rem' }}>
                <span className="cmd" style={{ color: 'var(--text-muted)' }}>[Chain of Thought]</span>
              </div>
              <div className="terminal-line" style={{ color: 'var(--text-muted)' }}>1. Price diff {'>'} 0.5% identified</div>
              <div className="terminal-line" style={{ color: 'var(--text-muted)' }}>2. Generating Universal Router Calldata</div>
              <div className="terminal-line" style={{ color: 'var(--success-text)', marginTop: '0.5rem' }}>
                {'>'} Executing swap... TxHash pending.
              </div>
            </div>
            
          </div>
        </div>

        {/* Transaction Visualizer */}
        <div className="webtui-panel" style={{ gridColumn: 'span 8' }}>
          <div className="panel-header">
            <span>TX_VISUALIZER // Uniswap V3</span>
            <span>LIVE_FEED</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ border: '1px solid var(--accent-cyan)', padding: '1rem', background: 'rgba(6, 182, 212, 0.1)' }}>
                Agent Wallet<br/><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>0x71C...973</span>
              </div>
            </div>
            
            <div style={{ flex: 1, height: '2px', background: 'var(--border)', position: 'relative', margin: '0 1rem' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--accent-teal)' }}>
                SWAP: 1000 USDC -{'>'} 0.35 ETH
              </div>
              {/* Animated dot */}
              <div style={{ position: 'absolute', width: '8px', height: '8px', background: 'var(--success-text)', borderRadius: '50%', top: '-3px', left: '0', animation: 'moveRight 2s infinite' }}></div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ border: '1px solid var(--border)', padding: '1rem', background: 'var(--cream)' }}>
                Uniswap Pool<br/><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>USDC/ETH 0.05%</span>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes moveRight {
              0% { left: 0; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { left: 100%; opacity: 0; }
            }
          `}</style>
        </div>

        {/* Knowledge Base Upload (Admin Panel) */}
        <div className="webtui-panel" style={{ gridColumn: 'span 4' }}>
          <div className="panel-header">
            <span>CONTEXT_INJECTION</span>
            <span>RAG_DB</span>
          </div>
          <p style={{ marginBottom: '1rem' }}>Upload documents to train your agent's vector memory on 0G Storage.</p>
          <div style={{ border: '1px dashed var(--accent-cyan)', padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: 'rgba(6,182,212,0.05)' }}>
            <div style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>+</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Drag & Drop PDF or TXT</div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button className="btn-secondary" style={{ width: '100%', fontSize: '0.75rem' }}>SYNC_VECTORS()</button>
          </div>
        </div>

      </div>

      <footer style={{ marginTop: '4rem', paddingBottom: '2rem', borderTop: '1px dashed var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
        <p>SYS_VER: 2026.05 // ETHGlobal OpenAgents // [ALL SYSTEMS NOMINAL]</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>[ TWITTER ]</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>[ GITHUB ]</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>[ DOCS ]</a>
        </div>
      </footer>
    </main>
  );
}
