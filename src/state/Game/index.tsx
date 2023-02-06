import {create} from 'zustand';

import {StorageKey} from '../../enums';
import {saveToStorage, getFromStorage, randNumBetween, wait} from '../../utils';

import type {PlayerNumber} from '../../types';

/*=============================================================================
= Initial State ===============================================================
=============================================================================*/

const GAME_SIZE: number = 3;

type BoardType = (PlayerNumber | 0)[][];

export interface MatchResult {
  player: string;
  datetime: Date;
}

// TODO: Smart-mode
// type Move = {
//   col: number;
//   row: number;
// };

function createBoard(size: number): BoardType {
  return Array(size)
    .fill(0)
    .map(row => Array(size).fill(0));
}

interface GameState {
  board: BoardType;
  columns: number[];
  currentPlayer: PlayerNumber;
  diagonalOne: number;
  diagonalTwo: number;
  history: MatchResult[];
  isADraw: boolean;
  isHydrated: boolean;
  isPlayingComputer: boolean;
  rows: number[];
  totalMoves: number;
  winner: PlayerNumber | 0;
}

const initialState: GameState = {
  board: createBoard(GAME_SIZE),
  columns: new Array(GAME_SIZE).fill(0),
  currentPlayer: 1,
  diagonalOne: 0,
  diagonalTwo: 0,
  history: [],
  isADraw: false,
  isHydrated: false,
  isPlayingComputer: true,
  rows: new Array(GAME_SIZE).fill(0),
  totalMoves: 0,
  winner: 0,
};

function generatePosition() {
  return randNumBetween(0, GAME_SIZE);
}

function generateComputerMove(
  board: BoardType,
  // TODO: smart mode
  // lastComputerMove?: Move,
  // type: 'random' | 'smart' = 'random',
) {
  let col = generatePosition();
  let row = generatePosition();

  while (board?.[row]?.[col]) {
    col = generatePosition();
    row = generatePosition();
  }

  return {col, row};
}

function updateStorage(args: Omit<GameState, 'isHydrated'>) {
  saveToStorage({...args, isHydrated: false}, StorageKey.GAME);
}

/*=============================================================================
= Store =======================================================================
=============================================================================*/

interface GameStore extends GameState {
  hydrate: () => void;
  makeComputerMove: (board?: BoardType) => void;
  makeMove: (
    col: number,
    row: number,
    player: PlayerNumber,
    autoCallComputer?: boolean,
  ) => void;
  resetStore: (args: Partial<GameState>) => void;
  startComputerGame: () => void;
  startTwoPlayerGame: () => void;
  updateIsPlayingComputer: (isPlayingComputer: boolean) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  hydrate: async () => {
    if (!get().isHydrated) {
      const stored = await getFromStorage(StorageKey.GAME);
      set({...stored, isHydrated: true});
    }
  },
  makeComputerMove: async () => {
    await wait(1000);
    const {col, row} = generateComputerMove(get().board);
    get().makeMove(col, row, 2);
  },
  makeMove: (col, row, player, autoCallComputer = true) => {
    const updatedBoard = [...get().board];
    const updatedColumns = [...get().columns];
    const updatedHistory = [...get().history];
    const updatedRows = [...get().rows];
    const updatedTotalMoves = get().totalMoves + 1;
    let updatedDiagonalOne = get().diagonalOne;
    let updatedDiagonalTwo = get().diagonalTwo;
    let foundWinner: PlayerNumber | 0 = 0;

    const playerVal = player === 1 ? 1 : -1;

    updatedBoard[row][col] = player;
    updatedRows[row] += playerVal;
    updatedColumns[col] += playerVal;

    if (row === col) {
      updatedDiagonalOne += playerVal;
    }

    if (col === updatedColumns.length - row - 1) {
      updatedDiagonalTwo += playerVal;
    }

    if (
      Math.abs(updatedRows[row]) === GAME_SIZE ||
      Math.abs(updatedColumns[col]) === GAME_SIZE ||
      Math.abs(updatedDiagonalOne) === GAME_SIZE ||
      Math.abs(updatedDiagonalTwo) === GAME_SIZE
    ) {
      foundWinner = player;
      const playerName =
        get().isPlayingComputer && player === 2
          ? 'Computer'
          : `Player ${player}`;
      updatedHistory.push({player: playerName, datetime: new Date()});
    }

    const nextPlayer: PlayerNumber = player === 1 ? 2 : 1;
    const updatedIsADraw = !!(
      updatedTotalMoves === GAME_SIZE * GAME_SIZE && !foundWinner
    );

    const newState = {
      board: updatedBoard,
      currentPlayer: nextPlayer,
      isADraw: updatedIsADraw,
      rows: updatedRows,
      columns: updatedColumns,
      diagonalOne: updatedDiagonalOne,
      diagonalTwo: updatedDiagonalTwo,
      history: updatedHistory,
      totalMoves: updatedTotalMoves,
      winner: foundWinner,
    };

    set(newState);
    updateStorage({...get(), ...newState});

    if (
      get().isPlayingComputer &&
      player === 1 &&
      !foundWinner &&
      updatedTotalMoves < GAME_SIZE * GAME_SIZE - 1 &&
      autoCallComputer
    ) {
      get().makeComputerMove(updatedBoard);
    }
  },
  resetStore: args => {
    set({
      board: createBoard(GAME_SIZE),
      columns: new Array(GAME_SIZE).fill(0),
      currentPlayer: 1,
      diagonalOne: 0,
      diagonalTwo: 0,
      history: get().history,
      isADraw: false,
      isHydrated: true,
      isPlayingComputer: true,
      rows: new Array(GAME_SIZE).fill(0),
      totalMoves: 0,
      winner: 0,
      ...args,
    });
  },
  startComputerGame: () => {
    get().resetStore({isPlayingComputer: true});
  },
  startTwoPlayerGame: () => {
    get().resetStore({isPlayingComputer: false});
  },
  updateIsPlayingComputer: isPlayingComputer => {
    set({isPlayingComputer});
    if (isPlayingComputer && get().currentPlayer === 2) {
      get().makeComputerMove();
    }
  },
}));
