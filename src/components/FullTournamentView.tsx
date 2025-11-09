/**
 * Full Tournament View - Display all 4 groups + Cross Finals in one screen
 * Layout: 4 groups in corners + Cross Finals in center/bottom
 */

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { MatchCard } from './MatchCard';
import type { BracketMatch } from '@/types/bracket';

interface FullTournamentViewProps {
  allMatches: BracketMatch[];
  groupAMatches: BracketMatch[];
  groupBMatches: BracketMatch[];
  groupCMatches: BracketMatch[];
  groupDMatches: BracketMatch[];
  crossMatches: BracketMatch[];
}

interface PositionedMatch extends BracketMatch {
  x: number;
  y: number;
  height: number;
}

interface GroupPositions {
  wb: PositionedMatch[];
  lbA: PositionedMatch[];
  lbB: PositionedMatch[];
}

/**
 * Calculate tree-style positions (same as FullBracketView)
 */
function calculateTreePositions(
  matches: BracketMatch[],
  startY: number,
  cardWidth: number,
  cardHeight: number,
  horizontalGap: number,
  verticalGap: number
): PositionedMatch[] {
  if (matches.length === 0) return [];

  const rounds = groupByRound(matches);
  const roundNumbers = Object.keys(rounds).map(Number).sort((a, b) => a - b);
  const positioned: PositionedMatch[] = [];

  // Position first round
  const firstRound = rounds[roundNumbers[0]];
  for (let i = 0; i < firstRound.length; i++) {
    positioned.push({
      ...firstRound[i],
      x: 0,
      y: startY + i * (cardHeight + verticalGap),
      height: cardHeight
    });
  }

  // Position subsequent rounds (centered between source matches)
  for (let roundIdx = 1; roundIdx < roundNumbers.length; roundIdx++) {
    const currentRoundNum = roundNumbers[roundIdx];
    const prevRoundNum = roundNumbers[roundIdx - 1];
    const roundMatches = rounds[currentRoundNum];
    const x = roundIdx * (cardWidth + horizontalGap);

    for (let matchIdx = 0; matchIdx < roundMatches.length; matchIdx++) {
      const currentMatch = roundMatches[matchIdx];
      
      const prevRoundMatches = positioned.filter(m => m.round_number === prevRoundNum);
      
      if (prevRoundMatches.length >= 2) {
        const pairStartIdx = matchIdx * 2;
        const prevMatch1 = prevRoundMatches[pairStartIdx];
        const prevMatch2 = prevRoundMatches[pairStartIdx + 1];

        if (prevMatch1 && prevMatch2) {
          const centerY = (prevMatch1.y + prevMatch2.y + prevMatch2.height) / 2 - cardHeight / 2;
          positioned.push({
            ...currentMatch,
            x,
            y: centerY,
            height: cardHeight
          });
        } else if (prevMatch1) {
          positioned.push({
            ...currentMatch,
            x,
            y: prevMatch1.y,
            height: cardHeight
          });
        }
      }
    }
  }

  return positioned;
}

/**
 * Calculate tree-style positions for RIGHT-TO-LEFT layout (Groups B & D)
 * Matches flow from right to left
 */
function calculateTreePositionsRTL(
  matches: BracketMatch[],
  startY: number,
  cardWidth: number,
  cardHeight: number,
  horizontalGap: number,
  verticalGap: number
): PositionedMatch[] {
  if (matches.length === 0) return [];

  const rounds = groupByRound(matches);
  const roundNumbers = Object.keys(rounds).map(Number).sort((a, b) => a - b);
  const positioned: PositionedMatch[] = [];

  // Calculate total width needed
  const totalRounds = roundNumbers.length;
  const totalWidth = (totalRounds - 1) * (cardWidth + horizontalGap);

  // Position first round (rightmost)
  const firstRound = rounds[roundNumbers[0]];
  for (let i = 0; i < firstRound.length; i++) {
    positioned.push({
      ...firstRound[i],
      x: totalWidth, // Start from right
      y: startY + i * (cardHeight + verticalGap),
      height: cardHeight
    });
  }

  // Position subsequent rounds (flow leftward)
  for (let roundIdx = 1; roundIdx < roundNumbers.length; roundIdx++) {
    const currentRoundNum = roundNumbers[roundIdx];
    const prevRoundNum = roundNumbers[roundIdx - 1];
    const roundMatches = rounds[currentRoundNum];
    const x = totalWidth - roundIdx * (cardWidth + horizontalGap); // Flow left

    for (let matchIdx = 0; matchIdx < roundMatches.length; matchIdx++) {
      const currentMatch = roundMatches[matchIdx];
      
      const prevRoundMatches = positioned.filter(m => m.round_number === prevRoundNum);
      
      if (prevRoundMatches.length >= 2) {
        const pairStartIdx = matchIdx * 2;
        const prevMatch1 = prevRoundMatches[pairStartIdx];
        const prevMatch2 = prevRoundMatches[pairStartIdx + 1];

        if (prevMatch1 && prevMatch2) {
          const centerY = (prevMatch1.y + prevMatch2.y + prevMatch2.height) / 2 - cardHeight / 2;
          positioned.push({
            ...currentMatch,
            x,
            y: centerY,
            height: cardHeight
          });
        } else if (prevMatch1) {
          positioned.push({
            ...currentMatch,
            x,
            y: prevMatch1.y,
            height: cardHeight
          });
        }
      }
    }
  }

  return positioned;
}

function groupByRound(matches: BracketMatch[]): Record<number, BracketMatch[]> {
  return matches.reduce((acc, match) => {
    const round = match.round_number;
    if (!acc[round]) acc[round] = [];
    acc[round].push(match);
    return acc;
  }, {} as Record<number, BracketMatch[]>);
}

/**
 * Create orthogonal path between two points (right angle connectors)
 * Goes horizontal → vertical → horizontal
 */
function createPath(x1: number, y1: number, x2: number, y2: number): string {
  const midX = (x1 + x2) / 2;
  // H = horizontal line, V = vertical line
  return `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`;
}

/**
 * Render connection lines between matches in same bracket
 */
function renderConnections(
  matches: PositionedMatch[],
  color: string,
  strokeWidth: number,
  cardWidth: number,
  flipHorizontal: boolean = false
): React.ReactNode[] {
  const connections: React.ReactNode[] = [];
  const rounds = groupByRound(matches);
  const roundNumbers = Object.keys(rounds).map(Number).sort((a, b) => a - b);

  console.log('🔗 Rendering connections:', {
    totalMatches: matches.length,
    rounds: roundNumbers,
    roundCounts: roundNumbers.map(r => ({ round: r, count: rounds[r].length }))
  });

  for (let i = 0; i < roundNumbers.length - 1; i++) {
    const currentRound = rounds[roundNumbers[i]];
    const nextRound = rounds[roundNumbers[i + 1]];

    console.log(`  🔗 Round ${roundNumbers[i]} → Round ${roundNumbers[i + 1]}:`, {
      current: currentRound.length,
      next: nextRound.length
    });

    nextRound.forEach((nextMatch, idx) => {
      const posNext = matches.find(m => m.id === nextMatch.id);
      if (!posNext) return;

      // Connect from 2 previous matches
      const sourceMatch1 = currentRound[idx * 2];
      const sourceMatch2 = currentRound[idx * 2 + 1];

      if (sourceMatch1) {
        const pos1 = matches.find(m => m.id === sourceMatch1.id);
        if (pos1) {
          // RTL: connection goes from left to right (opposite of normal)
          const x1 = flipHorizontal ? pos1.x : pos1.x + cardWidth;
          const x2 = flipHorizontal ? posNext.x + cardWidth : posNext.x;
          
          connections.push(
            <path
              key={`${pos1.id}-${posNext.id}`}
              d={createPath(
                x1,
                pos1.y + pos1.height / 2,
                x2,
                posNext.y + posNext.height / 2
              )}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              opacity={0.5}
            />
          );
        }
      }

      if (sourceMatch2) {
        const pos2 = matches.find(m => m.id === sourceMatch2.id);
        if (pos2) {
          // RTL: connection goes from left to right (opposite of normal)
          const x1 = flipHorizontal ? pos2.x : pos2.x + cardWidth;
          const x2 = flipHorizontal ? posNext.x + cardWidth : posNext.x;
          
          connections.push(
            <path
              key={`${pos2.id}-${posNext.id}`}
              d={createPath(
                x1,
                pos2.y + pos2.height / 2,
                x2,
                posNext.y + posNext.height / 2
              )}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              opacity={0.5}
            />
          );
        }
      }
    });
  }

  return connections;
}

export const FullTournamentView = ({
  allMatches,
  groupAMatches,
  groupBMatches,
  groupCMatches,
  groupDMatches,
  crossMatches
}: FullTournamentViewProps) => {
  // Zoom state
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isManualZoom, setIsManualZoom] = useState(false); // Track if user manually zoomed
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const MIN_SCALE = 0.3;
  const MAX_SCALE = 2;
  
  // Zoom to cursor position
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    // Only zoom with Ctrl/Cmd key
    if (!e.ctrlKey && !e.metaKey) return;
    
    e.preventDefault();
    
    if (!svgRef.current || !containerRef.current) return;
    
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    
    // Get mouse position relative to SVG
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate mouse position in SVG coordinates (before zoom)
    const svgX = (mouseX - translateX) / scale;
    const svgY = (mouseY - translateY) / scale;
    
    // Calculate new scale
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
    
    if (newScale === scale) return;
    
    // Calculate new translate to keep mouse position fixed
    const newTranslateX = mouseX - svgX * newScale;
    const newTranslateY = mouseY - svgY * newScale;
    
    setScale(newScale);
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
    setIsManualZoom(true); // User manually zoomed
  }, [scale, translateX, translateY, MIN_SCALE, MAX_SCALE]);

  // Pan (drag) functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsPanning(true);
    setPanStart({ x: e.clientX - translateX, y: e.clientY - translateY });
  }, [translateX, translateY]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    
    const newTranslateX = e.clientX - panStart.x;
    const newTranslateY = e.clientY - panStart.y;
    
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Layout configuration - OPTIMIZED for 27" widescreen (2560x1440)
  const CARD_WIDTH = 135;  // Balanced width for content
  const CARD_HEIGHT = 75;  // Increased for better readability
  const HORIZONTAL_GAP = 45;  // Balanced gap between rounds
  const VERTICAL_GAP = 12;  // Balanced vertical spacing
  const CROSS_FINALS_VERTICAL_GAP = 30;  // Balanced Cross Finals spacing
  const SECTION_VERTICAL_SPACING = 30;  // Balanced section spacing
  const HEADER_HEIGHT = 28;  // Balanced header
  const GROUP_HORIZONTAL_GAP = 120;  // Gap between groups and Cross Finals
  const GROUP_VERTICAL_GAP = 45;  // Balanced vertical gap between groups

  // Helper to calculate positions for one group (LEFT-TO-RIGHT)
  // NEW: WB on left, LB-A + LB-B stacked on right
  const calculateGroupPositions = (matches: BracketMatch[]): GroupPositions => {
    const wbMatches = matches.filter(m => m.bracket_type === 'WB');
    const lbAMatches = matches.filter(m => m.bracket_type === 'LB-A');
    const lbBMatches = matches.filter(m => m.bracket_type === 'LB-B');

    const positioned: GroupPositions = { wb: [], lbA: [], lbB: [] };

    // Position Winner Bracket on the LEFT
    positioned.wb = calculateTreePositions(
      wbMatches,
      HEADER_HEIGHT,
      CARD_WIDTH,
      CARD_HEIGHT,
      HORIZONTAL_GAP,
      VERTICAL_GAP
    );

    // Calculate WB width to position LB on the RIGHT
    const wbWidth = Math.max(...positioned.wb.map(m => m.x + CARD_WIDTH), 0);
    const lbStartX = wbWidth + 60; // Tight gap between WB and LB

    // Position Loser Bracket A on RIGHT (top stack)
    const lbAPositioned = calculateTreePositions(
      lbAMatches,
      HEADER_HEIGHT,
      CARD_WIDTH,
      CARD_HEIGHT,
      HORIZONTAL_GAP,
      VERTICAL_GAP
    );
    positioned.lbA = lbAPositioned.map(m => ({ ...m, x: m.x + lbStartX }));

    // Position Loser Bracket B on RIGHT (bottom stack, below LB-A)
    const lbAHeight = Math.max(...positioned.lbA.map(m => m.y + m.height), HEADER_HEIGHT);
    const lbBStartY = lbAHeight + SECTION_VERTICAL_SPACING + HEADER_HEIGHT;
    const lbBPositioned = calculateTreePositions(
      lbBMatches,
      lbBStartY,
      CARD_WIDTH,
      CARD_HEIGHT,
      HORIZONTAL_GAP,
      VERTICAL_GAP
    );
    positioned.lbB = lbBPositioned.map(m => ({ ...m, x: m.x + lbStartX }));

    return positioned;
  };

  // Helper to calculate positions for RIGHT-TO-LEFT groups (B & D)
  // NEW: WB on right, LB-A + LB-B stacked on left (mirrored)
  const calculateGroupPositionsRTL = (matches: BracketMatch[]): GroupPositions => {
    const wbMatches = matches.filter(m => m.bracket_type === 'WB');
    const lbAMatches = matches.filter(m => m.bracket_type === 'LB-A');
    const lbBMatches = matches.filter(m => m.bracket_type === 'LB-B');

    const positioned: GroupPositions = { wb: [], lbA: [], lbB: [] };

    // Position Winner Bracket on the RIGHT (RTL)
    positioned.wb = calculateTreePositionsRTL(
      wbMatches,
      HEADER_HEIGHT,
      CARD_WIDTH,
      CARD_HEIGHT,
      HORIZONTAL_GAP,
      VERTICAL_GAP
    );

    // Calculate WB leftmost position to place LB on the LEFT
    const wbMinX = Math.min(...positioned.wb.map(m => m.x), 0);
    const lbStartX = wbMinX - 60; // Tight gap between WB and LB

    // Position Loser Bracket A on LEFT (top stack)
    const lbAPositioned = calculateTreePositionsRTL(
      lbAMatches,
      HEADER_HEIGHT,
      CARD_WIDTH,
      CARD_HEIGHT,
      HORIZONTAL_GAP,
      VERTICAL_GAP
    );
    // Shift LB-A to left of WB
    const lbAMaxX = Math.max(...lbAPositioned.map(m => m.x + CARD_WIDTH), 0);
    const lbAShift = lbStartX - lbAMaxX;
    positioned.lbA = lbAPositioned.map(m => ({ ...m, x: m.x + lbAShift }));

    // Position Loser Bracket B on LEFT (bottom stack, below LB-A)
    const lbAHeight = Math.max(...positioned.lbA.map(m => m.y + m.height), HEADER_HEIGHT);
    const lbBStartY = lbAHeight + SECTION_VERTICAL_SPACING + HEADER_HEIGHT;
    const lbBPositioned = calculateTreePositionsRTL(
      lbBMatches,
      lbBStartY,
      CARD_WIDTH,
      CARD_HEIGHT,
      HORIZONTAL_GAP,
      VERTICAL_GAP
    );
    // Shift LB-B to same X as LB-A
    positioned.lbB = lbBPositioned.map(m => ({ ...m, x: m.x + lbAShift }));

    // NORMALIZE: Shift all positions so minimum X = 0 (remove negative space)
    const allPositions = [...positioned.wb, ...positioned.lbA, ...positioned.lbB];
    const minX = Math.min(...allPositions.map(m => m.x), 0);
    if (minX < 0) {
      const normalizeShift = -minX;
      positioned.wb = positioned.wb.map(m => ({ ...m, x: m.x + normalizeShift }));
      positioned.lbA = positioned.lbA.map(m => ({ ...m, x: m.x + normalizeShift }));
      positioned.lbB = positioned.lbB.map(m => ({ ...m, x: m.x + normalizeShift }));
    }

    return positioned;
  };

  // Calculate positions for all groups
  const groupA = useMemo(() => calculateGroupPositions(groupAMatches), [groupAMatches]);
  const groupB = useMemo(() => calculateGroupPositionsRTL(groupBMatches), [groupBMatches]);
  const groupC = useMemo(() => calculateGroupPositions(groupCMatches), [groupCMatches]);
  const groupD = useMemo(() => calculateGroupPositionsRTL(groupDMatches), [groupDMatches]);

  // Calculate group dimensions
  const getGroupDimensions = (group: GroupPositions) => {
    const allPositioned = [...group.wb, ...group.lbA, ...group.lbB];
    const width = Math.max(...allPositioned.map(m => m.x + CARD_WIDTH), 800);
    const height = Math.max(...allPositioned.map(m => m.y + m.height), 600);
    return { width, height };
  };

  const groupADim = getGroupDimensions(groupA);
  const groupBDim = getGroupDimensions(groupB);
  const groupCDim = getGroupDimensions(groupC);
  const groupDDim = getGroupDimensions(groupD);

  // Calculate Cross Finals layout - SYMMETRIC BRACKET (Đối xứng 2 bên)
  // Left side: 4 matches → converge to center
  // Right side: 4 matches → converge to center
  // Final at center
  const { crossPositioned, crossDimensions } = useMemo(() => {
    if (crossMatches.length === 0) {
      return { crossPositioned: [], crossDimensions: { width: CARD_WIDTH + 50, height: 600 } };
    }

    const rounds = groupByRound(crossMatches);
    const roundNumbers = Object.keys(rounds).map(Number).sort((a, b) => a - b);
    const positioned: PositionedMatch[] = [];

    console.log('🔍 Cross Finals Debug:', {
      totalMatches: crossMatches.length,
      rounds: Object.keys(rounds).map(r => ({ round: r, count: rounds[r].length })),
      roundNumbers
    });

    if (roundNumbers.length === 0) {
      return { crossPositioned: [], crossDimensions: { width: CARD_WIDTH + 50, height: 600 } };
    }

    // Calculate total width for symmetric layout
    const totalRounds = roundNumbers.length;
    const singleSideWidth = Math.ceil(totalRounds / 2) * (CARD_WIDTH + HORIZONTAL_GAP);
    const centerGap = 100; // Gap between left and right sides
    const totalWidth = singleSideWidth * 2 + centerGap;
    const centerX = totalWidth / 2;

    // Position Round 1: Split into left (4) and right (4)
    const r1Matches = rounds[1] || [];
    const half = Math.ceil(r1Matches.length / 2);
    const leftR1 = r1Matches.slice(0, half);
    const rightR1 = r1Matches.slice(half);

    console.log(`🔄 Positioning Round 1: ${r1Matches.length} matches (${leftR1.length} left + ${rightR1.length} right)`);

    // Left side R1 matches
    leftR1.forEach((match, idx) => {
      positioned.push({
        ...match,
        x: 0,
        y: HEADER_HEIGHT + idx * (CARD_HEIGHT + CROSS_FINALS_VERTICAL_GAP),
        height: CARD_HEIGHT
      });
    });

    // Right side R1 matches
    rightR1.forEach((match, idx) => {
      positioned.push({
        ...match,
        x: totalWidth - CARD_WIDTH,
        y: HEADER_HEIGHT + idx * (CARD_HEIGHT + CROSS_FINALS_VERTICAL_GAP),
        height: CARD_HEIGHT
      });
    });

    // Position subsequent rounds
    for (let i = 1; i < roundNumbers.length; i++) {
      const roundNum = roundNumbers[i];
      const roundMatches = rounds[roundNum];
      const prevRoundNum = roundNumbers[i - 1];
      
      console.log(`🔄 Positioning Round ${roundNum}: ${roundMatches.length} matches`);

      // Determine if this is final round
      const isFinal = i === roundNumbers.length - 1;
      
      if (isFinal) {
        // Final match at center
        roundMatches.forEach((match, idx) => {
          const prevMatches = positioned.filter(m => m.round_number === prevRoundNum).sort((a, b) => a.y - b.y);
          
          if (prevMatches.length >= 2) {
            const child1 = prevMatches[idx * 2];
            const child2 = prevMatches[idx * 2 + 1];
            
            if (child1 && child2) {
              const centerY = (child1.y + child2.y + child2.height) / 2 - CARD_HEIGHT / 2;
              positioned.push({
                ...match,
                x: centerX - CARD_WIDTH / 2,
                y: centerY,
                height: CARD_HEIGHT
              });
            }
          }
        });
      } else {
        // Middle rounds: split into left and right sides
        const prevMatches = positioned.filter(m => m.round_number === prevRoundNum).sort((a, b) => a.y - b.y);
        const leftPrev = prevMatches.filter(m => m.x < centerX);
        const rightPrev = prevMatches.filter(m => m.x >= centerX);
        
        const roundHalf = Math.ceil(roundMatches.length / 2);
        const leftMatches = roundMatches.slice(0, roundHalf);
        const rightMatches = roundMatches.slice(roundHalf);
        
        const xOffset = i * (CARD_WIDTH + HORIZONTAL_GAP);
        
        // Left side matches
        leftMatches.forEach((match, idx) => {
          const child1 = leftPrev[idx * 2];
          const child2 = leftPrev[idx * 2 + 1];
          
          if (child1 && child2) {
            const centerY = (child1.y + child2.y + child2.height) / 2 - CARD_HEIGHT / 2;
            positioned.push({
              ...match,
              x: xOffset,
              y: centerY,
              height: CARD_HEIGHT
            });
          }
        });
        
        // Right side matches
        rightMatches.forEach((match, idx) => {
          const child1 = rightPrev[idx * 2];
          const child2 = rightPrev[idx * 2 + 1];
          
          if (child1 && child2) {
            const centerY = (child1.y + child2.y + child2.height) / 2 - CARD_HEIGHT / 2;
            positioned.push({
              ...match,
              x: totalWidth - CARD_WIDTH - xOffset,
              y: centerY,
              height: CARD_HEIGHT
            });
          }
        });
      }
    }

    // Calculate dimensions with minimal padding
    const minX = Math.min(...positioned.map(m => m.x), 0);
    const maxX = Math.max(...positioned.map(m => m.x + CARD_WIDTH));
    const width = maxX - minX + 60;  // Minimal horizontal padding
    const height = Math.max(...positioned.map(m => m.y + m.height), 600) + 30;  // Minimal vertical padding

    console.log('✅ Cross Finals Layout Complete:', {
      totalPositioned: positioned.length,
      byRound: Object.entries(
        positioned.reduce((acc, m) => {
          acc[m.round_number] = (acc[m.round_number] || 0) + 1;
          return acc;
        }, {} as Record<number, number>)
      ).sort((a, b) => Number(a[0]) - Number(b[0])),
      dimensions: { width: Math.round(width), height: Math.round(height) }
    });

    return { 
      crossPositioned: positioned, 
      crossDimensions: { width, height } 
    };
  }, [crossMatches]);

  const crossFinalsWidth = crossDimensions.width;
  
  // LAYOUT CÂN BẰNG - Cross Finals ở TRUNG TÂM
  // Layout:    [Group A]        [Group B]
  //               [Cross Finals]
  //            [Group C]        [Group D]
  
  const leftGroupWidth = Math.max(groupADim.width, groupCDim.width);
  const rightGroupWidth = Math.max(groupBDim.width, groupDDim.width);
  
  // Tính toán để Cross Finals ở giữa hoàn toàn
  const totalContentWidth = leftGroupWidth + GROUP_HORIZONTAL_GAP + 
                             crossFinalsWidth + GROUP_HORIZONTAL_GAP + 
                             rightGroupWidth;
  
  // Group A & C ở bên trái
  const groupAOffset = { x: 0, y: 0 };
  const groupCOffset = { 
    x: 0, 
    y: groupADim.height + GROUP_VERTICAL_GAP 
  };
  
  // Cross Finals ở TRUNG TÂM (cân bằng giữa trái và phải)
  const leftGroupsHeight = Math.max(
    groupADim.height + GROUP_VERTICAL_GAP + groupCDim.height,
    groupBDim.height + GROUP_VERTICAL_GAP + groupDDim.height
  );
  const crossFinalsOffset = { 
    x: leftGroupWidth + GROUP_HORIZONTAL_GAP,
    y: Math.max(0, (leftGroupsHeight - crossDimensions.height) / 2)  // CENTERED vertically
  };
  
  // Group B & D ở bên phải (cân bằng với bên trái)
  const groupBOffset = { 
    x: leftGroupWidth + GROUP_HORIZONTAL_GAP + crossFinalsWidth + GROUP_HORIZONTAL_GAP, 
    y: 0 
  };
  const groupDOffset = { 
    x: leftGroupWidth + GROUP_HORIZONTAL_GAP + crossFinalsWidth + GROUP_HORIZONTAL_GAP, 
    y: groupBDim.height + GROUP_VERTICAL_GAP 
  };

  const totalWidth = leftGroupWidth + GROUP_HORIZONTAL_GAP + 
                     crossFinalsWidth + GROUP_HORIZONTAL_GAP + 
                     rightGroupWidth + 40;  // Minimal padding
  const totalHeight = leftGroupsHeight + 40;  // Minimal padding

  // Find the 4 winners from each group who advance to Cross Finals
  // DE16: 2 from WB (winner + runner-up) + 1 from LB-A + 1 from LB-B = 4 total
  const getGroupWinners = (matches: BracketMatch[], positions: GroupPositions) => {
    const wbMatches = matches.filter(m => m.bracket_type === 'WB');
    const lbAMatches = matches.filter(m => m.bracket_type === 'LB-A');
    const lbBMatches = matches.filter(m => m.bracket_type === 'LB-B');
    
    // 1. Top 2 from WB Round 3 (final WB match - both winner and loser advance)
    const wbFinals = wbMatches
      .filter(m => m.round_number === 3)
      .map(m => positions.wb.find(p => p.id === m.id))
      .filter((p): p is PositionedMatch => p !== undefined);
    
    // 2. Winner from LB-A last round
    const lbAMaxRound = Math.max(...lbAMatches.map(m => m.round_number), 0);
    const lbAWinners = lbAMatches
      .filter(m => m.round_number === lbAMaxRound)
      .map(m => positions.lbA.find(p => p.id === m.id))
      .filter((p): p is PositionedMatch => p !== undefined);
    
    // 3. Winner from LB-B last round
    const lbBMaxRound = Math.max(...lbBMatches.map(m => m.round_number), 0);
    const lbBWinners = lbBMatches
      .filter(m => m.round_number === lbBMaxRound)
      .map(m => positions.lbB.find(p => p.id === m.id))
      .filter((p): p is PositionedMatch => p !== undefined);
    
    // Return 4 winners: WB finals (1 match with 2 players) + LB-A winner + LB-B winner
    return [...wbFinals, ...lbAWinners, ...lbBWinners];
  };

  const groupAWinners = getGroupWinners(groupAMatches, groupA);
  const groupBWinners = getGroupWinners(groupBMatches, groupB);
  const groupCWinners = getGroupWinners(groupCMatches, groupC);
  const groupDWinners = getGroupWinners(groupDMatches, groupD);

  // Helper: Get match color based on which group it belongs to
  const getMatchGroupColor = (matchId: string): string | null => {
    if (groupAWinners.some(w => w.id === matchId)) return '#3b82f6'; // Blue for Group A
    if (groupBWinners.some(w => w.id === matchId)) return '#ef4444'; // Red for Group B
    if (groupCWinners.some(w => w.id === matchId)) return '#22c55e'; // Green for Group C
    if (groupDWinners.some(w => w.id === matchId)) return '#f59e0b'; // Amber for Group D
    return null;
  };

  // Helper: Get Cross Finals Round 1 match color (based on position 0-11 for 12 matches)
  const getCrossFinalsR1Color = (match: PositionedMatch): string | null => {
    if (match.round_number !== 1) return null;
    
    const r1Matches = crossPositioned.filter(m => m.round_number === 1);
    
    // Split into left side (6 matches) and right side (6 matches)
    // SYMMETRICAL: Top matches from A & B, Bottom matches from C & D
    const leftSide = r1Matches.filter(m => m.x < 100).sort((a, b) => a.y - b.y);
    const rightSide = r1Matches.filter(m => m.x >= 100).sort((a, b) => a.y - b.y);
    
    // Symmetric mapping for visual balance:
    // Left top (0-2): Group A - Blue
    // Right top (3-5): Group B - Red (SYMMETRIC with A)
    // Left bottom (6-8): Group C - Green  
    // Right bottom (9-11): Group D - Amber (SYMMETRIC with C)
    const sorted = [...leftSide.slice(0, 3), ...rightSide.slice(0, 3), ...leftSide.slice(3, 6), ...rightSide.slice(3, 6)];
    const index = sorted.findIndex(m => m.id === match.id);
    
    if (index >= 0 && index <= 2) return '#3b82f6';   // Group A - Blue (Left top)
    if (index >= 3 && index <= 5) return '#ef4444';   // Group B - Red (Right top)
    if (index >= 6 && index <= 8) return '#22c55e';   // Group C - Green (Left bottom)
    if (index >= 9 && index <= 11) return '#f59e0b';  // Group D - Amber (Right bottom)
    return null;
  };

  // Render a single group with color highlights for winners
  const renderGroup = (
    groupName: string,
    positions: GroupPositions,
    offset: { x: number; y: number },
    matches: BracketMatch[],
    isRTL: boolean = false // RTL layout for Groups B & D
  ) => {
    const wbMatches = matches.filter(m => m.bracket_type === 'WB');
    const lbAMatches = matches.filter(m => m.bracket_type === 'LB-A');
    const lbBMatches = matches.filter(m => m.bracket_type === 'LB-B');

    // Simple translate (no flip)
    const transform = `translate(${offset.x}, ${offset.y})`;

    // Helper to render match with optional color highlight
    const renderMatch = (match: PositionedMatch) => {
      const highlightColor = getMatchGroupColor(match.id);
      return (
        <g key={match.id}>
          {/* Highlight border if this is a winner */}
          {highlightColor && (
            <rect
              x={match.x - 3}
              y={match.y - 3}
              width={CARD_WIDTH + 6}
              height={CARD_HEIGHT + 6}
              fill="none"
              stroke={highlightColor}
              strokeWidth={3}
              rx={8}
              opacity={0.8}
            />
          )}
          <foreignObject
            x={match.x}
            y={match.y}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
          >
            <MatchCard match={match} allMatches={allMatches} />
          </foreignObject>
        </g>
      );
    };
    
    // Calculate Group label X position - symmetric relative to Cross Finals center
    // For LTR groups (A, C): Place label on the right side (near Cross Finals)
    // For RTL groups (B, D): Place label on the left side (default x=10)
    const groupLabelX = isRTL ? 10 : Math.max(...positions.wb.map(m => m.x + CARD_WIDTH), 0) + 
                                      (positions.lbA.length > 0 ? Math.min(...positions.lbA.map(m => m.x)) : 0) - 60;
    
    return (
      <g transform={transform}>
        {/* Group label - Symmetric positioning */}
        <text 
          x={groupLabelX} 
          y="20" 
          fontSize="20" 
          fontWeight="bold" 
          fill="#60a5fa"
        >
          Group {groupName}
        </text>

        {/* Winner Bracket */}
        <g>
          {/* Connections first (behind cards) */}
          {renderConnections(positions.wb, '#22c55e', 2, CARD_WIDTH, isRTL)}
          
          <text 
            x={positions.wb[0]?.x || 10} 
            y={(positions.wb[0]?.y || HEADER_HEIGHT) - 12} 
            fontSize="11" 
            fontWeight="bold" 
            fill="#22c55e"
          >
            🏆 WB
          </text>
          {positions.wb.map(renderMatch)}
        </g>

        {/* Loser Bracket A */}
        {lbAMatches.length > 0 && positions.lbA.length > 0 && (
          <g>
            {/* Connections first (behind cards) */}
            {renderConnections(positions.lbA, '#f97316', 2, CARD_WIDTH, isRTL)}
            
            <text 
              x={positions.lbA[0]?.x || 10} 
              y={(positions.lbA[0]?.y || 0) - 12} 
              fontSize="11" 
              fontWeight="bold" 
              fill="#f97316"
            >
              🎯 LB-A
            </text>
            {positions.lbA.map(renderMatch)}
          </g>
        )}

        {/* Loser Bracket B */}
        {lbBMatches.length > 0 && positions.lbB.length > 0 && (
          <g>
            {/* Connections first (behind cards) */}
            {renderConnections(positions.lbB, '#ef4444', 2, CARD_WIDTH, isRTL)}
            
            <text 
              x={positions.lbB[0]?.x || 10} 
              y={(positions.lbB[0]?.y || 0) - 12} 
              fontSize="11" 
              fontWeight="bold" 
              fill="#ef4444"
            >
              ⚠️ LB-B
            </text>
            {positions.lbB.map(renderMatch)}
          </g>
        )}
      </g>
    );
  };

  // Auto-fit: Calculate optimal scale to fit viewport
  const calculateFitScale = useCallback(() => {
    if (!containerRef.current) return 1;
    const container = containerRef.current;
    const viewportWidth = container.clientWidth;
    const viewportHeight = container.clientHeight;
    
    // Calculate scale to fit both width and height with some padding
    const scaleX = (viewportWidth - 40) / totalWidth;
    const scaleY = (viewportHeight - 40) / totalHeight;
    
    // Use the smaller scale to ensure everything fits
    return Math.min(scaleX, scaleY, 1); // Max 1x to avoid upscaling
  }, [totalWidth, totalHeight]);

  // Zoom controls
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, MAX_SCALE));
    setIsManualZoom(true);
  };
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, MIN_SCALE));
    setIsManualZoom(true);
  };
  const handleResetZoom = () => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
    setIsManualZoom(true);
  };
  const handleFitToScreen = () => {
    setScale(calculateFitScale());
    setTranslateX(0);
    setTranslateY(0);
    setIsManualZoom(false); // This is intentional fit, allow auto-fit again
  };
  
  // Handle zoom input change
  const handleZoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (Number.isNaN(value)) return;
    
    const newScale = Math.max(MIN_SCALE * 100, Math.min(MAX_SCALE * 100, value)) / 100;
    setScale(newScale);
    setIsManualZoom(true);
  };
  
  const handleZoomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  // Auto-fit on mount and window resize
  useEffect(() => {
    // Only auto-fit if user hasn't manually zoomed
    if (isManualZoom) return;
    
    const fitScale = calculateFitScale();
    if (fitScale < 1) {
      setScale(fitScale);
      setTranslateX(0);
      setTranslateY(0);
    }
    
    const handleResize = () => {
      // Only auto-fit on resize if user hasn't manually zoomed
      if (isManualZoom) return;
      
      const newFitScale = calculateFitScale();
      if (scale < 1 && newFitScale !== scale) {
        setScale(newFitScale);
        setTranslateX(0);
        setTranslateY(0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateFitScale, scale, isManualZoom]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-slate-950 overflow-auto"
      onWheel={handleWheel}
    >
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors"
          title="Zoom Out (Ctrl/Cmd -)"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleFitToScreen}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors"
          title="Fit to Screen"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
        <div className="relative flex items-center">
          <input
            type="number"
            value={Math.round(scale * 100)}
            onChange={handleZoomInputChange}
            onKeyDown={handleZoomInputKeyDown}
            onDoubleClick={handleResetZoom}
            min={MIN_SCALE * 100}
            max={MAX_SCALE * 100}
            className="w-20 px-2 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors font-mono text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Zoom % (Click to edit, Double-click to reset)"
          />
          <span className="absolute right-2 text-slate-400 text-xs pointer-events-none">%</span>
        </div>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors"
          title="Zoom In (Ctrl/Cmd +)"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      <svg
        ref={svgRef}
        width={totalWidth}
        height={totalHeight}
        className="bg-slate-900/50"
        style={{
          cursor: isPanning ? 'grabbing' : 'grab',
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <g>
        {/* Render all 4 groups */}
        {renderGroup('A', groupA, groupAOffset, groupAMatches, false)}
        {renderGroup('B', groupB, groupBOffset, groupBMatches, true)}
        {renderGroup('C', groupC, groupCOffset, groupCMatches, false)}
        {renderGroup('D', groupD, groupDOffset, groupDMatches, true)}

        {/* Cross Finals */}
        <g transform={`translate(${crossFinalsOffset.x}, ${crossFinalsOffset.y})`}>
          <text x="10" y="20" fontSize="20" fontWeight="bold" fill="#a78bfa">
            🏆 Cross Finals ({crossMatches.length})
          </text>
          
          {/* Cross Finals connections (between rounds) */}
          {renderConnections(crossPositioned, '#a78bfa', 2, CARD_WIDTH, false)}
          
          {/* Trophy icon above Final match */}
          {(() => {
            const finalMatch = crossPositioned.find(m => m.round_number === Math.max(...crossPositioned.map(x => x.round_number)));
            if (finalMatch) {
              return (
                <g>
                  {/* Trophy icon */}
                  <text 
                    x={finalMatch.x + CARD_WIDTH / 2} 
                    y={finalMatch.y - 30} 
                    fontSize="40" 
                    textAnchor="middle"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))' }}
                  >
                    🏆
                  </text>
                  {/* Final label */}
                  <text 
                    x={finalMatch.x + CARD_WIDTH / 2} 
                    y={finalMatch.y - 5} 
                    fontSize="12" 
                    fontWeight="bold"
                    fill="#fbbf24"
                    textAnchor="middle"
                  >
                    CHUNG KẾT
                  </text>
                </g>
              );
            }
            return null;
          })()}
          
          {/* Cross Finals matches with color coding for R1 */}
          {crossPositioned.map(match => {
            const r1Color = getCrossFinalsR1Color(match);
            return (
              <g key={match.id}>
                {/* Highlight border for R1 matches */}
                {r1Color && (
                  <rect
                    x={match.x - 3}
                    y={match.y - 3}
                    width={CARD_WIDTH + 6}
                    height={CARD_HEIGHT + 6}
                    fill="none"
                    stroke={r1Color}
                    strokeWidth={3}
                    rx={8}
                    opacity={0.8}
                  />
                )}
                <foreignObject
                  x={match.x}
                  y={match.y}
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
                >
                  <MatchCard match={match} allMatches={allMatches} />
                </foreignObject>
              </g>
            );
          })}
        </g>
        
        {/* BỎ ARROWS - dùng màu sắc thay thế */}
        </g>
      </svg>
    </div>
  );
};
