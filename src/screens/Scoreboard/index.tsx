import {Text, View} from 'react-native';

import {HeaderText, Screen} from '../../components';
import {useGameStore} from '../../state';
import styles from './styles';

import type {MatchResult} from '../../state/Game';

interface Ranking {
  player: string;
  wins: number;
}

function formatWins(games: MatchResult[]): Ranking[] {
  const result = [];
  const wins: any = {};

  games.forEach(game => {
    if (!wins[game.player]) {
      wins[game.player] = 0;
    }
    wins[game.player] = wins[game.player] + 1;
  });

  for (let key in wins) {
    result.push({player: key, wins: wins?.[key]});
  }
  return result.sort((a, b) => (a.wins > b.wins ? -1 : 1));
}

function Scoreboard() {
  const gameHistory = useGameStore(state => state.history);
  const rankings = formatWins(gameHistory);
  return (
    <Screen>
      <HeaderText>Scoreboard</HeaderText>
      {rankings.length ? (
        <Rankings {...{rankings}} />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No Matches Played Yet...</Text>
        </View>
      )}
    </Screen>
  );
}

interface RankingProps {
  rankings: Ranking[];
}

function Rankings({rankings}: RankingProps) {
  return (
    <View>
      <View style={styles.rankRow}>
        <Text style={[styles.text, styles.rowHeader]}>Name</Text>
        <Text style={[styles.text, styles.rowHeader]}>Wins</Text>
      </View>
      {rankings.map(rank => (
        <RankRow key={rank.player} name={rank.player} wins={rank.wins} />
      ))}
    </View>
  );
}

interface RankRowProps {
  name: string;
  wins: number;
}

function RankRow({name, wins}: RankRowProps) {
  return (
    <View style={styles.rankRow}>
      <View style={styles.firstColumn}>
        <Text style={styles.text}>{name}</Text>
      </View>
      <Text style={styles.text}>{wins}</Text>
    </View>
  );
}

export default Scoreboard;
