import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTournamentBracket } from "@/hooks/useTournamentBracket";
import { MatchCard } from "./MatchCard";
import { FullBracketView } from "./FullBracketView";
import { FullTournamentView } from "./FullTournamentView";
import type { BracketMatch } from "@/types/bracket";
import { AlertCircle, Award, Maximize2, Minimize2, ZoomIn, ZoomOut, Move, Grid3x3, Layers } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DE64BracketVisualizationProps {
  tournamentId: string;
}

/**
 * Display full DE64 (Double Elimination 64) bracket
 * Structure: 4 Groups (A, B, C, D) + Cross Finals
 * Each group has: Winner Bracket, Loser A, Loser B
 */
export const DE64BracketVisualization = ({ tournamentId }: DE64BracketVisualizationProps) => {
  const { data: bracketData, isLoading, error } = useTournamentBracket(tournamentId);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Handle fullscreen toggle
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  // Listen for fullscreen changes (ESC key, etc)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          zoomIn();
        } else if (e.key === '-') {
          e.preventDefault();
          zoomOut();
        } else if (e.key === '0') {
          e.preventDefault();
          resetZoom();
        }
      }
      // F key for fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [zoom]); // Re-bind when zoom changes

  // Zoom controls
  const zoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const zoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const resetZoom = () => {
    setZoom(100);
    setPanOffset({ x: 0, y: 0 });
  };

  // Pan controls
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 100) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải bảng đấu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load bracket data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!bracketData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No bracket data available for this tournament yet.
        </AlertDescription>
      </Alert>
    );
  }

  // Group matches by bracket_group (A, B, C, D, Cross)
  // Following mobile app's robust filtering logic from sabo_de64_bracket.dart
  const getMatchesByGroup = (group: string) => {
    if (!bracketData.winner_bracket && !bracketData.loser_bracket) return [];
    
    const allMatches = [
      ...bracketData.winner_bracket.flatMap(r => r.matches),
      ...bracketData.loser_bracket.flatMap(r => r.matches),
      ...bracketData.grand_finals
    ];
    
    const filtered = allMatches.filter(m => {
      const bracketGroup = m.bracket_group;
      
      // Handle Cross Finals - match both 'CROSS' and matches not in A,B,C,D
      if (group === 'Cross') {
        return bracketGroup?.toUpperCase() === 'CROSS' ||
               bracketGroup?.toLowerCase() === 'cross' ||
               (bracketGroup !== 'A' && bracketGroup !== 'B' && 
                bracketGroup !== 'C' && bracketGroup !== 'D');
      }
      
      return bracketGroup === group;
    });
    
    if (group === 'Cross') {
      console.log('🔍 Cross Finals Matches:', {
        total: filtered.length,
        matchNumbers: filtered.map(m => `M${m.match_number}`).join(', '),
        rounds: [...new Set(filtered.map(m => m.round_number))].sort((a, b) => a - b)
      });
    }
    
    return filtered;
  };

  const groupAMatches = getMatchesByGroup('A');
  const groupBMatches = getMatchesByGroup('B');
  const groupCMatches = getMatchesByGroup('C');
  const groupDMatches = getMatchesByGroup('D');
  const crossMatches = getMatchesByGroup('Cross');

  // Collect all matches for advancement calculation
  const allMatches = [
    ...groupAMatches,
    ...groupBMatches,
    ...groupCMatches,
    ...groupDMatches,
    ...crossMatches
  ];

  return (
    <div 
      ref={containerRef}
      className={`h-full w-full flex flex-col bg-slate-950 relative ${
        isFullscreen ? 'p-4' : ''
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: isPanning ? 'grabbing' : zoom > 100 ? 'grab' : 'default'
      }}
    >
      {/* Fullscreen Controls Toolbar */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {/* Zoom Controls */}
        <div className="flex gap-1 bg-slate-800/90 backdrop-blur-sm rounded-lg p-1 border border-slate-700">
          <button
            onClick={zoomOut}
            disabled={zoom <= 50}
            className="p-2 hover:bg-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5 text-white" />
          </button>
          <div className="px-3 py-2 text-white text-sm font-mono min-w-[60px] text-center">
            {zoom}%
          </div>
          <button
            onClick={zoomIn}
            disabled={zoom >= 300}
            className="p-2 hover:bg-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={resetZoom}
            className="p-2 hover:bg-slate-700 rounded transition-colors border-l border-slate-600 ml-1"
            title="Reset Zoom & Pan"
          >
            <Move className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg"
          title={isFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-white" />
          ) : (
            <Maximize2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Main Content with Zoom & Pan */}
      <div 
        className="flex-1 flex flex-col transition-transform duration-200"
        style={{
          transform: `scale(${zoom / 100}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          transformOrigin: 'top left'
        }}
      >
        <Tabs defaultValue="groupA" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800 border-b border-slate-700">
            <TabsTrigger value="fullTournament" className="text-amber-400">
              <Layers className="w-4 h-4 mr-1" />
              Full Tournament
            </TabsTrigger>
            <TabsTrigger value="groupA">
              Group A ({groupAMatches.length})
            </TabsTrigger>
            <TabsTrigger value="groupB">
              Group B ({groupBMatches.length})
            </TabsTrigger>
            <TabsTrigger value="groupC">
              Group C ({groupCMatches.length})
            </TabsTrigger>
            <TabsTrigger value="groupD">
              Group D ({groupDMatches.length})
            </TabsTrigger>
            <TabsTrigger value="cross" className="text-purple-400">
              <Award className="w-4 h-4 mr-1" />
            Cross Finals ({crossMatches.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fullTournament" className="flex-1 overflow-auto">
          <FullTournamentView 
            allMatches={allMatches}
            groupAMatches={groupAMatches}
            groupBMatches={groupBMatches}
            groupCMatches={groupCMatches}
            groupDMatches={groupDMatches}
            crossMatches={crossMatches}
          />
        </TabsContent>

        <TabsContent value="groupA" className="flex-1 overflow-auto">
          <GroupView matches={groupAMatches} groupName="A" allMatches={allMatches} crossFinalMatches={crossMatches} />
        </TabsContent>
        
        <TabsContent value="groupB" className="flex-1 overflow-auto">
          <GroupView matches={groupBMatches} groupName="B" allMatches={allMatches} crossFinalMatches={crossMatches} />
        </TabsContent>
        
        <TabsContent value="groupC" className="flex-1 overflow-auto">
          <GroupView matches={groupCMatches} groupName="C" allMatches={allMatches} crossFinalMatches={crossMatches} />
        </TabsContent>
        
        <TabsContent value="groupD" className="flex-1 overflow-auto">
          <GroupView matches={groupDMatches} groupName="D" allMatches={allMatches} crossFinalMatches={crossMatches} />
        </TabsContent>
        
        <TabsContent value="cross" className="flex-1 overflow-auto">
          <CrossFinalsView matches={crossMatches} allMatches={allMatches} />
        </TabsContent>
      </Tabs>

        {/* Statistics Footer */}
        <Card className="p-3 bg-slate-800/50 border-slate-700 rounded-none border-x-0 border-b-0">
          <div className="flex items-center justify-between text-sm">
            <div className="text-slate-400">
              Groups: <span className="text-white font-bold">4</span>
            </div>
            <div className="text-slate-400">
              Total Matches: <span className="text-white font-bold">{bracketData.total_matches}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Keyboard Shortcuts Help - HIDDEN */}
      {false && isFullscreen && (
        <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg border border-slate-700 text-xs text-slate-300 space-y-1">
          <div className="font-bold mb-2 text-sm">⌨️ Keyboard Shortcuts</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="text-slate-400">ESC</div>
            <div>Exit fullscreen</div>
            
            <div className="text-slate-400">F</div>
            <div>Toggle fullscreen</div>
            
            <div className="text-slate-400">Ctrl/Cmd +</div>
            <div>Zoom in</div>
            
            <div className="text-slate-400">Ctrl/Cmd -</div>
            <div>Zoom out</div>
            
            <div className="text-slate-400">Ctrl/Cmd 0</div>
            <div>Reset zoom</div>
            
            <div className="text-slate-400 col-span-2 mt-2 border-t border-slate-600 pt-2">
              💡 Drag to pan when zoomed
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Group View - Show WB, LB-A, LB-B for a specific group
 */
interface GroupViewProps {
  matches: BracketMatch[];
  groupName: string;
  allMatches: BracketMatch[]; // For advancement calculation
  crossFinalMatches: BracketMatch[]; // For showing progression arrows
}

const GroupView = ({ matches, groupName, allMatches, crossFinalMatches }: GroupViewProps) => {
  // Separate by bracket_type - matching mobile app's exact logic
  const wbMatches = matches.filter(m => {
    const type = m.bracket_type as string;
    return type === 'WB';
  });
  
  const lbAMatches = matches.filter(m => {
    const type = m.bracket_type as string;
    return type === 'LB-A';
  });
  
  const lbBMatches = matches.filter(m => {
    const type = m.bracket_type as string;
    return type === 'LB-B';
  });

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="full" className="flex-1 flex flex-col min-h-0">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="full" className="flex items-center gap-1">
            <Grid3x3 className="w-3.5 h-3.5" />
            Full View
          </TabsTrigger>
          <TabsTrigger value="wb">Winner ({wbMatches.length})</TabsTrigger>
          <TabsTrigger value="lba">LB-A ({lbAMatches.length})</TabsTrigger>
          <TabsTrigger value="lbb">LB-B ({lbBMatches.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="full" className="flex-1 overflow-auto min-h-0">
          <FullBracketView 
            matches={matches} 
            groupName={groupName} 
            allMatches={allMatches}
            crossFinalMatches={crossFinalMatches}
          />
        </TabsContent>

        <TabsContent value="wb" className="flex-1 overflow-auto min-h-0">
          <BracketTree matches={wbMatches} allMatches={allMatches} color="green" />
        </TabsContent>

        <TabsContent value="lba" className="flex-1 overflow-auto min-h-0">
          <BracketTree matches={lbAMatches} allMatches={allMatches} color="orange" />
        </TabsContent>

        <TabsContent value="lbb" className="flex-1 overflow-auto min-h-0">
          <BracketTree matches={lbBMatches} allMatches={allMatches} color="red" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

/**
 * Cross Finals View - Show final matches across groups
 */
interface CrossFinalsViewProps {
  matches: BracketMatch[];
  allMatches: BracketMatch[]; // For advancement calculation
}

const CrossFinalsView = ({ matches, allMatches }: CrossFinalsViewProps) => {
  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <div className="text-center">
          <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Chưa có trận đấu chung kết</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <BracketTree matches={matches} allMatches={allMatches} color="purple" />
    </div>
  );
};

/**
 * Bracket Tree - Display matches in horizontal rounds
 */
interface BracketTreeProps {
  matches: BracketMatch[];
  allMatches: BracketMatch[]; // For advancement calculation
  color: 'green' | 'orange' | 'red' | 'purple';
}

const BracketTree = ({ matches, allMatches, color }: BracketTreeProps) => {
  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <p>Chưa có trận đấu</p>
      </div>
    );
  }

  // Group by rounds
  const rounds: { [key: number]: BracketMatch[] } = {};
  for (const m of matches) {
    const round = m.round_number;
    if (!rounds[round]) rounds[round] = [];
    rounds[round].push(m);
  }

  const sortedRounds = Object.entries(rounds).sort(([a], [b]) => Number(a) - Number(b));

  const colorClasses = {
    green: 'bg-green-900/30 border-green-700/50 text-green-300',
    orange: 'bg-orange-900/30 border-orange-700/50 text-orange-300',
    red: 'bg-red-900/30 border-red-700/50 text-red-300',
    purple: 'bg-purple-900/30 border-purple-700/50 text-purple-300',
  };

  return (
    <div className="p-6">
      <div className="inline-flex gap-8 items-start">
        {sortedRounds.map(([roundNum, roundMatches]) => (
          <div key={roundNum} className="flex flex-col gap-3 w-[280px]">
            <div className={`text-center py-2 border rounded-lg ${colorClasses[color]}`}>
              <div className="text-sm font-bold">Round {roundNum}</div>
              <div className="text-xs opacity-75">{roundMatches.length} matches</div>
            </div>

            <div className="space-y-4">
              {roundMatches.map(match => (
                <MatchCard 
                  key={match.id} 
                  match={match}
                  allMatches={allMatches}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DE64BracketVisualization;
