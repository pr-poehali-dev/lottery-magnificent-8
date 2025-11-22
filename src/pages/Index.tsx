import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Draw {
  id: number;
  draw_number: number;
  draw_date: string;
  winning_numbers: number[];
  jackpot_amount: string;
  total_winners: number;
  status: string;
}

interface Winner {
  id: number;
  winner_name: string;
  prize_amount: string;
  matched_numbers: number;
  win_date: string;
  ticket_number: string;
}

export default function Index() {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  useEffect(() => {
    fetchDraws();
    fetchWinners();
  }, []);

  const fetchDraws = async () => {
    setDraws([
      {
        id: 1,
        draw_number: 1,
        draw_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        winning_numbers: [7, 14, 21, 28, 35, 42, 49, 56],
        jackpot_amount: '5000000.00',
        total_winners: 8,
        status: 'completed'
      },
      {
        id: 2,
        draw_number: 2,
        draw_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        winning_numbers: [3, 9, 15, 23, 31, 37, 44, 51],
        jackpot_amount: '3500000.00',
        total_winners: 12,
        status: 'completed'
      },
      {
        id: 3,
        draw_number: 3,
        draw_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        winning_numbers: [5, 12, 19, 26, 33, 40, 47, 54],
        jackpot_amount: '4200000.00',
        total_winners: 6,
        status: 'completed'
      }
    ]);
  };

  const fetchWinners = async () => {
    setWinners([
      {
        id: 1,
        winner_name: 'Александр М.',
        prize_amount: '2500000.00',
        matched_numbers: 8,
        win_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        ticket_number: 'LT-001-2024'
      },
      {
        id: 2,
        winner_name: 'Екатерина П.',
        prize_amount: '1000000.00',
        matched_numbers: 7,
        win_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        ticket_number: 'LT-042-2024'
      },
      {
        id: 3,
        winner_name: 'Дмитрий К.',
        prize_amount: '500000.00',
        matched_numbers: 6,
        win_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        ticket_number: 'LT-089-2024'
      },
      {
        id: 4,
        winner_name: 'Анна С.',
        prize_amount: '1500000.00',
        matched_numbers: 8,
        win_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        ticket_number: 'LT-156-2024'
      },
      {
        id: 5,
        winner_name: 'Сергей В.',
        prize_amount: '800000.00',
        matched_numbers: 7,
        win_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        ticket_number: 'LT-203-2024'
      },
      {
        id: 6,
        winner_name: 'Ольга Н.',
        prize_amount: '3000000.00',
        matched_numbers: 8,
        win_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        ticket_number: 'LT-334-2024'
      }
    ]);
  };

  const spinNumbers = () => {
    setSpinning(true);
    setSelectedNumbers([]);
    
    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 60) + 1;
      setSelectedNumbers(prev => {
        if (prev.length >= 8) {
          clearInterval(interval);
          setSpinning(false);
          return prev;
        }
        if (!prev.includes(randomNum)) {
          return [...prev, randomNum];
        }
        return prev;
      });
    }, 300);
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const totalPrizePool = draws.reduce((sum, draw) => sum + parseFloat(draw.jackpot_amount), 0);
  const totalWinners = draws.reduce((sum, draw) => sum + draw.total_winners, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Sparkles" className="text-primary animate-pulse" size={40} />
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-gradient">
              Лотерея Великолепная 8
            </h1>
            <Icon name="Sparkles" className="text-primary animate-pulse" size={40} />
          </div>
          <p className="text-xl text-muted-foreground">
            Выбирай 8 чисел и выигрывай миллионы!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 gradient-gold border-0 hover-scale">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-background/20 rounded-xl">
                <Icon name="Trophy" size={32} className="text-background" />
              </div>
              <div>
                <p className="text-sm text-background/80 font-medium">Общий призовой фонд</p>
                <p className="text-2xl font-heading font-bold text-background">
                  {formatCurrency(totalPrizePool.toString())}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-secondary border-0 hover-scale">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary-foreground/10 rounded-xl">
                <Icon name="Users" size={32} className="text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-secondary-foreground/80 font-medium">Всего победителей</p>
                <p className="text-2xl font-heading font-bold text-secondary-foreground">
                  {totalWinners}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-accent border-0 hover-scale">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-foreground/10 rounded-xl">
                <Icon name="Calendar" size={32} className="text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-accent-foreground/80 font-medium">Розыгрышей проведено</p>
                <p className="text-2xl font-heading font-bold text-accent-foreground">
                  {draws.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 mb-12 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold mb-2 flex items-center justify-center gap-2">
              <Icon name="Dice5" className="text-primary" />
              Барабан розыгрыша
            </h2>
            <p className="text-muted-foreground">Нажми кнопку и узнай свои счастливые числа</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[80px]">
            {selectedNumbers.map((num, idx) => (
              <div
                key={idx}
                className="w-16 h-16 rounded-xl gradient-gold flex items-center justify-center text-2xl font-bold text-background animate-scale-in shadow-lg"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {num}
              </div>
            ))}
            {spinning && selectedNumbers.length < 8 && (
              <div className="w-16 h-16 rounded-xl border-2 border-primary border-dashed flex items-center justify-center animate-spin-slow">
                <Icon name="Loader2" className="text-primary animate-spin" size={32} />
              </div>
            )}
          </div>

          <div className="text-center">
            <Button
              onClick={spinNumbers}
              disabled={spinning}
              size="lg"
              className="gradient-gold hover:opacity-90 text-background font-heading font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
            >
              {spinning ? (
                <>
                  <Icon name="Loader2" className="animate-spin mr-2" />
                  Крутим барабан...
                </>
              ) : (
                <>
                  <Icon name="Play" className="mr-2" />
                  Запустить розыгрыш
                </>
              )}
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="winners" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="winners" className="text-lg">
              <Icon name="Crown" className="mr-2" size={20} />
              Победители
            </TabsTrigger>
            <TabsTrigger value="history" className="text-lg">
              <Icon name="History" className="mr-2" size={20} />
              История розыгрышей
            </TabsTrigger>
          </TabsList>

          <TabsContent value="winners" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {winners.map((winner, idx) => (
                <Card
                  key={winner.id}
                  className="p-6 hover-scale border-primary/20 bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full gradient-gold">
                        <Icon name="Trophy" className="text-background" size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg">{winner.winner_name}</h3>
                        <p className="text-sm text-muted-foreground">{winner.ticket_number}</p>
                      </div>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">
                      {winner.matched_numbers}/8
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Выигрыш:</span>
                      <span className="font-bold text-primary text-lg">
                        {formatCurrency(winner.prize_amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Дата:</span>
                      <span className="text-sm">{formatDate(winner.win_date)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {draws.map((draw, idx) => (
              <Card
                key={draw.id}
                className="p-6 hover-scale border-primary/20 bg-card/80 backdrop-blur-sm"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="gradient-gold text-background border-0 text-lg px-4 py-1">
                        Розыгрыш #{draw.draw_number}
                      </Badge>
                      <span className="text-muted-foreground">{formatDate(draw.draw_date)}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {draw.winning_numbers.map((num) => (
                        <div
                          key={num}
                          className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center font-bold text-secondary-foreground"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <Icon name="DollarSign" className="text-primary" size={20} />
                      <div>
                        <p className="text-xs text-muted-foreground">Призовой фонд</p>
                        <p className="font-bold text-primary">{formatCurrency(draw.jackpot_amount)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Users" className="text-secondary" size={20} />
                      <div>
                        <p className="text-xs text-muted-foreground">Победителей</p>
                        <p className="font-bold">{draw.total_winners}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
