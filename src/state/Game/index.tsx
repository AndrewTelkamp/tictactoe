import {create} from 'zustand';

import {StorageKey} from '../../enums';
import {saveToStorage, getFromStorage} from '../../utils';
import type {PlayerNumber} from '../../types';

/*=============================================================================
= Initial State ===============================================================
=============================================================================*/

const GAME_SIZE: number = 3;

function createBoard(size: number): (PlayerNumber | 0)[][] {
  return Array(size)
    .fill(0)
    .map(row => Array(size).fill(0));
}

interface GameState {
  board: (PlayerNumber | 0)[][];
  currentPlayer: PlayerNumber;
  isHydrated: boolean;
  rows: number[];
  diagonalOne: number;
  diagonalTwo: number;
  columns: number[];
  totalMoves: number;
  winner: PlayerNumber | 0;
}

const initialState: GameState = {
  board: createBoard(GAME_SIZE),
  currentPlayer: 1,
  isHydrated: false,
  diagonalOne: 0,
  diagonalTwo: 0,
  rows: new Array(GAME_SIZE).fill(0),
  columns: new Array(GAME_SIZE).fill(0),
  totalMoves: 0,
  winner: 0,
};

function updateStorage(args: Omit<GameState, 'isHydrated'>) {
  saveToStorage(
    {
      ...args,
      isHydrated: false,
    },
    StorageKey.GAME,
  );
}

/*=============================================================================
= Store =======================================================================
=============================================================================*/

interface GameStore extends GameState {
  hydrate: () => void;
  isADraw: () => boolean;
  makeMove: (col: number, row: number, player: PlayerNumber) => void;
  resetStore: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  hydrate: async () => {
    if (!get().isHydrated) {
      const stored = await getFromStorage(StorageKey.GAME);
      set({...stored, isHydrated: true});
    }
  },
  makeMove: (col, row, player) => {
    const updatedBoard = [...get().board];
    const updatedRows = [...get().rows];
    const updatedColumns = [...get().columns];
    const updatedTotalMoves = get().totalMoves;
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
    }

    // TODO: add computer player option

    const nextPlayer: PlayerNumber = player === 1 ? 2 : 1;

    const newState = {
      board: updatedBoard,
      currentPlayer: nextPlayer,
      rows: updatedRows,
      columns: updatedColumns,
      diagonalOne: updatedDiagonalOne,
      diagonalTwo: updatedDiagonalTwo,
      totalMoves: updatedTotalMoves + 1,
      winner: foundWinner,
    };

    set(newState);
    updateStorage(newState);
  },
  isADraw: () => {
    return get().totalMoves === GAME_SIZE * GAME_SIZE;
  },
  resetStore: () => {
    set({
      board: createBoard(GAME_SIZE),
      currentPlayer: 1,
      isHydrated: true,
      diagonalOne: 0,
      diagonalTwo: 0,
      rows: new Array(GAME_SIZE).fill(0),
      columns: new Array(GAME_SIZE).fill(0),
      totalMoves: 0,
      winner: 0,
    });
  },
}));
