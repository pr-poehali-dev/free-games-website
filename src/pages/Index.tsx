import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import GameModal from '@/components/GameModal';
import MemoryGame from '@/components/games/MemoryGame';
import ReactionGame from '@/components/games/ReactionGame';
import NumberGuessGame from '@/components/games/NumberGuessGame';
import ClickerGame from '@/components/games/ClickerGame';

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

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const games: Game[] = [
    { id: 1, title: 'Memory Master', genre: 'Головоломки', rating: 4.8, reviews: 1234, image: '🧩', featured: true, component: MemoryGame },
    { id: 2, title: 'Speed Clicker', genre: 'Экшен', rating: 4.6, reviews: 892, image: '🖱️', featured: true, component: ClickerGame },
    { id: 3, title: 'Number Guess', genre: 'Головоломки', rating: 4.9, reviews: 2156, image: '🔢', isNew: true, component: NumberGuessGame },
    { id: 4, title: 'Reaction Test', genre: 'Экшен', rating: 4.7, reviews: 567, image: '⚡', component: ReactionGame },
    { id: 5, title: 'Color Memory', genre: 'Головоломки', rating: 4.5, reviews: 1890, image: '🎨', isNew: true, component: MemoryGame },
    { id: 6, title: 'Mega Clicker Pro', genre: 'Экшен', rating: 4.4, reviews: 743, image: '💥', component: ClickerGame },
  ];

  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, gameId: 1, author: 'Игрок123', rating: 5, comment: 'Отличная игра! Тренирует память.', date: '2025-10-20' },
    { id: 2, gameId: 2, author: 'Геймер2025', rating: 4, comment: 'Хорошая игра для убийства времени.', date: '2025-10-19' },
  ]);

  const genres = ['Все', 'Экшен', 'Головоломки'];

  const filteredGames = games.filter(game => {
    const matchesGenre = selectedGenre === 'Все' || game.genre === selectedGenre;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const featuredGames = games.filter(game => game.featured);
  const newGames = games.filter(game => game.isNew);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setIsPlaying(false);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
    setIsPlaying(false);
  };

  const handlePlayGame = () => {
    setIsPlaying(true);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    if (selectedGame) {
      const newReview: Review = {
        id: reviews.length + 1,
        gameId: selectedGame.id,
        author: 'Gleb',
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([newReview, ...reviews]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <section id="top" className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="Trophy" size={32} className="text-primary" />
            <h2 className="font-heading font-bold text-3xl">Топ популярных</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map(game => (
              <GameCard key={game.id} game={game} onClick={handleGameClick} />
            ))}
          </div>
        </div>
      </section>

      <section id="new" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="Sparkles" size={32} className="text-secondary" />
            <h2 className="font-heading font-bold text-3xl">Новые игры</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newGames.map(game => (
              <GameCard key={game.id} game={game} onClick={handleGameClick} />
            ))}
          </div>
        </div>
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} onClick={handleGameClick} />
            ))}
          </div>
        </div>
      </section>

      <GameModal
        game={selectedGame}
        reviews={reviews}
        onClose={handleCloseModal}
        onPlay={handlePlayGame}
        onSubmitReview={handleSubmitReview}
        isPlaying={isPlaying}
      />

      <Footer />
    </div>
  );
};

export default Index;
