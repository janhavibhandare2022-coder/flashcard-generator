import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('flashcards');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  flashcards: loadFromLocalStorage(),
};

const flashcardSlice = createSlice({
  name: 'flashcard',
  initialState,
  reducers: {
    addFlashcard: (state, action) => {
      state.flashcards.push(action.payload);
      localStorage.setItem('flashcards', JSON.stringify(state.flashcards));
    },
    deleteFlashcard: (state, action) => {
      state.flashcards = state.flashcards.filter((card) => card.id !== action.payload);
      localStorage.setItem('flashcards', JSON.stringify(state.flashcards));
    },
  },
});

export const { addFlashcard, deleteFlashcard } = flashcardSlice.actions;
export default flashcardSlice.reducer;