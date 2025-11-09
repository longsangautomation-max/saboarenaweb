/**
 * Bracket Connector - Draw SVG lines connecting matches in tournament bracket
 * Professional tournament bracket visualization
 */

import React from 'react';

interface ConnectorProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color?: string;
  type?: 'winner' | 'loser';
}

/**
 * Draw a connector line between two matches
 * Uses SVG path with smooth curves for professional look
 */
export const BracketConnector: React.FC<ConnectorProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  color = '#64748b',
  type = 'winner'
}) => {
  // Calculate midpoint for the curve
  const midX = (fromX + toX) / 2;
  
  // Create smooth bezier curve path
  const path = `
    M ${fromX} ${fromY}
    L ${midX} ${fromY}
    L ${midX} ${toY}
    L ${toX} ${toY}
  `;

  const strokeWidth = type === 'winner' ? 2 : 1.5;
  const strokeDasharray = type === 'loser' ? '4,4' : 'none';

  return (
    <path
      d={path}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      fill="none"
      opacity={0.6}
      className="transition-opacity hover:opacity-100"
    />
  );
};

interface BracketConnectionLayerProps {
  matches: Array<{
    id: string;
    round_number: number;
    match_number: number;
    x: number;
    y: number;
    height: number;
  }>;
  type: 'winner' | 'loser';
  color?: string;
}

/**
 * Layer that draws all connections between matches in a bracket
 */
export const BracketConnectionLayer: React.FC<BracketConnectionLayerProps> = ({
  matches,
  type,
  color = '#64748b'
}) => {
  const connections: Array<{
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
  }> = [];

  // Group matches by round
  const rounds: { [key: number]: typeof matches } = {};
  matches.forEach(m => {
    if (!rounds[m.round_number]) rounds[m.round_number] = [];
    rounds[m.round_number].push(m);
  });

  // Connect matches between consecutive rounds
  const roundNumbers = Object.keys(rounds).map(Number).sort((a, b) => a - b);
  
  for (let i = 0; i < roundNumbers.length - 1; i++) {
    const currentRound = rounds[roundNumbers[i]];
    const nextRound = rounds[roundNumbers[i + 1]];

    // Each match in next round gets input from 2 matches in current round
    nextRound.forEach((nextMatch, idx) => {
      const sourceMatch1 = currentRound[idx * 2];
      const sourceMatch2 = currentRound[idx * 2 + 1];

      if (sourceMatch1) {
        connections.push({
          fromX: sourceMatch1.x + 280, // Card width
          fromY: sourceMatch1.y + sourceMatch1.height / 2,
          toX: nextMatch.x,
          toY: nextMatch.y + nextMatch.height / 2
        });
      }

      if (sourceMatch2) {
        connections.push({
          fromX: sourceMatch2.x + 280,
          fromY: sourceMatch2.y + sourceMatch2.height / 2,
          toX: nextMatch.x,
          toY: nextMatch.y + nextMatch.height / 2
        });
      }
    });
  }

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {connections.map((conn, idx) => (
        <BracketConnector
          key={idx}
          fromX={conn.fromX}
          fromY={conn.fromY}
          toX={conn.toX}
          toY={conn.toY}
          color={color}
          type={type}
        />
      ))}
    </svg>
  );
};

export default BracketConnector;
