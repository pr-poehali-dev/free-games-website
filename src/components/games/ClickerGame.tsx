import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ClickerGame = () => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (clicks > bestScore) {
        setBestScore(clicks);
      }
    }
  }, [isPlaying, timeLeft, clicks, bestScore]);

  const startGame = () => {
    setClicks(0);
    setTimeLeft(10);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h3 className="font-heading font-bold text-2xl mb-2">Кликер</h3>
      <p className="text-muted-foreground mb-6">Сделай как можно больше кликов за 10 секунд!</p>

      {!isPlaying && clicks === 0 && (
        <Button onClick={startGame} size="lg" className="bg-primary">
          Начать игру
        </Button>
      )}

      {isPlaying && (
        <div className="space-y-6">
          <div className="text-6xl font-bold text-primary">{timeLeft}</div>
          <div className="text-2xl">Кликов: <span className="font-bold text-primary">{clicks}</span></div>
          <button
            onClick={() => setClicks(clicks + 1)}
            className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary text-white text-6xl hover:scale-105 active:scale-95 transition-transform shadow-2xl hover-glow"
          >
            ТЫК!
          </button>
        </div>
      )}

      {!isPlaying && clicks > 0 && (
        <div className="space-y-4 animate-scale-in">
          <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
            <h4 className="font-heading font-bold text-2xl text-primary mb-2">Результат</h4>
            <p className="text-4xl font-bold mb-2">{clicks} кликов</p>
            {bestScore > 0 && <p className="text-muted-foreground">Рекорд: {bestScore} кликов</p>}
          </div>
          <Button onClick={startGame} size="lg" className="bg-primary">
            Играть снова
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClickerGame;
