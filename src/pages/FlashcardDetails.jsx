import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaShare, FaDownload, FaPrint, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ShareModal from '../components/ShareModal';

const FlashcardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const flashcards = useSelector((state) => state.flashcard.flashcards);
  const currentDeck = flashcards.find((card) => card.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);

  if (!currentDeck) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">Flashcard deck not found!</p>
        <button
          onClick={() => navigate('/my-flashcards')}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const terms = currentDeck.terms || [];
  const activeTerm = terms[currentIndex];

  const handleNext = () => {
    if (currentIndex < terms.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(currentDeck, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentDeck.groupName}_flashcards.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="py-6 space-y-6">
      {/* Header Info */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/my-flashcards')}
          className="text-gray-600 hover:text-red-500"
        >
          <FaArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{currentDeck.groupName}</h2>
          <p className="text-sm text-gray-600">{currentDeck.groupDescription}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Terms Navigation List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-2">
          <h4 className="font-bold text-sm text-gray-700 border-b pb-2 mb-2">Flashcards</h4>
          {terms.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                currentIndex === idx
                  ? 'text-red-600 bg-red-50 font-bold border-l-4 border-red-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.term}
            </button>
          ))}
        </div>

        {/* Center Card Carousel Display */}
        <div className="lg:col-span-2 flex flex-col items-center">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm w-full min-h-[300px] flex flex-col justify-between">
            <div>
              {activeTerm?.termImage && (
                <img
                  src={activeTerm.termImage}
                  alt={activeTerm.term}
                  className="w-full h-48 object-contain rounded mb-4 border"
                />
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{activeTerm?.term}</h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                {activeTerm?.definition}
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-6 mt-4 text-gray-600">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border ${
                currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'
              }`}
            >
              <FaChevronLeft />
            </button>
            <span className="text-sm font-semibold">
              {currentIndex + 1} / {terms.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === terms.length - 1}
              className={`p-2 rounded-full border ${
                currentIndex === terms.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-3">
          <button
            onClick={() => setIsShareOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            <FaShare className="text-gray-500" /> Share
          </button>
          <button
            onClick={handleDownload}
            className="w-full flex items-center gap-3 px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            <FaDownload className="text-gray-500" /> Download
          </button>
          <button
            onClick={handlePrint}
            className="w-full flex items-center gap-3 px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            <FaPrint className="text-gray-500" /> Print
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareUrl={window.location.href}
      />
    </div>
  );
};

export default FlashcardDetails;