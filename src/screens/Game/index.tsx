import {useLayoutEffect} from 'react';
import {View} from 'react-native';

import {Text} from 'react-native';

import {useGameStore} from '../../state';
import {PrimaryButton, GameSquare, Screen} from '../../components';
import styles from './styles';

import type {PlayerNumber} from '../../types';

function Game() {
  const board = useGameStore(state => state.board);
  const currentPlayer = useGameStore(state => state.currentPlayer);
  const hydrateStore = useGameStore(state => state.hydrate);
  const isHydrated = useGameStore(state => state.isHydrated);
  const makeMove = useGameStore(state => state.makeMove);
  const resetGame = useGameStore(state => state.resetStore);
  const selectIsADraw = useGameStore(state => state.isADraw);
  const winner = useGameStore(state => state.winner);

  const isADraw = selectIsADraw();

  function handleSquarePress(
    val: number,
    col: number,
    row: number,
    player: PlayerNumber,
  ) {
    if (!val && !winner) {
      makeMove(col, row, player);
    }
  }

  useLayoutEffect(() => {
    if (!isHydrated) {
      hydrateStore();
    }
  }, [isHydrated, hydrateStore]);

  return (
    <Screen isSafeArea>
      <View style={styles.board}>
        {board.length &&
          board.map((row, rowIdx) => (
            <View key={`row-${rowIdx}`} style={styles.row}>
              {row.map((val, colIdx) => (
                <GameSquare
                  key={`row-${rowIdx}-col${colIdx}`}
                  onPress={() =>
                    handleSquarePress(val, colIdx, rowIdx, currentPlayer)
                  }
                  playerNumber={val}
                />
              ))}
            </View>
          ))}
      </View>
      <ProgressText {...{currentPlayer, isADraw, winner}} />
      {(!!winner || isADraw) && (
        <PrimaryButton title="Start Game" onPress={resetGame} />
      )}
    </Screen>
  );
}

interface ProgressTextProps {
  isADraw: boolean;
  winner: PlayerNumber | 0;
  currentPlayer: PlayerNumber;
}

function ProgressText({isADraw, winner, currentPlayer}: ProgressTextProps) {
  let message;

  if (winner) {
    if (winner === 1) {
      message = `Player ${winner} won!`;
    }
  } else if (isADraw) {
    message = "It's a Draw!";
  } else {
    message = `Player ${currentPlayer}'s turn!`;
  }

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>{message}</Text>
    </View>
  );
}

export default Game;
