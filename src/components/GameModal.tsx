import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

interface Review {
  id: number;
  gameId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const StarRating = ({ rating, interactive = false, onRate }: StarRatingProps) => {
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

interface GameModalProps {
  game: Game | null;
  reviews: Review[];
  onClose: () => void;
  onPlay: () => void;
  onSubmitReview: (rating: number, comment: string) => void;
  isPlaying: boolean;
}

const GameModal = ({ game, reviews, onClose, onPlay, onSubmitReview, isPlaying }: GameModalProps) => {
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  if (!game) return null;

  const gameReviews = reviews.filter(r => r.gameId === game.id);

  const handleSubmit = () => {
    if (userRating > 0 && userReview.trim()) {
      onSubmitReview(userRating, userReview);
      setUserRating(0);
      setUserReview('');
    }
  };

  const GameComponent = game.component;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onClose}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к каталогу
        </Button>

        <div className="max-w-4xl mx-auto">
          {!isPlaying ? (
            <>
              <Card className="bg-card border-border overflow-hidden mb-8">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-[200px]">
                    {game.image}
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-4xl mb-4">{game.title}</h2>
                    <div className="flex items-center gap-4 mb-6">
                      <Badge className="bg-primary text-primary-foreground text-lg px-4 py-1">
                        {game.genre}
                      </Badge>
                      {game.isNew && (
                        <Badge className="bg-secondary text-secondary-foreground text-lg px-4 py-1">
                          Новинка
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <StarRating rating={Math.round(game.rating)} />
                      <span className="font-bold text-2xl">{game.rating}</span>
                      <span className="text-muted-foreground">({game.reviews} отзывов)</span>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90 text-lg h-14"
                      onClick={onPlay}
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
                      onClick={handleSubmit}
                      disabled={userRating === 0 || !userReview.trim()}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Icon name="Send" size={18} className="mr-2" />
                      Опубликовать отзыв
                    </Button>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card className="bg-card border-border p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading font-bold text-3xl">{game.title}</h2>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  <Icon name="X" size={18} className="mr-2" />
                  Закрыть игру
                </Button>
              </div>
              <GameComponent />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameModal;
