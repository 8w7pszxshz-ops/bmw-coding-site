#!/bin/bash
# Скрипт автоматической проверки исправления мигалок чип-тюнинга

echo "🚀 АВТОПРОВЕРКА МИГАЛОК ЧИП-ТЮНИНГА"
echo "===================================="
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Счётчики
PASS=0
FAIL=0

check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ $1${NC}"
        ((FAIL++))
    fi
}

# 1. Проверка кода в ChipTuningMobileView.tsx
echo "1️⃣  Проверка использования sessionStorage..."
grep -q "sessionStorage.getItem('chiptuning-lights-shown')" src/components/chiptuning/ChipTuningMobileView.tsx
check "sessionStorage.getItem присутствует"

grep -q "sessionStorage.setItem('chiptuning-lights-shown', 'true')" src/components/chiptuning/ChipTuningMobileView.tsx
check "sessionStorage.setItem присутствует"

# 2. Проверка времени таймера
echo ""
echo "2️⃣  Проверка времени работы мигалок..."
grep -q "setTimeout.*6500" src/components/chiptuning/ChipTuningMobileView.tsx
check "Таймер установлен на 6500ms (6.5 сек)"

! grep -q "setTimeout.*15000" src/components/chiptuning/ChipTuningMobileView.tsx
check "НЕТ таймера на 15000ms"

# 3. Проверка CSS
echo ""
echo "3️⃣  Проверка CSS анимации..."
grep -q "\.chiptuning-dialog {" src/index.css
check "Базовый класс .chiptuning-dialog есть"

grep -q "\.chiptuning-dialog\.with-police-lights {" src/index.css
check "Модификатор .with-police-lights есть"

grep -q "@keyframes chiptuningPoliceLights" src/index.css
check "Анимация chiptuningPoliceLights объявлена"

# 4. Проверка useEffect структуры
echo ""
echo "4️⃣  Проверка логики useEffect..."
grep -q "if (step === 'series' && !hasShown)" src/components/chiptuning/ChipTuningMobileView.tsx
check "Условие показа мигалок корректное"

grep -q "setShowPoliceLights(true)" src/components/chiptuning/ChipTuningMobileView.tsx
check "Включение мигалок есть"

grep -q "setShowPoliceLights(false)" src/components/chiptuning/ChipTuningMobileView.tsx
check "Выключение мигалок есть"

# 5. Проверка cleanup функции
echo ""
echo "5️⃣  Проверка cleanup функции..."
grep -q "clearTimeout(timer)" src/components/chiptuning/ChipTuningMobileView.tsx
check "clearTimeout в cleanup"

grep -q "audio.pause()" src/components/chiptuning/ChipTuningMobileView.tsx
check "audio.pause() в cleanup"

# 6. Проверка className в компоненте
echo ""
echo "6️⃣  Проверка применения CSS класса..."
grep -q "showPoliceLights ? 'with-police-lights' : ''" src/components/chiptuning/ChipTuningMobileView.tsx
check "Условное применение класса with-police-lights"

# 7. Проверка отсутствия useRef
echo ""
echo "7️⃣  Проверка отказа от useRef..."
! grep -q "useRef.*isFirstOpen" src/components/chiptuning/ChipTuningMobileView.tsx
check "НЕТ useRef для isFirstOpen"

! grep -q "isFirstOpen.current" src/components/chiptuning/ChipTuningMobileView.tsx
check "НЕТ обращений к isFirstOpen.current"

# Финальный результат
echo ""
echo "===================================="
echo -e "Результаты: ${GREEN}${PASS} успешно${NC} | ${RED}${FAIL} ошибок${NC}"

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ!${NC}"
    echo ""
    echo "📋 Следующие шаги:"
    echo "   1. Проверь сайт в браузере (очисти кэш: Ctrl+Shift+R)"
    echo "   2. Открой консоль (F12) и найди логи [CHIPTUNING DEBUG]"
    echo "   3. Тест: /test-chiptuning.html"
    echo "   4. Гайд: CHIPTUNING_TEST_GUIDE.md"
    exit 0
else
    echo -e "${RED}❌ ЕСТЬ ОШИБКИ! Проверь код.${NC}"
    exit 1
fi
