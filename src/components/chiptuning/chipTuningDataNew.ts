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
  // 1 Series E8x (2004-2013)
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
          { name: '135i N54', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 28000 },
          { name: '1M 3.0i Biturbo', powerBefore: 340, powerAfter: 375, torqueBefore: 500, torqueAfter: 560, price: 28000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '116d', powerBefore: 115, powerAfter: 180, torqueBefore: 260, torqueAfter: 400, price: 28000 },
          { name: '118d (136 hp)', powerBefore: 136, powerAfter: 180, torqueBefore: 300, torqueAfter: 400, price: 28000 },
          { name: '118d (143 hp)', powerBefore: 143, powerAfter: 180, torqueBefore: 300, torqueAfter: 400, price: 28000 },
          { name: '120d (163 hp)', powerBefore: 163, powerAfter: 210, torqueBefore: 350, torqueAfter: 420, price: 28000 },
          { name: '120d (177 hp)', powerBefore: 177, powerAfter: 210, torqueBefore: 350, torqueAfter: 420, price: 28000 }
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
  // 1 Series F2x (2011-2015)
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
          { name: '114i', powerBefore: 102, powerAfter: 225, torqueBefore: 180, torqueAfter: 330, price: 30000 },
          { name: '116i', powerBefore: 136, powerAfter: 225, torqueBefore: 220, torqueAfter: 330, price: 30000 }
        ]
      },
      {
        code: 'N13/B16',
        type: 'petrol',
        displacement: '1.6',
        modifications: [
          { name: '118i', powerBefore: 170, powerAfter: 225, torqueBefore: 250, torqueAfter: 330, price: 30000 }
        ]
      },
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '125i', powerBefore: 218, powerAfter: 260, torqueBefore: 310, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M135i', powerBefore: 320, powerAfter: 365, torqueBefore: 450, torqueAfter: 520, price: 30000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '114d', powerBefore: 95, powerAfter: 150, torqueBefore: 235, torqueAfter: 320, price: 30000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '116d N47D20', powerBefore: 116, powerAfter: 190, torqueBefore: 260, torqueAfter: 400, price: 30000 },
          { name: '118d (136 hp)', powerBefore: 136, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 30000 },
          { name: '118d (143 hp)', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 30000 },
          { name: '120d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '120d (184 hp)', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 }
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
  // 1 Series F2x LCI (2015-2019)
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
          { name: '116i', powerBefore: 109, powerAfter: 170, torqueBefore: 180, torqueAfter: 280, price: 30000 },
          { name: '118i', powerBefore: 136, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 30000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '120i', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 30000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M135i', powerBefore: 326, powerAfter: 380, torqueBefore: 450, torqueAfter: 520, price: 30000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M140i', powerBefore: 340, powerAfter: 400, torqueBefore: 500, torqueAfter: 580, price: 30000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '114d', powerBefore: 95, powerAfter: 150, torqueBefore: 220, torqueAfter: 330, price: 30000 },
          { name: '116d', powerBefore: 116, powerAfter: 150, torqueBefore: 270, torqueAfter: 330, price: 30000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '118d', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 30000 },
          { name: '120d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '120d (190 hp)', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 },
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
          { name: '118i', powerBefore: 136, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 30000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'M135i', powerBefore: 306, powerAfter: 335, torqueBefore: 450, torqueAfter: 500, price: 40000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '116d', powerBefore: 116, powerAfter: 150, torqueBefore: 270, torqueAfter: 330, price: 30000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '118d', powerBefore: 150, powerAfter: 190, torqueBefore: 350, torqueAfter: 400, price: 30000 },
          { name: '120d', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 }
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
  // 2 Series Gran Coupe F44
  {
    name: '2 Series GC',
    series: 'F44',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '218i', powerBefore: 140, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 30000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'M235i', powerBefore: 306, powerAfter: 335, torqueBefore: 450, torqueAfter: 500, price: 40000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '220d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 480, price: 30000 }
        ]
      }
    ]
  },
  // 2 Series G42
  {
    name: '2 Series',
    series: 'G42',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '220i', powerBefore: 184, powerAfter: 280, torqueBefore: 300, torqueAfter: 420, price: 30000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M240i', powerBefore: 374, powerAfter: 420, torqueBefore: 500, torqueAfter: 650, price: 45000 },
          { name: 'M240i M Special', powerBefore: 387, powerAfter: 450, torqueBefore: 500, torqueAfter: 650, price: 45000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '220d', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 }
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
          { name: '316d', powerBefore: 116, powerAfter: 190, torqueBefore: 260, torqueAfter: 400, price: 28000 },
          { name: '318d (136 hp)', powerBefore: 136, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: '318d (143 hp)', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: '320d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '320d (184 hp)', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N47D20',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '325d', powerBefore: 218, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 32000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '330d', powerBefore: 258, powerAfter: 320, torqueBefore: 560, torqueAfter: 680, price: 35000 },
          { name: '335d', powerBefore: 313, powerAfter: 360, torqueBefore: 630, torqueAfter: 700, price: 40000 }
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
          { name: '320i', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 30000 },
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
          { name: '318d', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: '320d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'N47D20',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '325d (211 hp)', powerBefore: 211, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 32000 },
          { name: '325d (218 hp)', powerBefore: 218, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 32000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '335d', powerBefore: 313, powerAfter: 360, torqueBefore: 630, torqueAfter: 700, price: 40000 }
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
        code: 'N20B20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '528i', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 450, price: 35000 }
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
          { name: '518d (136 hp)', powerBefore: 136, powerAfter: 220, torqueBefore: 360, torqueAfter: 440, price: 28000 },
          { name: '518d (143 hp)', powerBefore: 143, powerAfter: 220, torqueBefore: 360, torqueAfter: 440, price: 28000 },
          { name: '518d (150 hp)', powerBefore: 150, powerAfter: 220, torqueBefore: 360, torqueAfter: 440, price: 28000 },
          { name: '520d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '520d (184 hp)', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '520d (190 hp)', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'N47D20',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '525d (204 hp)', powerBefore: 204, powerAfter: 300, torqueBefore: 450, torqueAfter: 620, price: 32000 },
          { name: '525d (211 hp)', powerBefore: 211, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 32000 },
          { name: '525d (218 hp)', powerBefore: 218, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 32000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '530d (245 hp)', powerBefore: 245, powerAfter: 310, torqueBefore: 540, torqueAfter: 650, price: 35000 },
          { name: '530d (258 hp)', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 },
          { name: '535d', powerBefore: 306, powerAfter: 360, torqueBefore: 600, torqueAfter: 700, price: 40000 }
        ]
      }
    ]
  },
  // 5 Series G30
  {
    name: '5 Series',
    series: 'G30',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '520i', powerBefore: 184, powerAfter: 280, torqueBefore: 290, torqueAfter: 440, price: 30000 },
          { name: '530i (249 hp)', powerBefore: 249, powerAfter: 280, torqueBefore: 350, torqueAfter: 440, price: 35000 },
          { name: '530i (252 hp)', powerBefore: 252, powerAfter: 290, torqueBefore: 350, torqueAfter: 460, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '540i', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 600, price: 40000 },
          { name: 'M550i', powerBefore: 530, powerAfter: 680, torqueBefore: 750, torqueAfter: 910, price: 60000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '520d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '530d (249 hp)', powerBefore: 249, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 35000 },
          { name: '530d (265 hp)', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 35000 },
          { name: '530d (286 hp)', powerBefore: 286, powerAfter: 360, torqueBefore: 650, torqueAfter: 800, price: 35000 },
          { name: '540d', powerBefore: 320, powerAfter: 400, torqueBefore: 680, torqueAfter: 820, price: 40000 },
          { name: 'M550d', powerBefore: 400, powerAfter: 460, torqueBefore: 760, torqueAfter: 840, price: 50000 }
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
        code: 'N20B20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'X3 28i', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 450, price: 35000 }
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
          { name: 'X3 18d (136 hp)', powerBefore: 136, powerAfter: 220, torqueBefore: 320, torqueAfter: 440, price: 28000 },
          { name: 'X3 18d (143 hp)', powerBefore: 143, powerAfter: 220, torqueBefore: 320, torqueAfter: 440, price: 28000 },
          { name: 'X3 18d (150 hp)', powerBefore: 150, powerAfter: 220, torqueBefore: 320, torqueAfter: 440, price: 28000 },
          { name: 'X3 20d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: 'X3 20d (184 hp)', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: 'X3 20d (190 hp)', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'X3 30d (211 hp)', powerBefore: 211, powerAfter: 300, torqueBefore: 500, torqueAfter: 620, price: 35000 },
          { name: 'X3 30d (245 hp)', powerBefore: 245, powerAfter: 300, torqueBefore: 540, torqueAfter: 620, price: 35000 },
          { name: 'X3 30d (249 hp)', powerBefore: 249, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 },
          { name: 'X3 30d (258 hp)', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 },
          { name: 'X3 35d', powerBefore: 313, powerAfter: 375, torqueBefore: 630, torqueAfter: 730, price: 40000 }
        ]
      }
    ]
  },
  // X3 G01
  {
    name: 'X3',
    series: 'G01',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '20i', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 30000 },
          { name: '30i', powerBefore: 249, powerAfter: 270, torqueBefore: 350, torqueAfter: 420, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M40i (360 hp)', powerBefore: 360, powerAfter: 450, torqueBefore: 500, torqueAfter: 650, price: 45000 },
          { name: 'M40i (387 hp)', powerBefore: 387, powerAfter: 450, torqueBefore: 500, torqueAfter: 650, price: 45000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '20d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '30d (249 hp)', powerBefore: 249, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 35000 },
          { name: '30d (265 hp)', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 35000 },
          { name: '30d (286 hp)', powerBefore: 286, powerAfter: 360, torqueBefore: 650, torqueAfter: 800, price: 35000 },
          { name: 'M40d (326 hp)', powerBefore: 326, powerAfter: 400, torqueBefore: 680, torqueAfter: 820, price: 40000 },
          { name: 'M40d (340 hp)', powerBefore: 340, powerAfter: 420, torqueBefore: 700, torqueAfter: 820, price: 40000 }
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
        code: 'N47D20',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '25d (218 hp)', powerBefore: 218, powerAfter: 310, torqueBefore: 500, torqueAfter: 650, price: 32000 },
          { name: '25d (231 hp)', powerBefore: 231, powerAfter: 270, torqueBefore: 500, torqueAfter: 550, price: 32000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'X5 30d (249 hp)', powerBefore: 249, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 },
          { name: 'X5 30d (258 hp)', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 },
          { name: 'X5 40d', powerBefore: 313, powerAfter: 375, torqueBefore: 630, torqueAfter: 730, price: 40000 },
          { name: 'X5 50d', powerBefore: 381, powerAfter: 420, torqueBefore: 740, torqueAfter: 800, price: 50000 }
        ]
      }
    ]
  },
  // X5 G05
  {
    name: 'X5',
    series: 'G05',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '40i (340 hp)', powerBefore: 340, powerAfter: 450, torqueBefore: 450, torqueAfter: 650, price: 40000 },
          { name: '40i (381 hp)', powerBefore: 381, powerAfter: 440, torqueBefore: 540, torqueAfter: 640, price: 45000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M50i', powerBefore: 530, powerAfter: 680, torqueBefore: 750, torqueAfter: 900, price: 60000 },
          { name: 'M60i', powerBefore: 530, powerAfter: 650, torqueBefore: 750, torqueAfter: 880, price: 65000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '25d', powerBefore: 231, powerAfter: 275, torqueBefore: 500, torqueAfter: 580, price: 32000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '30d (249 hp)', powerBefore: 249, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 35000 },
          { name: '30d (265 hp)', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 35000 },
          { name: '30d (286 hp)', powerBefore: 286, powerAfter: 360, torqueBefore: 650, torqueAfter: 800, price: 35000 },
          { name: '30d (298 hp)', powerBefore: 298, powerAfter: 370, torqueBefore: 670, torqueAfter: 820, price: 38000 },
          { name: '40d (340 hp)', powerBefore: 340, powerAfter: 420, torqueBefore: 700, torqueAfter: 840, price: 40000 },
          { name: 'M50d', powerBefore: 400, powerAfter: 460, torqueBefore: 760, torqueAfter: 840, price: 50000 }
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
          { name: 'X7 40i (340 hp)', powerBefore: 340, powerAfter: 450, torqueBefore: 450, torqueAfter: 650, price: 45000 },
          { name: 'X7 40i (380 hp)', powerBefore: 380, powerAfter: 450, torqueBefore: 520, torqueAfter: 650, price: 45000 },
          { name: 'M50i', powerBefore: 530, powerAfter: 680, torqueBefore: 750, torqueAfter: 900, price: 60000 },
          { name: '60i', powerBefore: 530, powerAfter: 670, torqueBefore: 750, torqueAfter: 880, price: 65000 }
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
          { name: 'X7 30d (заводская)', powerBefore: 249, powerAfter: 265, torqueBefore: 620, torqueAfter: 620, price: 25000 },
          { name: 'X7 30d', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 40000 },
          { name: 'X7 40d (340 hp)', powerBefore: 340, powerAfter: 440, torqueBefore: 700, torqueAfter: 840, price: 45000 },
          { name: 'M50d', powerBefore: 400, powerAfter: 460, torqueBefore: 760, torqueAfter: 840, price: 50000 }
        ]
      }
    ]
  },
  // 4 Series F32/F33
  {
    name: '4 Series',
    series: 'F3x',
    generation: 'F',
    engines: [
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '420i', powerBefore: 184, powerAfter: 260, torqueBefore: 270, torqueAfter: 440, price: 30000 },
          { name: '428i', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 450, price: 35000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '420i (B48)', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 30000 },
          { name: '430i', powerBefore: 249, powerAfter: 320, torqueBefore: 350, torqueAfter: 460, price: 35000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '435i', powerBefore: 306, powerAfter: 380, torqueBefore: 400, torqueAfter: 540, price: 40000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '440i', powerBefore: 326, powerAfter: 410, torqueBefore: 450, torqueAfter: 580, price: 40000 }
        ]
      },
      {
        code: 'S55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M4', powerBefore: 431, powerAfter: 550, torqueBefore: 550, torqueAfter: 700, price: 60000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '418d (143 hp)', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: '420d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '420d (184 hp)', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '418d (150 hp)', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: '420d (190 hp)', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'N47D20',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '425d', powerBefore: 218, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 32000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '430d', powerBefore: 258, powerAfter: 320, torqueBefore: 560, torqueAfter: 680, price: 35000 },
          { name: '435d', powerBefore: 313, powerAfter: 360, torqueBefore: 630, torqueAfter: 700, price: 40000 }
        ]
      }
    ]
  },
  // 4 Series G22/G23
  {
    name: '4 Series',
    series: 'G2x',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '420i', powerBefore: 184, powerAfter: 280, torqueBefore: 300, torqueAfter: 420, price: 30000 },
          { name: '430i', powerBefore: 258, powerAfter: 330, torqueBefore: 400, torqueAfter: 520, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M440i (374 hp)', powerBefore: 374, powerAfter: 470, torqueBefore: 500, torqueAfter: 660, price: 45000 },
          { name: 'M440i (387 hp)', powerBefore: 387, powerAfter: 480, torqueBefore: 500, torqueAfter: 670, price: 45000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '420d', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '430d', powerBefore: 286, powerAfter: 360, torqueBefore: 650, torqueAfter: 800, price: 35000 }
        ]
      }
    ]
  },
  // X1 E84
  {
    name: 'X1',
    series: 'E84',
    generation: 'F',
    engines: [
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '20i', powerBefore: 184, powerAfter: 260, torqueBefore: 270, torqueAfter: 440, price: 28000 },
          { name: '28i', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 450, price: 32000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '16d', powerBefore: 116, powerAfter: 190, torqueBefore: 260, torqueAfter: 400, price: 26000 },
          { name: '18d (143 hp)', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: '20d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 28000 },
          { name: '20d (184 hp)', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 28000 }
        ]
      },
      {
        code: 'N47D20',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '25d', powerBefore: 218, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 }
        ]
      }
    ]
  },
  // X1 F48
  {
    name: 'X1',
    series: 'F48',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '18i', powerBefore: 140, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 26000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '20i', powerBefore: 192, powerAfter: 270, torqueBefore: 280, torqueAfter: 420, price: 28000 },
          { name: '25i', powerBefore: 231, powerAfter: 280, torqueBefore: 350, torqueAfter: 430, price: 30000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '16d', powerBefore: 116, powerAfter: 150, torqueBefore: 270, torqueAfter: 330, price: 26000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '18d', powerBefore: 150, powerAfter: 190, torqueBefore: 350, torqueAfter: 400, price: 28000 },
          { name: '20d (190 hp)', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 28000 },
          { name: '25d', powerBefore: 231, powerAfter: 275, torqueBefore: 450, torqueAfter: 540, price: 30000 }
        ]
      }
    ]
  },
  // X2 F39
  {
    name: 'X2',
    series: 'F39',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '18i', powerBefore: 140, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 26000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '20i', powerBefore: 192, powerAfter: 270, torqueBefore: 280, torqueAfter: 420, price: 28000 },
          { name: 'M35i', powerBefore: 306, powerAfter: 335, torqueBefore: 450, torqueAfter: 500, price: 40000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '18d', powerBefore: 150, powerAfter: 190, torqueBefore: 350, torqueAfter: 400, price: 28000 },
          { name: '20d', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 28000 },
          { name: '25d', powerBefore: 231, powerAfter: 275, torqueBefore: 450, torqueAfter: 540, price: 30000 }
        ]
      }
    ]
  },
  // X4 F26
  {
    name: 'X4',
    series: 'F26',
    generation: 'F',
    engines: [
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '20i', powerBefore: 184, powerAfter: 260, torqueBefore: 270, torqueAfter: 440, price: 30000 },
          { name: '28i', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 450, price: 35000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '35i', powerBefore: 306, powerAfter: 365, torqueBefore: 400, torqueAfter: 520, price: 40000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '20d (163 hp)', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '20d (190 hp)', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '30d', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 },
          { name: '35d', powerBefore: 313, powerAfter: 375, torqueBefore: 630, torqueAfter: 730, price: 40000 }
        ]
      }
    ]
  },
  // X4 G02
  {
    name: 'X4',
    series: 'G02',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '20i', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 30000 },
          { name: '30i (заводская)', powerBefore: 245, powerAfter: 249, torqueBefore: 350, torqueAfter: 350, price: 20000 },
          { name: '30i (Stage 1)', powerBefore: 249, powerAfter: 270, torqueBefore: 350, torqueAfter: 420, price: 35000 },
          { name: '30i (Stage 1.5)', powerBefore: 249, powerAfter: 300, torqueBefore: 350, torqueAfter: 450, price: 45000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M40i (360 hp)', powerBefore: 360, powerAfter: 450, torqueBefore: 500, torqueAfter: 650, price: 45000 },
          { name: 'M40i (387 hp)', powerBefore: 387, powerAfter: 450, torqueBefore: 500, torqueAfter: 650, price: 45000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '20d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 490, price: 30000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '30d (265 hp)', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 35000 },
          { name: 'M40d', powerBefore: 326, powerAfter: 400, torqueBefore: 680, torqueAfter: 820, price: 40000 }
        ]
      }
    ]
  },
  // X6 E71
  {
    name: 'X6',
    series: 'E71',
    generation: 'F',
    engines: [
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '35i', powerBefore: 306, powerAfter: 365, torqueBefore: 400, torqueAfter: 520, price: 40000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '30d', powerBefore: 245, powerAfter: 310, torqueBefore: 540, torqueAfter: 650, price: 35000 },
          { name: '35d', powerBefore: 286, powerAfter: 340, torqueBefore: 580, torqueAfter: 690, price: 38000 },
          { name: '40d', powerBefore: 306, powerAfter: 360, torqueBefore: 600, torqueAfter: 700, price: 40000 }
        ]
      }
    ]
  },
  // X6 F16
  {
    name: 'X6',
    series: 'F16',
    generation: 'F',
    engines: [
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '35i', powerBefore: 306, powerAfter: 365, torqueBefore: 400, torqueAfter: 520, price: 40000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '40i', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 600, price: 40000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '50i', powerBefore: 450, powerAfter: 550, torqueBefore: 650, torqueAfter: 800, price: 55000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '30d', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 35000 },
          { name: '40d', powerBefore: 313, powerAfter: 375, torqueBefore: 630, torqueAfter: 730, price: 40000 }
        ]
      }
    ]
  },
  // X6 G06
  {
    name: 'X6',
    series: 'G06',
    generation: 'G',
    engines: [
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '40i', powerBefore: 340, powerAfter: 450, torqueBefore: 450, torqueAfter: 650, price: 45000 },
          { name: 'M50i', powerBefore: 530, powerAfter: 680, torqueBefore: 750, torqueAfter: 900, price: 60000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '50i', powerBefore: 462, powerAfter: 550, torqueBefore: 650, torqueAfter: 800, price: 55000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '30d (265 hp)', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 40000 },
          { name: '40d', powerBefore: 340, powerAfter: 440, torqueBefore: 700, torqueAfter: 840, price: 45000 },
          { name: 'M50d', powerBefore: 400, powerAfter: 460, torqueBefore: 760, torqueAfter: 840, price: 50000 }
        ]
      }
    ]
  },
  // Z4 G29
  {
    name: 'Z4',
    series: 'G29',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '20i', powerBefore: 197, powerAfter: 280, torqueBefore: 320, torqueAfter: 440, price: 30000 },
          { name: '30i', powerBefore: 258, powerAfter: 330, torqueBefore: 400, torqueAfter: 520, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M40i', powerBefore: 340, powerAfter: 420, torqueBefore: 500, torqueAfter: 620, price: 45000 }
        ]
      }
    ]
  },
  // 6 Series F12/F13
  {
    name: '6 Series',
    series: 'F1x',
    generation: 'F',
    engines: [
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '640i', powerBefore: 320, powerAfter: 380, torqueBefore: 450, torqueAfter: 540, price: 40000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '650i', powerBefore: 450, powerAfter: 550, torqueBefore: 650, torqueAfter: 800, price: 55000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '640d', powerBefore: 313, powerAfter: 375, torqueBefore: 630, torqueAfter: 730, price: 40000 }
        ]
      }
    ]
  },
  // 6 Series G32 Gran Turismo
  {
    name: '6 Series GT',
    series: 'G32',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '630i', powerBefore: 258, powerAfter: 330, torqueBefore: 400, torqueAfter: 520, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '640i', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 600, price: 45000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '630d', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 40000 },
          { name: '640d', powerBefore: 320, powerAfter: 400, torqueBefore: 680, torqueAfter: 820, price: 45000 }
        ]
      }
    ]
  },
  // 7 Series F01/F02
  {
    name: '7 Series',
    series: 'F0x',
    generation: 'F',
    engines: [
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '740i', powerBefore: 326, powerAfter: 380, torqueBefore: 450, torqueAfter: 540, price: 45000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '750i', powerBefore: 450, powerAfter: 550, torqueBefore: 650, torqueAfter: 800, price: 60000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '730d (245 hp)', powerBefore: 245, powerAfter: 310, torqueBefore: 540, torqueAfter: 650, price: 40000 },
          { name: '730d (258 hp)', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 40000 },
          { name: '740d', powerBefore: 313, powerAfter: 375, torqueBefore: 630, torqueAfter: 730, price: 45000 },
          { name: '750d', powerBefore: 381, powerAfter: 430, torqueBefore: 740, torqueAfter: 820, price: 55000 }
        ]
      }
    ]
  },
  // 7 Series G11/G12
  {
    name: '7 Series',
    series: 'G1x',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '730i', powerBefore: 258, powerAfter: 330, torqueBefore: 400, torqueAfter: 520, price: 40000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '740i', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 600, price: 45000 },
          { name: 'M760i', powerBefore: 585, powerAfter: 700, torqueBefore: 850, torqueAfter: 1000, price: 80000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '750i', powerBefore: 450, powerAfter: 550, torqueBefore: 650, torqueAfter: 800, price: 60000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '730d', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 770, price: 40000 },
          { name: '740d', powerBefore: 320, powerAfter: 400, torqueBefore: 680, torqueAfter: 820, price: 45000 },
          { name: 'M750d', powerBefore: 400, powerAfter: 460, torqueBefore: 760, torqueAfter: 840, price: 55000 }
        ]
      }
    ]
  },
  // 7 Series G70
  {
    name: '7 Series',
    series: 'G70',
    generation: 'G',
    engines: [
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '740i', powerBefore: 380, powerAfter: 470, torqueBefore: 540, torqueAfter: 660, price: 50000 },
          { name: 'M760i', powerBefore: 544, powerAfter: 650, torqueBefore: 750, torqueAfter: 880, price: 80000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '740d', powerBefore: 300, powerAfter: 380, torqueBefore: 670, torqueAfter: 820, price: 45000 }
        ]
      }
    ]
  },
  // 8 Series G14/G15
  {
    name: '8 Series',
    series: 'G1x',
    generation: 'G',
    engines: [
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '840i', powerBefore: 340, powerAfter: 420, torqueBefore: 500, torqueAfter: 620, price: 50000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '850i', powerBefore: 530, powerAfter: 650, torqueBefore: 750, torqueAfter: 900, price: 65000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '840d', powerBefore: 320, powerAfter: 400, torqueBefore: 680, torqueAfter: 820, price: 45000 }
        ]
      }
    ]
  },
  // M2 F87
  {
    name: 'M2',
    series: 'F87',
    generation: 'F',
    engines: [
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M2', powerBefore: 370, powerAfter: 430, torqueBefore: 465, torqueAfter: 560, price: 50000 }
        ]
      },
      {
        code: 'S55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M2 Competition', powerBefore: 410, powerAfter: 520, torqueBefore: 550, torqueAfter: 680, price: 60000 }
        ]
      }
    ]
  },
  // M2 G87
  {
    name: 'M2',
    series: 'G87',
    generation: 'G',
    engines: [
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M2', powerBefore: 460, powerAfter: 580, torqueBefore: 550, torqueAfter: 750, price: 65000 }
        ]
      }
    ]
  },
  // M3 G80
  {
    name: 'M3',
    series: 'G80',
    generation: 'G',
    engines: [
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M3 (480 hp)', powerBefore: 480, powerAfter: 600, torqueBefore: 550, torqueAfter: 780, price: 70000 },
          { name: 'M3 Competition', powerBefore: 510, powerAfter: 630, torqueBefore: 650, torqueAfter: 850, price: 75000 }
        ]
      }
    ]
  },
  // M4 G82
  {
    name: 'M4',
    series: 'G82',
    generation: 'G',
    engines: [
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M4 (480 hp)', powerBefore: 480, powerAfter: 600, torqueBefore: 550, torqueAfter: 780, price: 70000 },
          { name: 'M4 Competition', powerBefore: 510, powerAfter: 630, torqueBefore: 650, torqueAfter: 850, price: 75000 }
        ]
      }
    ]
  },
  // M5 F10
  {
    name: 'M5',
    series: 'F10',
    generation: 'F',
    engines: [
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'M5 (560 hp)', powerBefore: 560, powerAfter: 680, torqueBefore: 680, torqueAfter: 850, price: 75000 },
          { name: 'M5 Competition', powerBefore: 575, powerAfter: 700, torqueBefore: 750, torqueAfter: 900, price: 80000 }
        ]
      }
    ]
  },
  // M5 F90
  {
    name: 'M5',
    series: 'F90',
    generation: 'F',
    engines: [
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'M5', powerBefore: 600, powerAfter: 750, torqueBefore: 750, torqueAfter: 950, price: 80000 },
          { name: 'M5 Competition', powerBefore: 625, powerAfter: 780, torqueBefore: 750, torqueAfter: 970, price: 85000 }
        ]
      }
    ]
  },
  // M8 G15
  {
    name: 'M8',
    series: 'G15',
    generation: 'G',
    engines: [
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'M8', powerBefore: 600, powerAfter: 750, torqueBefore: 750, torqueAfter: 950, price: 85000 },
          { name: 'M8 Competition', powerBefore: 625, powerAfter: 780, torqueBefore: 750, torqueAfter: 970, price: 90000 }
        ]
      }
    ]
  },
  // X3M F97
  {
    name: 'X3M',
    series: 'F97',
    generation: 'F',
    engines: [
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'X3M', powerBefore: 480, powerAfter: 600, torqueBefore: 600, torqueAfter: 780, price: 70000 },
          { name: 'X3M Competition', powerBefore: 510, powerAfter: 630, torqueBefore: 600, torqueAfter: 850, price: 75000 }
        ]
      }
    ]
  },
  // X4M F98
  {
    name: 'X4M',
    series: 'F98',
    generation: 'F',
    engines: [
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'X4M', powerBefore: 480, powerAfter: 600, torqueBefore: 600, torqueAfter: 780, price: 70000 },
          { name: 'X4M Competition', powerBefore: 510, powerAfter: 630, torqueBefore: 600, torqueAfter: 850, price: 75000 }
        ]
      }
    ]
  },
  // X5M F85
  {
    name: 'X5M',
    series: 'F85',
    generation: 'F',
    engines: [
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X5M', powerBefore: 575, powerAfter: 700, torqueBefore: 750, torqueAfter: 900, price: 80000 }
        ]
      }
    ]
  },
  // X5M F95
  {
    name: 'X5M',
    series: 'F95',
    generation: 'F',
    engines: [
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X5M', powerBefore: 600, powerAfter: 750, torqueBefore: 750, torqueAfter: 950, price: 85000 },
          { name: 'X5M Competition', powerBefore: 625, powerAfter: 780, torqueBefore: 750, torqueAfter: 970, price: 90000 }
        ]
      }
    ]
  },
  // X6M F86
  {
    name: 'X6M',
    series: 'F86',
    generation: 'F',
    engines: [
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X6M', powerBefore: 575, powerAfter: 700, torqueBefore: 750, torqueAfter: 900, price: 80000 }
        ]
      }
    ]
  },
  // X6M F96
  {
    name: 'X6M',
    series: 'F96',
    generation: 'F',
    engines: [
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X6M', powerBefore: 600, powerAfter: 750, torqueBefore: 750, torqueAfter: 950, price: 85000 },
          { name: 'X6M Competition', powerBefore: 625, powerAfter: 780, torqueBefore: 750, torqueAfter: 970, price: 90000 }
        ]
      }
    ]
  },
  // XM G09
  {
    name: 'XM',
    series: 'G09',
    generation: 'G',
    engines: [
      {
        code: 'S68',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'XM', powerBefore: 653, powerAfter: 780, torqueBefore: 800, torqueAfter: 1000, price: 95000 },
          { name: 'XM Label Red', powerBefore: 748, powerAfter: 850, torqueBefore: 1000, torqueAfter: 1150, price: 110000 }
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