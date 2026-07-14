import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Файлы, в которых мы БУДЕМ менять цвета
// Мы намеренно НЕ включаем 'src/components/Partners.tsx', чтобы сохранить цвета брендов
const filesToProcess = [
    'src/index.css',
    'src/components/Header.tsx',
    'src/components/Hero.tsx',
    'src/components/About.tsx',
    'src/components/Vacancies.tsx',
    'src/components/Modal.tsx',
    'src/components/ContactForm.tsx',
    'src/components/Footer.tsx',
    'src/components/Schedule.tsx',
    'src/components/Steps.tsx',
    'src/components/MobileApp.tsx',
    'src/components/Reviews.tsx',
    'src/components/ScrollCar.tsx',
    'src/components/VideoSection.tsx',
];

// 2. Карта замен (от самых специфичных к общим)
// Логика: Blue -> Green (Hvojny/Forest style)
const replacements = [
    // --- Tailwind классы ---
    // Подвал и очень темные фоны
    { from: /green-750/g, to: 'green-850' },
    { from: /green-750/g, to: 'green-850' }, // на всякий случай
    
    // Ховеры кнопок и темные акценты
    { from: /green-700/g, to: 'green-800' }, 
    { from: /green-700/g, to: 'green-800' },

    // ОСНОВНОЙ ЦВЕТ (Кнопки, активные элементы) -> Green-800
    { from: /green-600/g, to: 'green-700' },

    // Иконки и второстепенный текст -> Green-700 (чтобы было контрастно)
    { from: /green-500/g, to: 'green-600' },

    // Границы и декорации
    { from: /green-400/g, to: 'green-500' },
    { from: /green-100/g, to: 'green-200' },

    // Тени и легкие акценты
    { from: /green-200/g, to: 'green-200' },
    { from: /green-100/g, to: 'green-100' },
    
    // Самые светлые фоны
    { from: /green-50/g,  to: 'green-50' },

    // --- HEX коды (для SVG и CSS градиентов) ---
    // CSS Shimmer градиент
    { from: /#148b42/gi, to: '#129243' }, // blue-600 hex -> green-800 hex
    
    // SVG Машинка (ScrollCar.tsx) - Корпус
    { from: /#166534/gi, to: '#129243' }, // Корпус (светло-синий -> зеленый)
    { from: /#14532d/gi, to: '#097e37' }, // Грузовой отсек (синий -> темно-зеленый)
    
    // RGBA цвета (для теней в CSS)
    // 59, 130, 246 - это RGB для blue-500. Меняем на green-800 (22, 101, 52)
    { from: /59, 130, 246/g, to: '22, 101, 52' },
];

function processFile(filePath) {
    const fullPath = path.join(__dirname, filePath);

    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️ Файл не найден (пропуск): ${filePath}`);
        return;
    }

    try {
        let content = fs.readFileSync(fullPath, 'utf8');
        let originalContent = content;

        // Применяем все замены
        replacements.forEach(({ from, to }) => {
            content = content.replace(from, to);
        });

        if (content !== originalContent) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Обновлен: ${filePath}`);
        } else {
            console.log(`Assignments Нет совпадений для замены: ${filePath}`);
        }
    } catch (err) {
        console.error(`❌ Ошибка при обработке ${filePath}:`, err);
    }
}

console.log('🌲 Начинаем перекраску в Dark Green (Green-800)...');
filesToProcess.forEach(processFile);
console.log('🏁 Готово! Проверьте сайт.');