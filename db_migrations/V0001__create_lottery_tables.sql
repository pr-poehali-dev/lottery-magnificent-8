-- Таблица розыгрышей
CREATE TABLE IF NOT EXISTS lottery_draws (
    id SERIAL PRIMARY KEY,
    draw_number INTEGER NOT NULL UNIQUE,
    draw_date TIMESTAMP NOT NULL DEFAULT NOW(),
    winning_numbers INTEGER[] NOT NULL,
    jackpot_amount DECIMAL(12, 2) NOT NULL,
    total_winners INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'completed'
);

-- Таблица победителей
CREATE TABLE IF NOT EXISTS lottery_winners (
    id SERIAL PRIMARY KEY,
    draw_id INTEGER REFERENCES lottery_draws(id),
    winner_name VARCHAR(255) NOT NULL,
    prize_amount DECIMAL(12, 2) NOT NULL,
    matched_numbers INTEGER NOT NULL,
    win_date TIMESTAMP NOT NULL DEFAULT NOW(),
    ticket_number VARCHAR(50) NOT NULL
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_draws_date ON lottery_draws(draw_date DESC);
CREATE INDEX IF NOT EXISTS idx_winners_draw ON lottery_winners(draw_id);

-- Добавляем тестовые данные
INSERT INTO lottery_draws (draw_number, draw_date, winning_numbers, jackpot_amount, total_winners) VALUES
(1, NOW() - INTERVAL '7 days', ARRAY[7, 14, 21, 28, 35, 42, 49, 56], 5000000.00, 8),
(2, NOW() - INTERVAL '14 days', ARRAY[3, 9, 15, 23, 31, 37, 44, 51], 3500000.00, 12),
(3, NOW() - INTERVAL '21 days', ARRAY[5, 12, 19, 26, 33, 40, 47, 54], 4200000.00, 6);

INSERT INTO lottery_winners (draw_id, winner_name, prize_amount, matched_numbers, ticket_number) VALUES
(1, 'Александр М.', 2500000.00, 8, 'LT-001-2024'),
(1, 'Екатерина П.', 1000000.00, 7, 'LT-042-2024'),
(1, 'Дмитрий К.', 500000.00, 6, 'LT-089-2024'),
(2, 'Анна С.', 1500000.00, 8, 'LT-156-2024'),
(2, 'Сергей В.', 800000.00, 7, 'LT-203-2024'),
(3, 'Ольга Н.', 3000000.00, 8, 'LT-334-2024');