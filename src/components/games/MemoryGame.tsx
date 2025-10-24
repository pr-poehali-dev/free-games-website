import { useState } from 'react';
import { Button } from '@/components/ui/button';

const MemoryGame = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const emojis = ['🎮', '🚀', '⚽', '🎨', '🎵', '🍕', '🌟', '💎'];

  const initGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((_, i) => i));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameStarted(true);
  };

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
      
      if (shuffled[first] === shuffled[second]) {
        setMatched([...matched, first, second]);
      }
      
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const shuffled = gameStarted ? [...emojis, ...emojis].sort(() => Math.random() - 0.5) : [];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-2xl mb-2">Игра на память</h3>
        <p className="text-muted-foreground mb-4">Найди все пары карточек!</p>
        {gameStarted && <p className="text-lg">Ходов: {moves}</p>}
      </div>
      
      {!gameStarted ? (
        <Button onClick={initGame} size="lg" className="w-full bg-primary">
          Начать игру
        </Button>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {cards.map((cardIndex) => (
              <button
                key={cardIndex}
                onClick={() => handleClick(cardIndex)}
                className={`aspect-square rounded-lg text-4xl font-bold transition-all duration-300 hover:scale-105 ${
                  flipped.includes(cardIndex) || matched.includes(cardIndex)
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }`}
              >
                {flipped.includes(cardIndex) || matched.includes(cardIndex) ? shuffled[cardIndex] : '?'}
              </button>
            ))}
          </div>
          <Button onClick={initGame} variant="outline" className="w-full">
            Новая игра
          </Button>
        </>
      )}
      
      {matched.length === 16 && (
        <div className="text-center mt-6 p-6 bg-primary/10 rounded-lg border-2 border-primary animate-scale-in">
          <h4 className="font-heading font-bold text-2xl text-primary mb-2">Победа! 🎉</h4>
          <p>Вы завершили игру за {moves} ходов!</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
