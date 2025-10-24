import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            <a href="#rating" className="text-foreground hover:text-primary transition-colors">Рейтинг</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;