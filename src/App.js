import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateFlashcard from './pages/CreateFlashcard';
import MyFlashcards from './pages/MyFlashcards';
import FlashcardDetails from './pages/FlashcardDetails';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<CreateFlashcard />} />
          <Route path="/my-flashcards" element={<MyFlashcards />} />
          <Route path="/flashcard-details/:id" element={<FlashcardDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;