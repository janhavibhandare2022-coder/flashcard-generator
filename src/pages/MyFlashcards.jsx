import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { deleteFlashcard } from '../redux/flashcardSlice';

const MyFlashcards = () => {
  const flashcards = useSelector((state) => state.flashcard.flashcards);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="py-6">
      {flashcards.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
          <p className="text-gray-500 text-lg mb-4">No flashcards created yet!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 text-white px-6 py-2 rounded font-medium hover:bg-red-600 transition-all"
          >
            Create Flashcard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <button
                onClick={() => dispatch(deleteFlashcard(item.id))}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                title="Delete Deck"
              >
                <FaTrash />
              </button>

              <div className="flex items-center gap-4 mb-4">
                {item.groupImage ? (
                  <img
                    src={item.groupImage}
                    alt={item.groupName}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-bold text-xl">
                    {item.groupName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{item.groupName}</h3>
                  <p className="text-xs text-gray-500">{item.terms.length} Cards</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                {item.groupDescription}
              </p>

              <button
                onClick={() => navigate(`/flashcard-details/${item.id}`)}
                className="w-full border border-red-500 text-red-500 py-2 rounded font-medium hover:bg-red-500 hover:text-white transition-colors"
              >
                View Cards
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFlashcards;