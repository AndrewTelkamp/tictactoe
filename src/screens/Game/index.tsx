import {useLayoutEffect} from 'react';
import {View} from 'react-native';

import {Text} from 'react-native';

import {useGameStore} from '../../state';
import {HeaderText, PrimaryButton, GameSquare, Screen} from '../../components';
import styles from './styles';

import type {PlayerNumber} from '../../types';

function Game() {
  const board = useGameStore(state => state.board);
  const currentPlayer = useGameStore(state => state.currentPlayer);
  const hydrateStore = useGameStore(state => state.hydrate);
  const isADraw = useGameStore(state => state.isADraw);
  const isHydrated = useGameStore(state => state.isHydrated);
  const isPlayingComputer = useGameStore(state => state.isPlayingComputer);
  const makeMove = useGameStore(state => state.makeMove);
  const startComputerGame = useGameStore(state => state.startComputerGame);
  const startTwoPlayerGame = useGameStore(state => state.startTwoPlayerGame);
  const winner = useGameStore(state => state.winner);

  const isComputersTurn = isPlayingComputer && currentPlayer === 2;

  function handleSquarePress(col: number, row: number, val: PlayerNumber | 0) {
    if (!val && !winner && !isComputersTurn) {
      makeMove(col, row, currentPlayer);
    }
  }

  function startNewGame() {
    if (isPlayingComputer) {
      startComputerGame();
    } else {
      startTwoPlayerGame();
    }
  }

  useLayoutEffect(() => {
    if (!isHydrated) {
      hydrateStore();
    }
  }, [isHydrated, hydrateStore]);

  return (
    <Screen style={styles.screen}>
      <HeaderText>Tic-Tac-Toe!</HeaderText>

      <View>
        <View style={styles.board}>
          {board.length &&
            board.map((row, rowIdx) => (
              <View key={`row-${rowIdx}`} style={styles.row}>
                {row.map((val, colIdx) => (
                  <GameSquare
                    hasRightBorder={colIdx === row.length - 1}
                    hasBottomBorder={rowIdx === board.length - 1}
                    key={`row-${rowIdx}-col${colIdx}`}
                    onPress={() => handleSquarePress(colIdx, rowIdx, val)}
                    playerNumber={val}
                  />
                ))}
              </View>
            ))}
        </View>

        <ProgressText
          {...{currentPlayer, isADraw, isPlayingComputer, winner}}
        />
      </View>

      <View>
        {(!!winner || isADraw) && (
          <>
            <View style={styles.pushDown}>
              <PrimaryButton title="Start New Game" onPress={startNewGame} />
            </View>
          </>
        )}
      </View>
    </Screen>
  );
}

interface ProgressTextProps {
  currentPlayer: PlayerNumber;
  isADraw: boolean;
  isPlayingComputer: boolean;
  winner: PlayerNumber | 0;
}

function ProgressText({
  currentPlayer,
  isADraw,
  isPlayingComputer,
  winner,
}: ProgressTextProps) {
  let message;

  if (winner) {
    if (isPlayingComputer && winner === 2) {
      message = 'Computer won =(';
    } else {
      message = `Player ${winner} won!`;
    }
  } else if (isADraw) {
    message = "It's a Draw!";
  } else {
    if (isPlayingComputer && currentPlayer === 2) {
      message = "Computer's turn";
    } else {
      message = `Player ${currentPlayer}'s turn!`;
    }
  }

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>{message}</Text>
    </View>
  );
}

export default Game;
