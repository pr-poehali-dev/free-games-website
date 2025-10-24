import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="Star"
          size={16}
          className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
        />
      ))}
    </div>
  );
};

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard = ({ game, onClick }: GameCardProps) => (
  <Card 
    className="group bg-card border-border hover-scale hover-glow cursor-pointer overflow-hidden transition-all duration-300"
    onClick={() => onClick(game)}
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

export default GameCard;
