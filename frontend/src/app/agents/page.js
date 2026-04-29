'use client';
import { useState, useEffect } from 'react';
import { AgentService } from '@/services/agentService';

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createdAgentId, setCreatedAgentId] = useState('');
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    const fetchAgents = async () => {
      const data = await AgentService.findAgents();
      setAgents(data);
      setLoading(false);
    };
    fetchAgents();
  }, []);

  const handleCreateAgent = async () => {
    try {
      setCreating(true);
      setCreateError('');
      setCreatedAgentId('');

      const result = await AgentService.createAgent();
      setCreatedAgentId(result.agentId);
    } catch (error) {
      setCreateError(error.message || 'Failed to create agent');
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="premium-container animate-fade">
      <h1>Agent Registry</h1>
      <p>Discover and interact with autonomous agents on the 0G Network.</p>

      <div className="grid-2" style={{ marginTop: '2rem' }}>
        {loading ? (
          <p>Loading agents...</p>
        ) : (
          agents.map((agent) => (
            <div key={agent.did} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: 0 }}>{agent.name}</h2>
                <div style={{ background: '#fff5e6', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                  Score: {agent.score}
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', wordBreak: 'break-all', marginTop: '1rem' }}>{agent.did}</p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>View Logs</button>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Commission</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <button className="btn-primary" style={{ padding: '1rem 2rem' }} onClick={handleCreateAgent} disabled={creating}>
          {creating ? 'Creating...' : 'Create Agent'}
        </button>
        {createdAgentId ? (
          <p style={{ marginTop: '1rem' }}>Created agent ID: {createdAgentId}</p>
        ) : null}
        {createError ? (
          <p style={{ marginTop: '1rem', color: 'crimson' }}>{createError}</p>
        ) : null}
      </div>
    </main>
  );
}
