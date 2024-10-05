import { createSlice } from "@reduxjs/toolkit";

const scoresSlice = createSlice({
  name: "scores",
  initialState: {
    players: {},
    managers: {},
    playersTotal: {},
    managersTotal: {},
    totalVotes: 0,
    allowed: false,
  },
  reducers: {
    allowUser(state, action) {
      state.allowed = true;
    },
    disallowUser(state, action) {
      state.allowed = false;
    },
    addPoint(state, action) {
      const { isPlayer, id, value } = action.payload;
      const changedObject = isPlayer ? state.players : state.managers;
      if (!value) {
        changedObject[id] = 0;
      } else if (!isNaN(value)) {
        let score = changedObject[id];
        if (!score) {
          changedObject[id] = parseInt(value);
        } else if (score === 1 && parseInt(value) === 10) {
          changedObject[id] = 10;
        } else if (score === 1 && parseInt(value) !== 0) {
          changedObject[id] = 1;
        } else if (score === 10 && parseInt(value) === 1) {
          changedObject[id] = 1;
        } else if (score === 10 && parseInt(value) !== 1) {
          changedObject[id] = 10;
        }
      }
    },
    resetScores(state, action) {
      state.players = {};
      state.managers = {};
      state.playersTotal = {};
      state.managersTotal = {};
      state.allowed = false;
    },
    addUserPointsFromDb(state, action) {
      state.players = action.payload.players;
      state.managers = action.payload.managers;
    },
    addTotalPointsFromDb(state, action) {
      state.playersTotal = action.payload.players;
      state.managersTotal = action.payload.managers;
      state.totalVotes = action.payload.totalVotes;
    },
  },
});

export const {
  addPoint,
  resetScores,
  allowUser,
  disallowUser,
  addUserPointsFromDb,
  addTotalPointsFromDb,
} = scoresSlice.actions;
export const scoresReducer = scoresSlice.reducer;
