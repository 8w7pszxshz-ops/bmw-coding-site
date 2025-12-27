export interface EngineVariant {
  name: string;
  powerBefore: number;
  powerAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  price: number;
  models: string[];
  generation: string;
}

export interface EngineGroup {
  name: string;
  type: 'petrol' | 'diesel';
  description: string;
  variants: EngineVariant[];
}

export const engineGroups: EngineGroup[] = [
  {
    name: 'N20 2.0',
    type: 'petrol',
    description: 'F-серия (2011-2015)',
    variants: [
      { 
        name: '20i => 28i', 
        powerBefore: 184, 
        powerAfter: 260, 
        torqueBefore: 270, 
        torqueAfter: 440, 
        price: 80000,
        models: ['F30 320i', 'F10 520i', 'F25 X3 20i', 'F26 X4 20i'],
        generation: 'F'
      }
    ]
  },
  {
    name: 'N55 3.0',
    type: 'petrol',
    description: 'F-серия (2010-2016)',
    variants: [
      { 
        name: '306 л.с.', 
        powerBefore: 306, 
        powerAfter: 365, 
        torqueBefore: 400, 
        torqueAfter: 520, 
        price: 40000,
        models: ['F30 335i', 'F10 535i', 'F15 X5 35i', 'F16 X6 35i'],
        generation: 'F'
      }
    ]
  },
  {
    name: 'B48 2.0',
    type: 'petrol',
    description: 'G-серия (2015+)',
    variants: [
      { 
        name: '184 л.с.', 
        powerBefore: 184, 
        powerAfter: 280, 
        torqueBefore: 290, 
        torqueAfter: 440, 
        price: 30000,
        models: ['G20 320i', 'G30 520i', 'G01 X3 20i', 'G02 X4 20i'],
        generation: 'G'
      },
      { 
        name: '252 л.с.', 
        powerBefore: 252, 
        powerAfter: 280, 
        torqueBefore: 350, 
        torqueAfter: 460, 
        price: 30000,
        models: ['G20 330i', 'G30 530i', 'G01 X3 30i', 'G02 X4 30i'],
        generation: 'G'
      }
    ]
  },
  {
    name: 'B58 3.0',
    type: 'petrol',
    description: 'G-серия (2015+)',
    variants: [
      { 
        name: '340-360 л.с.', 
        powerBefore: 340, 
        powerAfter: 450, 
        torqueBefore: 450, 
        torqueAfter: 650, 
        price: 40000,
        models: ['G30 540i', 'G05 X5 40i', 'G06 X6 40i', 'G07 X7 40i'],
        generation: 'G'
      },
      { 
        name: '374-387 л.с.', 
        powerBefore: 387, 
        powerAfter: 450, 
        torqueBefore: 500, 
        torqueAfter: 650, 
        price: 40000,
        models: ['G20 M340i', 'G01 X3 M40i', 'G02 X4 M40i'],
        generation: 'G'
      }
    ]
  },
  {
    name: 'S58 3.0',
    type: 'petrol',
    description: 'M-Performance (2019+)',
    variants: [
      { 
        name: '530 л.с.', 
        powerBefore: 530, 
        powerAfter: 600, 
        torqueBefore: 750, 
        torqueAfter: 850, 
        price: 50000,
        models: ['G30 M550i', 'G05 X5 M50i', 'G06 X6 M50i', 'G07 X7 M50i'],
        generation: 'G'
      }
    ]
  },
  {
    name: 'N47 2.0 Diesel',
    type: 'diesel',
    description: 'F-серия (2009-2015)',
    variants: [
      { 
        name: '184 л.с.', 
        powerBefore: 184, 
        powerAfter: 220, 
        torqueBefore: 380, 
        torqueAfter: 440, 
        price: 30000,
        models: ['F30 320d', 'F10 520d', 'F25 X3 20d', 'F26 X4 20d'],
        generation: 'F'
      }
    ]
  },
  {
    name: 'N57 3.0 Diesel',
    type: 'diesel',
    description: 'F-серия (2008-2016)',
    variants: [
      { 
        name: '258 л.с.', 
        powerBefore: 258, 
        powerAfter: 310, 
        torqueBefore: 560, 
        torqueAfter: 650, 
        price: 35000,
        models: ['F30 330d', 'F10 530d', 'F15 X5 30d', 'F16 X6 30d'],
        generation: 'F'
      },
      { 
        name: '313 л.с.', 
        powerBefore: 313, 
        powerAfter: 375, 
        torqueBefore: 630, 
        torqueAfter: 730, 
        price: 35000,
        models: ['F25 X3 35d', 'F15 X5 40d', 'F16 X6 40d'],
        generation: 'F'
      }
    ]
  },
  {
    name: 'B47 2.0 Diesel',
    type: 'diesel',
    description: 'G-серия (2014+)',
    variants: [
      { 
        name: '150-190 л.с.', 
        powerBefore: 190, 
        powerAfter: 230, 
        torqueBefore: 400, 
        torqueAfter: 490, 
        price: 30000,
        models: ['G20 318d/320d', 'G30 520d', 'G01 X3 20d', 'G05 X5 25d'],
        generation: 'G'
      }
    ]
  },
  {
    name: 'B57 3.0 Diesel',
    type: 'diesel',
    description: 'G-серия (2015+)',
    variants: [
      { 
        name: '265 л.с.', 
        powerBefore: 265, 
        powerAfter: 340, 
        torqueBefore: 620, 
        torqueAfter: 770, 
        price: 35000,
        models: ['G20 330d', 'G30 530d', 'G01 X3 30d', 'G05 X5 30d', 'G11 730d'],
        generation: 'G'
      },
      { 
        name: '340 л.с.', 
        powerBefore: 340, 
        powerAfter: 400, 
        torqueBefore: 700, 
        torqueAfter: 800, 
        price: 35000,
        models: ['G20 M340d', 'G01 X3 M40d', 'G05 X5 40d', 'G11 740d'],
        generation: 'G'
      },
      { 
        name: '400 л.с.', 
        powerBefore: 400, 
        powerAfter: 460, 
        torqueBefore: 760, 
        torqueAfter: 860, 
        price: 40000,
        models: ['G30 M550d', 'G05 X5 M50d', 'G11 750d'],
        generation: 'G'
      }
    ]
  }
];

export const getGainPercentage = (before: number, after: number): number => {
  return Math.round(((after - before) / before) * 100);
};

export const getTypeColor = (type: string): string => {
  return type === 'petrol' ? '#FF9900' : '#FF9900';
};