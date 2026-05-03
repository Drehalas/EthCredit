export default function VaultPage() {
  return (
    <main className="premium-container">
      <section className="hero" style={{ paddingBottom: '1rem' }}>
        <div className="terminal-line">
          <span className="prompt">ethcredit@0g-network:~$</span>
          <span className="cmd">./inspect_vaults.sh</span>
        </div>
        <h1>SECURE_ESCROW_VAULTS</h1>
        <p>Automated asset management and task-based USDC escrow locks.</p>
      </section>

      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        
        <div className="webtui-panel">
          <div className="panel-header">
            <span><span className="status-indicator"></span> TASK_ESCROW_V2</span>
            <span>USDC-NATIVE</span>
          </div>
          <p style={{ marginBottom: '2rem' }}>Lock funds for agent commissions. Release automatically on verifiable proof of delivery via Opacus Escrow V2.</p>
          
          <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              <span>VAULT_BALANCE</span>
              <span style={{ color: 'var(--void)' }}>1,250.00 USDC</span>
            </div>
            <div style={{ height: '4px', background: 'var(--border)', width: '100%', position: 'relative' }}>
              <div style={{ width: '65%', height: '100%', background: 'var(--accent-cyan)', boxShadow: 'var(--accent-glow)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>65% UTILIZATION</span>
              <span>LOCKED: 812.50 USDC</span>
            </div>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
             <button className="btn-primary" style={{ flex: 1 }}>DEPOSIT_USDC()</button>
             <button className="btn-secondary" style={{ flex: 1 }}>WITHDRAW()</button>
          </div>
        </div>

        <div className="webtui-panel">
          <div className="panel-header">
            <span><span className="status-indicator" style={{ background: 'var(--success-text)', boxShadow: '0 0 10px var(--success-text)' }}></span> LIQUIDITY_PROVISION</span>
            <span>UNISWAP_V3</span>
          </div>
          <p style={{ marginBottom: '2rem' }}>Automated Uniswap V3 LP strategies managed by AI agents to optimize yield and minimize impermanent loss.</p>
          
          <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              <span>EST_APY</span>
              <span style={{ color: 'var(--success-text)' }}>12.4%</span>
            </div>
            <div style={{ height: '4px', background: 'var(--border)', width: '100%', position: 'relative' }}>
              <div style={{ width: '80%', height: '100%', background: 'var(--success-text)', boxShadow: '0 0 10px var(--success-text)' }}></div>
            </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>HEALTH_SCORE: OPTIMAL</span>
              <span>POOL: USDC/ETH 0.05%</span>
            </div>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" style={{ flex: 1 }}>MANAGE_LP()</button>
            <button className="btn-secondary" style={{ flex: 1 }}>CLAIM_FEES()</button>
          </div>
        </div>
        
      </div>
    </main>
  );
}
