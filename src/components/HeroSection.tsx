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
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="text-center md:text-left animate-fade-in">
            <h2 className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gradient">
              Играй бесплатно
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Играй в браузерные игры без регистрации и скачивания!
            </p>
            <div className="relative max-w-md mx-auto md:mx-0">
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
          
          <div className="flex justify-center md:justify-end animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-2xl" />
              <img 
                src="https://cdn.poehali.dev/projects/5b15e10c-b218-4bd6-9555-40f04ea804a0/files/3ff28513-a65c-43ec-b396-b700d460290d.jpg"
                alt="Хаски"
                className="relative rounded-2xl shadow-2xl border-2 border-primary/20 w-full max-w-md hover-scale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;