import React, { useState, useEffect, useCallback } from 'react';

// TicTacToe game component
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('Play to win a special message!');
  const [gameCompleted, setGameCompleted] = useState(false);
  
  const calculateWinner = useCallback((squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    return squares.every(square => square !== null) ? 'draw' : null;
  }, []);
  
  const handleClick = (index) => {
    if (board[index] || gameCompleted) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const winner = calculateWinner(newBoard);
    if (winner) {
      if (winner === 'X') {
        setGameStatus('You won! 🎉 Send me a message with "TicTacToe Winner" for a special response!');
      } else if (winner === 'O') {
        setGameStatus('I won! Try again?');
      } else {
        setGameStatus('It\'s a draw! Try again?');
      }
      setGameCompleted(true);
    } else {
      setIsXNext(!isXNext);
    }
  };
  
  useEffect(() => {
    // AI move
    if (!isXNext && !gameCompleted) {
      const timeoutId = setTimeout(() => {
        const emptySquares = board.map((square, index) => square === null ? index : null).filter(val => val !== null);
        if (emptySquares.length > 0) {
          // Simple AI: random move
          const randomIndex = Math.floor(Math.random() * emptySquares.length);
          handleClick(emptySquares[randomIndex]);
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isXNext, board, gameCompleted]);
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('Play to win a special message!');
    setGameCompleted(false);
  };
  
  const renderSquare = (index) => {
    return (
      <button 
        className={`w-16 h-16 bg-slate-800 border border-slate-700 text-2xl font-bold flex items-center justify-center transition-all duration-300 ${board[index] === 'X' ? 'text-teal-400' : 'text-pink-400'} ${!board[index] && !gameCompleted ? 'hover:bg-slate-700' : ''}`}
        onClick={() => handleClick(index)}
        disabled={!isXNext || gameCompleted}
      >
        {board[index]}
      </button>
    );
  };
  
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-lg border border-slate-800/50 flex flex-col items-center">
      <h3 className="text-xl font-bold text-white mb-4">Tic-Tac-Toe Challenge</h3>
      <p className="text-slate-300 mb-4 text-center">{gameStatus}</p>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      
      <button 
        onClick={resetGame}
        className="px-4 py-2 bg-slate-800 text-teal-400 rounded-md hover:bg-slate-700 transition-colors duration-300"
      >
        Reset Game
      </button>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Show the game after successful submission
      setShowGame(true);
      
      // Reset success message after 8 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 8000);
    }, 1500);
  };
  
  const toggleGame = () => {
    setShowGame(!showGame);
  };

  return (
    <div id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/30 to-gray-900 z-0">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ top: '10%', left: '20%', animationDuration: '3s', animationDelay: '0s' }}></div>
          <div className="absolute w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ top: '30%', left: '70%', animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute w-2 h-2 bg-indigo-500 rounded-full animate-ping" style={{ top: '70%', left: '30%', animationDuration: '5s', animationDelay: '2s' }}></div>
          <div className="absolute w-2 h-2 bg-cyan-500 rounded-full animate-ping" style={{ top: '80%', left: '80%', animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
          <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ top: '40%', left: '40%', animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6 text-center animate-text-shimmer">
          Get In Touch
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 animate-fade-in-delay">
          Feel free to reach out for collaborations or just a friendly hello
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-gray-300 animate-fade-in-delay">

            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Contact Information</h3>
            <p className="mb-6">
              I'm interested in freelance opportunities, especially ambitious or large projects. 
              However, if you have other requests or questions, don't hesitate to contact me.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center transform transition-all duration-300 hover:translate-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20 animate-pulse-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:singhsavitender4031@gmail.com" className="text-white hover:text-blue-400 transition-colors">
                    singhsavitender4031@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center transform transition-all duration-300 hover:translate-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mr-4 shadow-lg shadow-purple-500/20 animate-pulse-slow animation-delay-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+919810746419" className="text-white hover:text-blue-400 transition-colors">
                    +91 9810746419
                  </a>
                </div>
              </div>
              
              <div className="flex items-center transform transition-all duration-300 hover:translate-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-4 shadow-lg shadow-cyan-500/20 animate-pulse-slow animation-delay-1000">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <span className="text-white">India</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex space-x-6 justify-center md:justify-start">
              <a 
                href="https://github.com/dawgNotSoEz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:border-transparent transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </div>
              </a>
              <a 
                href="https://www.linkedin.com/in/savitendersingh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-500 group-hover:border-transparent transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </div>
              </a>
              <a 
                href="mailto:singhsavitender4031@gmail.com" 
                className="group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 group-hover:border-transparent transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in-delay-2 bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl transform transition-all duration-500 hover:shadow-indigo-500/20 hover:border-indigo-500/50">

            {isSubmitted ? (
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/50 rounded-lg p-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 animate-ping"></div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-3">Message Sent!</h3>
                <p className="text-gray-300">Thank you for your message. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none relative overflow-hidden group"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center relative z-10">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
