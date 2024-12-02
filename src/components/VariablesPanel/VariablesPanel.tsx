import React from 'react';
import './style.css'

interface VariablesPanelProps {
  variables: { [key: string]: any };
}

const VariablesPanel: React.FC<VariablesPanelProps> = ({ variables }) => {
  return (
    <div className="variables-panel">
      <h3>Variáveis</h3>
      <ul>
        {Object.entries(variables).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {JSON.stringify(value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariablesPanel;
