import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gradient">
            Играй бесплатно
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Играй в браузерные игры без регистрации и скачивания!
          </p>
          <div className="relative max-w-md mx-auto">
            <Input
              placeholder="Поиск игр..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
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
  );
};

export default HeroSection;
