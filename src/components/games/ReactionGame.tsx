import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ReactionGame = () => {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'go' | 'result'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const startGame = () => {
    setGameState('ready');
    const delay = Math.random() * 3000 + 2000;
    setTimeout(() => {
      setGameState('go');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'go') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState('result');
      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
    } else if (gameState === 'ready') {
      setGameState('waiting');
      setReactionTime(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-2xl mb-2">Тест реакции</h3>
        <p className="text-muted-foreground mb-4">Нажми как можно быстрее, когда экран станет зелёным!</p>
        {bestTime && <p className="text-lg text-primary">Лучшее время: {bestTime}мс</p>}
      </div>

      <div
        onClick={handleClick}
        className={`h-96 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
          gameState === 'waiting' ? 'bg-primary/20 border-2 border-primary' :
          gameState === 'ready' ? 'bg-destructive/20 border-2 border-destructive' :
          gameState === 'go' ? 'bg-green-500/30 border-2 border-green-500' :
          'bg-card border-2 border-border'
        }`}
      >
        <div className="text-center">
          {gameState === 'waiting' && (
            <div>
              <Icon name="Zap" size={64} className="mx-auto mb-4 text-primary" />
              <p className="text-xl font-semibold">Нажми для старта</p>
            </div>
          )}
          {gameState === 'ready' && (
            <div>
              <Icon name="Clock" size={64} className="mx-auto mb-4 text-destructive animate-pulse" />
              <p className="text-xl font-semibold text-destructive">Ждите...</p>
            </div>
          )}
          {gameState === 'go' && (
            <div>
              <Icon name="Zap" size={64} className="mx-auto mb-4 text-green-500 animate-pulse" />
              <p className="text-xl font-semibold text-green-500">НАЖМИ СЕЙЧАС!</p>
            </div>
          )}
          {gameState === 'result' && (
            <div className="animate-scale-in">
              <Icon name="Target" size={64} className="mx-auto mb-4 text-primary" />
              <p className="text-3xl font-bold text-primary mb-4">{reactionTime}мс</p>
              <p className="text-muted-foreground mb-4">
                {reactionTime! < 200 ? 'Невероятно быстро! 🚀' :
                 reactionTime! < 300 ? 'Отличная реакция! 💪' :
                 reactionTime! < 400 ? 'Хорошо! 👍' : 'Можно лучше 😊'}
              </p>
              <Button onClick={startGame} className="bg-primary">
                Попробовать ещё раз
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactionGame;
