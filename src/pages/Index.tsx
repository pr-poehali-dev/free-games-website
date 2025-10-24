import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

interface Game {
  id: number;
  title: string;
  genre: string;
  rating: number;
  reviews: number;
  image: string;
  featured?: boolean;
  isNew?: boolean;
  component: () => JSX.Element;
}

interface Review {
  id: number;
  gameId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

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
              placeholder="Введи число..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
              className="text-lg"
            />
            <Button onClick={handleGuess} className="bg-primary">
              Проверить
            </Button>
          </div>
          
          {hint && (
            <div className="p-4 bg-card border-2 border-primary rounded-lg text-center">
              <p className="text-lg font-semibold">{hint}</p>
            </div>
          )}

          {attempts.length > 0 && (
            <div className="p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Твои попытки:</p>
              <div className="flex flex-wrap gap-2">
                {attempts.map((attempt, i) => (
                  <Badge key={i} variant="outline" className={
                    attempt === target ? 'border-green-500 text-green-500' :
                    attempt < target ? 'border-blue-500 text-blue-500' :
                    'border-orange-500 text-orange-500'
                  }>
                    {attempt}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 bg-primary/10 rounded-lg border-2 border-primary animate-scale-in">
          <Icon name="Trophy" size={64} className="mx-auto mb-4 text-primary" />
          <h4 className="font-heading font-bold text-3xl text-primary mb-2">Победа! 🎉</h4>
          <p className="text-lg mb-4">Ты угадал число {target} за {attempts.length} попыток!</p>
          <Button onClick={resetGame} className="bg-primary">
            Играть ещё раз
          </Button>
        </div>
      )}
    </div>
  );
};

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const games: Game[] = [
    { 
      id: 1, 
      title: 'Игра на память', 
      genre: 'Головоломки', 
      rating: 4.8, 
      reviews: 1234, 
      image: '🧩', 
      featured: true,
      component: MemoryGame
    },
    { 
      id: 2, 
      title: 'Тест реакции', 
      genre: 'Экшен', 
      rating: 4.6, 
      reviews: 892, 
      image: '⚡', 
      featured: true,
      component: ReactionGame
    },
    { 
      id: 3, 
      title: 'Угадай число', 
      genre: 'Головоломки', 
      rating: 4.9, 
      reviews: 2156, 
      image: '🎯', 
      isNew: true,
      component: NumberGuessGame
    },
  ];

  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, gameId: 1, author: 'Игрок123', rating: 5, comment: 'Отлично тренирует память! Очень затягивает.', date: '2025-10-20' },
    { id: 2, gameId: 1, author: 'Геймер2025', rating: 4, comment: 'Хорошая игра для разминки мозга.', date: '2025-10-19' },
    { id: 3, gameId: 2, author: 'SpeedKing', rating: 5, comment: 'Прокачал реакцию до 180мс! Супер!', date: '2025-10-21' },
  ]);

  const genres = ['Все', 'Экшен', 'Головоломки'];

  const filteredGames = games.filter(game => {
    const matchesGenre = selectedGenre === 'Все' || game.genre === selectedGenre;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const featuredGames = games.filter(game => game.featured);
  const newGames = games.filter(game => game.isNew);

  const handleSubmitReview = () => {
    if (selectedGame && userRating > 0 && userReview.trim()) {
      const newReview: Review = {
        id: reviews.length + 1,
        gameId: selectedGame.id,
        author: 'Gleb',
        rating: userRating,
        comment: userReview,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([newReview, ...reviews]);
      setUserRating(0);
      setUserReview('');
    }
  };

  const gameReviews = selectedGame ? reviews.filter(r => r.gameId === selectedGame.id) : [];

  const StarRating = ({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate && onRate(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            disabled={!interactive}
          >
            <Icon
              name="Star"
              size={interactive ? 24 : 16}
              className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
            />
          </button>
        ))}
      </div>
    );
  };

  const GameCard = ({ game }: { game: Game }) => (
    <Card 
      className="group bg-card border-border hover-scale hover-glow cursor-pointer overflow-hidden transition-all duration-300"
      onClick={() => {
        setSelectedGame(game);
        setIsPlaying(false);
      }}
    >
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-8xl relative">
        {game.image}
        {game.isNew && (
          <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
            Новинка
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {game.genre}
          </Badge>
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(game.rating)} />
            <span className="text-sm font-semibold">{game.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="MessageCircle" size={14} />
            {game.reviews} отзывов
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setSelectedGame(null);
                setIsPlaying(false);
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-2xl animate-glow">
                🎮
              </div>
              <h1 className="font-heading font-bold text-2xl text-gradient">GameHub</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#top" className="text-foreground hover:text-primary transition-colors">Топ игр</a>
              <a href="#new" className="text-foreground hover:text-primary transition-colors">Новинки</a>
            </nav>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </header>

      {!selectedGame && (
        <>
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center animate-fade-in">
                <h2 className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gradient">
                  Играй бесплатно
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Браузерные игры без регистрации и скачивания. Просто выбери и играй прямо сейчас!
                </p>
                <div className="relative max-w-md mx-auto">
                  <Input
                    placeholder="Поиск игр..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg bg-card/80 backdrop-blur-sm border-border"
                  />
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Автор: <span className="text-primary font-semibold">Gleb</span>
                </p>
              </div>
            </div>
          </section>

          <section id="top" className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <Icon name="Trophy" size={32} className="text-primary" />
                <h2 className="font-heading font-bold text-3xl">Топ популярных</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </section>

          {newGames.length > 0 && (
            <section id="new" className="py-16">
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                  <Icon name="Sparkles" size={32} className="text-secondary" />
                  <h2 className="font-heading font-bold text-3xl">Новые игры</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newGames.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section id="catalog" className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <Icon name="LayoutGrid" size={32} className="text-primary" />
                <h2 className="font-heading font-bold text-3xl">Каталог игр</h2>
              </div>
              
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {genres.map(genre => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? 'default' : 'outline'}
                    onClick={() => setSelectedGenre(genre)}
                    className={selectedGenre === genre ? 'bg-primary' : ''}
                  >
                    {genre}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {selectedGame && (
        <div className="min-h-screen animate-fade-in">
          <div className="container mx-auto px-4 py-8">
            {!isPlaying ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedGame(null)}
                  className="mb-4"
                >
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Назад к каталогу
                </Button>

                <div className="max-w-4xl mx-auto">
                  <Card className="bg-card border-border overflow-hidden mb-8">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-[200px]">
                        {selectedGame.image}
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-4xl mb-4">{selectedGame.title}</h2>
                        <div className="flex items-center gap-4 mb-6">
                          <Badge className="bg-primary text-primary-foreground text-lg px-4 py-1">
                            {selectedGame.genre}
                          </Badge>
                          {selectedGame.isNew && (
                            <Badge className="bg-secondary text-secondary-foreground text-lg px-4 py-1">
                              Новинка
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                          <StarRating rating={Math.round(selectedGame.rating)} />
                          <span className="font-bold text-2xl">{selectedGame.rating}</span>
                          <span className="text-muted-foreground">({selectedGame.reviews} отзывов)</span>
                        </div>
                        <Button 
                          size="lg" 
                          className="w-full bg-primary hover:bg-primary/90 text-lg h-14"
                          onClick={() => setIsPlaying(true)}
                        >
                          <Icon name="Play" size={24} className="mr-2" />
                          Играть сейчас
                        </Button>
                      </div>
                    </div>
                  </Card>

                  <Tabs defaultValue="reviews" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="reviews">Отзывы ({gameReviews.length})</TabsTrigger>
                      <TabsTrigger value="add">Написать отзыв</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="reviews" className="mt-6">
                      <div className="space-y-4">
                        {gameReviews.length === 0 ? (
                          <Card className="p-8 text-center bg-card border-border">
                            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">Пока нет отзывов. Будьте первым!</p>
                          </Card>
                        ) : (
                          gameReviews.map(review => (
                            <Card key={review.id} className="p-6 bg-card border-border">
                              <div className="flex items-start gap-4">
                                <Avatar>
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {review.author[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold">{review.author}</h4>
                                    <span className="text-sm text-muted-foreground">{review.date}</span>
                                  </div>
                                  <StarRating rating={review.rating} />
                                  <p className="mt-3 text-foreground/90">{review.comment}</p>
                                </div>
                              </div>
                            </Card>
                          ))
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="add" className="mt-6">
                      <Card className="p-6 bg-card border-border">
                        <h3 className="font-heading font-semibold text-xl mb-4">Ваша оценка</h3>
                        <div className="mb-6">
                          <StarRating rating={userRating} interactive onRate={setUserRating} />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Ваш отзыв</label>
                          <Textarea
                            placeholder="Расскажите о своих впечатлениях..."
                            value={userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                            className="min-h-32 bg-background border-border"
                          />
                        </div>
                        <Button 
                          onClick={handleSubmitReview}
                          disabled={userRating === 0 || !userReview.trim()}
                          className="w-full bg-primary hover:bg-primary/90"
                        >
                          <Icon name="Send" size={18} className="mr-2" />
                          Опубликовать отзыв
                        </Button>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            ) : (
              <div>
                <Button
                  variant="ghost"
                  onClick={() => setIsPlaying(false)}
                  className="mb-4"
                >
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Вернуться к описанию
                </Button>
                <Card className="bg-card border-border overflow-hidden animate-scale-in">
                  <selectedGame.component />
                </Card>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 GameHub. Все права защищены.</p>
          <p className="mt-2">Создано с ❤️ автором Gleb</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
