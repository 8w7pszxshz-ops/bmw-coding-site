export interface EngineModification {
  name: string;
  powerBefore: number;
  powerAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  price: number;
}

export interface ModelData {
  name: string;
  series: string;
  generation: 'F' | 'G';
  engines: {
    code: string;
    type: 'petrol' | 'diesel';
    displacement: string;
    modifications: EngineModification[];
  }[];
}

export const bmwModels: ModelData[] = [
  // 1 Series E8x
  {
    name: '1 Series',
    series: 'E8x',
    generation: 'F',
    engines: [
      {
        code: 'N54',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '135i N54', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 30000 },
          { name: '1M 3.0i Biturbo', powerBefore: 340, powerAfter: 375, torqueBefore: 500, torqueAfter: 560, price: 30000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '116d', powerBefore: 115, powerAfter: 180, torqueBefore: 260, torqueAfter: 400, price: 25000 },
          { name: '118d (136 hp)', powerBefore: 136, powerAfter: 180, torqueBefore: 300, torqueAfter: 400, price: 25000 },
          { name: '118d (143 hp)', powerBefore: 143, powerAfter: 180, torqueBefore: 300, torqueAfter: 400, price: 25000 },
          { name: '120d (163 hp)', powerBefore: 163, powerAfter: 210, torqueBefore: 350, torqueAfter: 420, price: 27000 },
          { name: '120d (177 hp)', powerBefore: 177, powerAfter: 210, torqueBefore: 350, torqueAfter: 420, price: 27000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '123d', powerBefore: 204, powerAfter: 245, torqueBefore: 400, torqueAfter: 450, price: 28000 }
        ]
      }
    ]
  },
  // 1 Series F2x
  {
    name: '1 Series',
    series: 'F2x',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '114i', powerBefore: 102, powerAfter: 225, torqueBefore: 180, torqueAfter: 330, price: 25000 },
          { name: '116i', powerBefore: 136, powerAfter: 225, torqueBefore: 220, torqueAfter: 330, price: 25000 }
        ]
      },
      {
        code: 'N13/B16',
        type: 'petrol',
        displacement: '1.6',
        modifications: [
          { name: '118i', powerBefore: 170, powerAfter: 225, torqueBefore: 250, torqueAfter: 330, price: 26000 }
        ]
      },
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '125i', powerBefore: 218, powerAfter: 260, torqueBefore: 310, torqueAfter: 440, price: 28000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M135i', powerBefore: 320, powerAfter: 365, torqueBefore: 450, torqueAfter: 520, price: 35000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '114d', powerBefore: 95, powerAfter: 150, torqueBefore: 235, torqueAfter: 320, price: 24000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '116d N47D20', powerBefore: 116, powerAfter: 190, torqueBefore: 260, torqueAfter: 400, price: 25000 },
          { name: '118d (136 hp)', powerBefore: 136, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 26000 },
          { name: '118d (143 hp)', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 26000 },
          { name: '120d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 28000 },
          { name: '120d (184 hp)', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 28000 }
        ]
      },
      {
        code: 'N47D20',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '125d (211 hp)', powerBefore: 211, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 },
          { name: '125d (218 hp)', powerBefore: 218, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 }
        ]
      }
    ]
  },
  // 1 Series F2x LCI
  {
    name: '1 Series',
    series: 'F2x LCI',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '116i', powerBefore: 109, powerAfter: 170, torqueBefore: 180, torqueAfter: 280, price: 24000 },
          { name: '118i', powerBefore: 136, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 26000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '120i', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 28000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M135i', powerBefore: 326, powerAfter: 380, torqueBefore: 450, torqueAfter: 520, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M140i', powerBefore: 340, powerAfter: 400, torqueBefore: 500, torqueAfter: 580, price: 37000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '114d', powerBefore: 95, powerAfter: 150, torqueBefore: 220, torqueAfter: 330, price: 24000 },
          { name: '116d', powerBefore: 116, powerAfter: 150, torqueBefore: 270, torqueAfter: 330, price: 25000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '118d', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 26000 },
          { name: '120d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 28000 },
          { name: '120d (190 hp)', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 440, price: 28000 },
          { name: '125d (211 hp)', powerBefore: 211, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 },
          { name: '125d (224 hp)', powerBefore: 224, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 }
        ]
      }
    ]
  },
  // 1 Series F4x
  {
    name: '1 Series',
    series: 'F4x',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '118i', powerBefore: 136, powerAfter: 180, torqueBefore: 220, torqueAfter: 280, price: 26000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M135i', powerBefore: 306, powerAfter: 380, torqueBefore: 450, torqueAfter: 570, price: 38000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '116d', powerBefore: 116, powerAfter: 160, torqueBefore: 270, torqueAfter: 340, price: 24000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '118d', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 440, price: 28000 },
          { name: '120d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      }
    ]
  },
  // 2 Series F2x
  {
    name: '2 Series',
    series: 'F2x',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '218i', powerBefore: 136, powerAfter: 180, torqueBefore: 220, torqueAfter: 280, price: 26000 }
        ]
      },
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '220i', powerBefore: 184, powerAfter: 240, torqueBefore: 270, torqueAfter: 360, price: 28000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '220i (B48)', powerBefore: 184, powerAfter: 240, torqueBefore: 270, torqueAfter: 360, price: 28000 },
          { name: '230i', powerBefore: 249, powerAfter: 310, torqueBefore: 350, torqueAfter: 450, price: 32000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '228i', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 450, price: 32000 },
          { name: 'M235i', powerBefore: 326, powerAfter: 400, torqueBefore: 450, torqueAfter: 580, price: 40000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M240i', powerBefore: 340, powerAfter: 420, torqueBefore: 500, torqueAfter: 620, price: 42000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '218d (136 hp)', powerBefore: 136, powerAfter: 190, torqueBefore: 320, torqueAfter: 410, price: 27000 },
          { name: '218d (143 hp)', powerBefore: 143, powerAfter: 195, torqueBefore: 320, torqueAfter: 410, price: 27000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '218d (150 hp)', powerBefore: 150, powerAfter: 200, torqueBefore: 360, torqueAfter: 450, price: 28000 },
          { name: '220d (163 hp)', powerBefore: 163, powerAfter: 210, torqueBefore: 380, torqueAfter: 460, price: 30000 },
          { name: '220d (184 hp)', powerBefore: 184, powerAfter: 235, torqueBefore: 380, torqueAfter: 470, price: 30000 },
          { name: '220d (190 hp)', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 490, price: 30000 },
          { name: '225d (218 hp)', powerBefore: 218, powerAfter: 265, torqueBefore: 450, torqueAfter: 540, price: 32000 },
          { name: '225d (224 hp)', powerBefore: 224, powerAfter: 270, torqueBefore: 450, torqueAfter: 550, price: 32000 }
        ]
      }
    ]
  },
  // 3 Series F3x
  {
    name: '3 Series',
    series: 'F3x',
    generation: 'F',
    engines: [
      {
        code: 'N13',
        type: 'petrol',
        displacement: '1.6',
        modifications: [
          { name: '316i', powerBefore: 136, powerAfter: 180, torqueBefore: 220, torqueAfter: 280, price: 26000 }
        ]
      },
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '320i', powerBefore: 184, powerAfter: 260, torqueBefore: 270, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N20B20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '328i', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 450, price: 35000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '335i', powerBefore: 306, powerAfter: 380, torqueBefore: 400, torqueAfter: 540, price: 40000 }
        ]
      },
      {
        code: 'S55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M3', powerBefore: 431, powerAfter: 550, torqueBefore: 550, torqueAfter: 700, price: 60000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '320d', powerBefore: 184, powerAfter: 230, torqueBefore: 380, torqueAfter: 470, price: 30000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '330d', powerBefore: 258, powerAfter: 320, torqueBefore: 560, torqueAfter: 680, price: 35000 }
        ]
      }
    ]
  },
  // 3 Series F3x LCI
  {
    name: '3 Series',
    series: 'F3x LCI',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '318i (136 hp, 165 Nm)', powerBefore: 136, powerAfter: 180, torqueBefore: 165, torqueAfter: 240, price: 26000 },
          { name: '318i (136 hp, 220 Nm)', powerBefore: 136, powerAfter: 180, torqueBefore: 220, torqueAfter: 280, price: 26000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '320i', powerBefore: 184, powerAfter: 250, torqueBefore: 270, torqueAfter: 360, price: 30000 },
          { name: '330i', powerBefore: 249, powerAfter: 320, torqueBefore: 350, torqueAfter: 460, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '340i', powerBefore: 326, powerAfter: 410, torqueBefore: 450, torqueAfter: 580, price: 40000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '320d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      }
    ]
  },
  // 3 Series G20
  {
    name: '3 Series',
    series: 'G20',
    generation: 'G',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '318i', powerBefore: 156, powerAfter: 200, torqueBefore: 250, torqueAfter: 320, price: 28000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '320i', powerBefore: 184, powerAfter: 280, torqueBefore: 270, torqueAfter: 440, price: 30000 },
          { name: '330i', powerBefore: 258, powerAfter: 330, torqueBefore: 400, torqueAfter: 520, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M340i', powerBefore: 374, powerAfter: 470, torqueBefore: 500, torqueAfter: 660, price: 45000 },
          { name: 'M340i M Special', powerBefore: 387, powerAfter: 480, torqueBefore: 500, torqueAfter: 670, price: 45000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '318d', powerBefore: 150, powerAfter: 230, torqueBefore: 320, torqueAfter: 490, price: 30000 },
          { name: '320d', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '330d', powerBefore: 265, powerAfter: 340, torqueBefore: 580, torqueAfter: 770, price: 35000 },
          { name: 'M340d', powerBefore: 340, powerAfter: 410, torqueBefore: 700, torqueAfter: 850, price: 40000 }
        ]
      }
    ]
  },
  // 5 Series F10
  {
    name: '5 Series',
    series: 'F10',
    generation: 'F',
    engines: [
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '520i', powerBefore: 184, powerAfter: 260, torqueBefore: 270, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '535i', powerBefore: 306, powerAfter: 365, torqueBefore: 400, torqueAfter: 520, price: 40000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '520d', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '530d', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 }
        ]
      }
    ]
  },
  // X3 F25
  {
    name: 'X3',
    series: 'F25',
    generation: 'F',
    engines: [
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'X3 20i', powerBefore: 184, powerAfter: 260, torqueBefore: 270, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'X3 35i', powerBefore: 306, powerAfter: 365, torqueBefore: 400, torqueAfter: 520, price: 40000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'X3 20d', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'X3 35d', powerBefore: 313, powerAfter: 375, torqueBefore: 630, torqueAfter: 730, price: 35000 }
        ]
      }
    ]
  },
  // X5 F15
  {
    name: 'X5',
    series: 'F15',
    generation: 'F',
    engines: [
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'X5 35i', powerBefore: 306, powerAfter: 365, torqueBefore: 400, torqueAfter: 520, price: 40000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'X5 30d', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 },
          { name: 'X5 40d', powerBefore: 313, powerAfter: 375, torqueBefore: 630, torqueAfter: 730, price: 35000 }
        ]
      }
    ]
  },
  // X7 G07
  {
    name: 'X7',
    series: 'G07',
    generation: 'G',
    engines: [
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'X7 40i', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 600, price: 45000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X7 50i', powerBefore: 462, powerAfter: 550, torqueBefore: 650, torqueAfter: 800, price: 55000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'X7 30d', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 40000 },
          { name: 'X7 40d', powerBefore: 340, powerAfter: 400, torqueBefore: 700, torqueAfter: 800, price: 45000 }
        ]
      }
    ]
  }
];

export function getTypeColor(type: 'petrol' | 'diesel'): string {
  return type === 'petrol' ? '#FF0040' : '#00A8E8';
}

export function getGainPercentage(before: number, after: number): number {
  return Math.round(((after - before) / before) * 100);
}
