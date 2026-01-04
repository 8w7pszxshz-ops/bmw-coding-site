export const categoryIcons: Record<string, string> = {
  engine: 'Zap',
  transmission: 'Settings',
  multimedia: 'Tv',
  lighting: 'Lightbulb',
  dashboard: 'Gauge',
  comfort: 'Home',
  safety: 'Shield'
};

export const serviceVisuals: Record<string, { before: string; after: string; description: string }> = {
  // Мультимедиа
  'MM01': {
    before: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=600&q=80',
    description: 'Беспроводной Apple CarPlay и Android Auto появится в меню iDrive'
  },
  'MM02': {
    before: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80',
    description: 'Возможность смотреть видео на экране во время движения (только для пассажира)'
  },
  'MM03': {
    before: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&q=80',
    description: 'Камера заднего вида растянется на весь экран для лучшего обзора'
  },
  'MM04': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80',
    description: 'G-meter, давление турбины, температура масла на экране'
  },
  
  // Освещение
  'LIGHT01': {
    before: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80',
    description: 'Подсветка под дверями создаст эффект ковровой дорожки'
  },
  'LIGHT02': {
    before: 'https://images.unsplash.com/photo-1514866726862-0f081731e0ce?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&q=80',
    description: 'Дневные ходовые огни будут работать как в скандинавских странах'
  },
  'LIGHT03': {
    before: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=600&q=80',
    description: 'Поворотники будут бежать волной вместо обычного мигания'
  },
  'LIGHT04': {
    before: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
    description: 'Ангельские глазки станут ярче и заметнее'
  },
  'LIGHT05': {
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1562224840-3c0b8de69b60?w=600&q=80',
    description: 'Противотуманки будут работать как дневные ходовые огни'
  },
  
  // Приборная панель
  'DASH01': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80',
    description: 'Цифровой спидометр всегда будет виден на дисплее'
  },
  'DASH02': {
    before: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1617128034254-61a3b0befc19?w=600&q=80',
    description: 'Стрелки приборов эффектно пробегут полный круг при запуске'
  },
  'DASH03': {
    before: 'https://images.unsplash.com/photo-1563249278-1b0e9f0c2d67?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&q=80',
    description: 'Температура масла двигателя появится на дисплее постоянно'
  },
  'DASH04': {
    before: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=600&q=80',
    description: 'Спортивные M-дисплеи с доп. информацией для трека'
  },
  
  // Комфорт
  'COMF01': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80',
    description: 'Багажник откроется от движения ноги, зеркала складываются автоматически'
  },
  'COMF02': {
    before: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    description: 'Все окна закроются удержанием кнопки закрытия на ключе'
  },
  'COMF03': {
    before: 'https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1620125501033-c285373a6e88?w=600&q=80',
    description: 'Система Start/Stop будет автоматически выключена при каждом запуске'
  },
  'COMF04': {
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80',
    description: 'Зеркала можно будет сложить даже во время движения'
  },
  'COMF05': {
    before: 'https://images.unsplash.com/photo-1607057873073-e8f3250e46c5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&q=80',
    description: 'Климат-контроль продолжит обогрев салона после выключения двигателя'
  },
  
  // Двигатель
  'ENG01': {
    before: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    description: 'B48 320i: прибавка +40 л.с. до 224 л.с. и +80 Нм крутящего момента'
  },
  'ENG02': {
    before: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    description: 'B58 340i: прирост +60 л.с. до 386 л.с. и +100 Нм момента'
  },
  'ENG03': {
    before: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&q=80',
    description: 'B58 Stage 2: экстремальные +100 л.с. с даунпайпом до 426 л.с.'
  },
  'ENG04': {
    before: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    description: 'Выхлоп будет стрелять и хлопать при сбросе газа как на спорткарах'
  },
  'ENG05': {
    before: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    description: 'Launch Control для максимально быстрого старта с места'
  },
  'ENG06': {
    before: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80',
    description: 'Снятие ограничения максимальной скорости 250 км/ч'
  },
  
  // Трансмиссия
  'TRANS01': {
    before: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    description: 'XHP Stage 1: переключения на 30% быстрее, отклик улучшен'
  },
  'TRANS02': {
    before: 'https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    description: 'XHP Stage 2: агрессивные переключения +50%, жесткие удары'
  },
  'TRANS03': {
    before: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    description: 'XHP Stage 3: максимум +70% скорость, Launch до 5000 rpm'
  },
  'TRANS04': {
    before: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80',
    description: 'Kickdown сработает уже при 50% нажатия педали газа'
  },
  
  // Безопасность
  'SAFE01': {
    before: 'https://images.unsplash.com/photo-1541889086161-aaee8109a6d8?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1588489357406-4d9d914d9a5c?w=600&q=80',
    description: 'MDM режим (спортивная стабилизация) будет включен по умолчанию'
  },
  'SAFE02': {
    before: 'https://images.unsplash.com/photo-1588489357406-4d9d914d9a5c?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80',
    description: 'Отключение назойливого звукового сигнала непристегнутого ремня'
  },
  'SAFE03': {
    before: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    description: 'Отключение подушки пассажира для безопасной установки детского кресла'
  }
};
