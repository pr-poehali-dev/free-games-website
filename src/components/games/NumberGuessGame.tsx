import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NumberGuessGame = () => {
  const [target, setTarget] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [hint, setHint] = useState('');

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) return;

    setAttempts([...attempts, num]);
    
    if (num === target) {
      setGameWon(true);
      setHint('');
    } else if (num < target) {
      setHint('Загаданное число больше! ⬆️');
    } else {
      setHint('Загаданное число меньше! ⬇️');
    }
    
    setGuess('');
  };

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts([]);
    setGameWon(false);
    setHint('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-2xl mb-2">Угадай число</h3>
        <p className="text-muted-foreground mb-4">Я загадал число от 1 до 100. Попробуй угадать!</p>
        <p className="text-lg">Попыток: {attempts.length}</p>
      </div>

      {!gameWon ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
              placeholder="Введи число..."
              className="text-xl h-14"
            />
            <Button onClick={handleGuess} size="lg" className="bg-primary">
              Проверить
            </Button>
          </div>

          {hint && (
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-lg font-semibold">{hint}</p>
            </div>
          )}

          {attempts.length > 0 && (
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Твои попытки:</p>
              <div className="flex flex-wrap gap-2">
                {attempts.map((attempt, i) => (
                  <span key={i} className="px-3 py-1 bg-muted rounded-full text-sm">
                    {attempt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center animate-scale-in">
          <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary mb-6">
            <h4 className="font-heading font-bold text-2xl text-primary mb-2">Победа! 🎉</h4>
            <p className="text-lg mb-2">Ты угадал число {target}!</p>
            <p className="text-muted-foreground">За {attempts.length} попыток</p>
          </div>
          <Button onClick={resetGame} size="lg" className="bg-primary">
            Играть снова
          </Button>
        </div>
      )}
    </div>
  );
};

export default NumberGuessGame;
