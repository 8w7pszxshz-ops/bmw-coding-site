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
          { name: '135i N54 Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 28000 },
          { name: '1M 3.0i Biturbo Stage 1', powerBefore: 340, powerAfter: 375, torqueBefore: 500, torqueAfter: 560, price: 28000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '116d Stage 1', powerBefore: 115, powerAfter: 180, torqueBefore: 260, torqueAfter: 400, price: 28000 },
          { name: '118d (136 hp) Stage 1', powerBefore: 136, powerAfter: 180, torqueBefore: 300, torqueAfter: 400, price: 28000 },
          { name: '118d (143 hp) Stage 1', powerBefore: 143, powerAfter: 180, torqueBefore: 300, torqueAfter: 400, price: 28000 },
          { name: '120d (163 hp) Stage 1', powerBefore: 163, powerAfter: 210, torqueBefore: 350, torqueAfter: 420, price: 28000 },
          { name: '120d (177 hp) Stage 1', powerBefore: 177, powerAfter: 210, torqueBefore: 350, torqueAfter: 420, price: 28000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '123d Stage 1', powerBefore: 204, powerAfter: 245, torqueBefore: 400, torqueAfter: 450, price: 28000 }
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
          { name: '114i Stage 1', powerBefore: 102, powerAfter: 225, torqueBefore: 180, torqueAfter: 330, price: 30000 },
          { name: '116i Stage 1', powerBefore: 136, powerAfter: 225, torqueBefore: 220, torqueAfter: 330, price: 30000 }
        ]
      },
      {
        code: 'N13/B16',
        type: 'petrol',
        displacement: '1.6',
        modifications: [
          { name: '118i Stage 1', powerBefore: 170, powerAfter: 225, torqueBefore: 250, torqueAfter: 330, price: 30000 }
        ]
      },
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '125i Stage 1', powerBefore: 218, powerAfter: 260, torqueBefore: 310, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M135i Stage 1', powerBefore: 320, powerAfter: 365, torqueBefore: 450, torqueAfter: 520, price: 30000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '114d Stage 1', powerBefore: 95, powerAfter: 150, torqueBefore: 235, torqueAfter: 320, price: 30000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '116d N47D20 Stage 1', powerBefore: 116, powerAfter: 190, torqueBefore: 260, torqueAfter: 400, price: 30000 },
          { name: '118d (136 hp) Stage 1', powerBefore: 136, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 30000 },
          { name: '118d (143 hp) Stage 1', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 30000 },
          { name: '120d (163 hp) Stage 1', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '120d (184 hp) Stage 1', powerBefore: 184, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 }
        ]
      },
      {
        code: 'N47D20',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '125d (211 hp) Stage 1', powerBefore: 211, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 },
          { name: '125d (218 hp) Stage 1', powerBefore: 218, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 }
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
          { name: '116i Stage 1', powerBefore: 109, powerAfter: 170, torqueBefore: 180, torqueAfter: 280, price: 30000 },
          { name: '118i Stage 1', powerBefore: 136, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 30000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '120i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 30000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M135i Stage 1', powerBefore: 326, powerAfter: 380, torqueBefore: 450, torqueAfter: 520, price: 30000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M140i Stage 1', powerBefore: 340, powerAfter: 400, torqueBefore: 500, torqueAfter: 580, price: 30000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '114d Stage 1', powerBefore: 95, powerAfter: 150, torqueBefore: 220, torqueAfter: 330, price: 30000 },
          { name: '116d Stage 1', powerBefore: 116, powerAfter: 150, torqueBefore: 270, torqueAfter: 330, price: 30000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '118d Stage 1', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 30000 },
          { name: '120d (163 hp) Stage 1', powerBefore: 163, powerAfter: 220, torqueBefore: 380, torqueAfter: 440, price: 30000 },
          { name: '120d (190 hp) Stage 1', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 },
          { name: '125d (211 hp) Stage 1', powerBefore: 211, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 },
          { name: '125d (224 hp) Stage 1', powerBefore: 224, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 30000 }
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
          { name: '118i Stage 1', powerBefore: 136, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 30000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'M135i Stage 1', powerBefore: 306, powerAfter: 335, torqueBefore: 450, torqueAfter: 500, price: 40000 }
        ]
      },
      {
        code: 'B37',
        type: 'diesel',
        displacement: '1.5',
        modifications: [
          { name: '116d Stage 1', powerBefore: 116, powerAfter: 150, torqueBefore: 270, torqueAfter: 330, price: 30000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '118d Stage 1', powerBefore: 150, powerAfter: 190, torqueBefore: 350, torqueAfter: 400, price: 30000 },
          { name: '120d Stage 1', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 30000 }
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
          { name: '218i Stage 1', powerBefore: 136, powerAfter: 180, torqueBefore: 220, torqueAfter: 280, price: 26000 }
        ]
      },
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '228i Stage 1', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 430, price: 26000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M235i Stage 1', powerBefore: 326, powerAfter: 380, torqueBefore: 450, torqueAfter: 520, price: 26000 },
          { name: 'M2 Competition Stage 1', powerBefore: 410, powerAfter: 480, torqueBefore: 550, torqueAfter: 650, price: 28000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '218d Stage 1', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 26000 },
          { name: '220d Stage 1', powerBefore: 190, powerAfter: 230, torqueBefore: 400, torqueAfter: 490, price: 26000 },
          { name: '225d Stage 1', powerBefore: 224, powerAfter: 270, torqueBefore: 450, torqueAfter: 500, price: 26000 }
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
          { name: '220i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 300, torqueAfter: 420, price: 30000 },
          { name: '230i Stage 1', powerBefore: 245, powerAfter: 330, torqueBefore: 400, torqueAfter: 480, price: 30000 },
          { name: 'M240i Stage 1', powerBefore: 374, powerAfter: 430, torqueBefore: 500, torqueAfter: 600, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M2 Stage 1', powerBefore: 460, powerAfter: 520, torqueBefore: 550, torqueAfter: 650, price: 40000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '218d Stage 1', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 430, price: 30000 },
          { name: '220d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 30000 }
        ]
      }
    ]
  },
  // 3 Series F30
  {
    name: '3 Series',
    series: 'F30',
    generation: 'F',
    engines: [
      {
        code: 'B38',
        type: 'petrol',
        displacement: '1.5',
        modifications: [
          { name: '318i Stage 1', powerBefore: 136, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 28000 }
        ]
      },
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '320i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 28000 },
          { name: '328i Stage 1', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 430, price: 28000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '330i Stage 1', powerBefore: 252, powerAfter: 330, torqueBefore: 350, torqueAfter: 480, price: 28000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '335i Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 28000 },
          { name: '340i Stage 1', powerBefore: 326, powerAfter: 400, torqueBefore: 450, torqueAfter: 550, price: 28000 }
        ]
      },
      {
        code: 'S55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M3 Stage 1', powerBefore: 431, powerAfter: 530, torqueBefore: 550, torqueAfter: 680, price: 35000 },
          { name: 'M3 Competition Stage 1', powerBefore: 450, powerAfter: 550, torqueBefore: 550, torqueAfter: 680, price: 35000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '318d Stage 1', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: '320d Stage 1', powerBefore: 184, powerAfter: 240, torqueBefore: 380, torqueAfter: 480, price: 28000 },
          { name: '325d Stage 1', powerBefore: 218, powerAfter: 270, torqueBefore: 450, torqueAfter: 530, price: 28000 },
          { name: '330d Stage 1', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 28000 }
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
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '318i Stage 1', powerBefore: 156, powerAfter: 230, torqueBefore: 250, torqueAfter: 380, price: 30000 },
          { name: '320i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 300, torqueAfter: 420, price: 30000 },
          { name: '330i (заводская)', powerBefore: 252, powerAfter: 258, torqueBefore: 400, torqueAfter: 400, price: 20000 },
          { name: '330i Stage 1', powerBefore: 258, powerAfter: 350, torqueBefore: 400, torqueAfter: 510, price: 30000 },
          { name: 'M340i Stage 1', powerBefore: 374, powerAfter: 430, torqueBefore: 500, torqueAfter: 600, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M340i xDrive Stage 1', powerBefore: 387, powerAfter: 450, torqueBefore: 500, torqueAfter: 600, price: 35000 }
        ]
      },
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M3 Stage 1', powerBefore: 480, powerAfter: 600, torqueBefore: 550, torqueAfter: 750, price: 40000 },
          { name: 'M3 Competition Stage 1', powerBefore: 510, powerAfter: 630, torqueBefore: 650, torqueAfter: 800, price: 40000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '318d Stage 1', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 430, price: 30000 },
          { name: '320d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 30000 },
          { name: '330d Stage 1', powerBefore: 286, powerAfter: 350, torqueBefore: 650, torqueAfter: 750, price: 30000 }
        ]
      }
    ]
  },
  // 4 Series F3x
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
          { name: '420i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 28000 },
          { name: '428i Stage 1', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 430, price: 28000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '430i Stage 1', powerBefore: 252, powerAfter: 330, torqueBefore: 350, torqueAfter: 480, price: 28000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '435i Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 28000 },
          { name: '440i Stage 1', powerBefore: 326, powerAfter: 400, torqueBefore: 450, torqueAfter: 550, price: 28000 }
        ]
      },
      {
        code: 'S55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M4 Stage 1', powerBefore: 431, powerAfter: 530, torqueBefore: 550, torqueAfter: 680, price: 35000 },
          { name: 'M4 Competition Stage 1', powerBefore: 450, powerAfter: 550, torqueBefore: 550, torqueAfter: 680, price: 35000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '418d Stage 1', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: '420d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 28000 },
          { name: '425d Stage 1', powerBefore: 224, powerAfter: 280, torqueBefore: 450, torqueAfter: 540, price: 28000 },
          { name: '430d Stage 1', powerBefore: 258, powerAfter: 310, torqueBefore: 560, torqueAfter: 650, price: 28000 }
        ]
      }
    ]
  },
  // 4 Series G2x
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
          { name: '420i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 300, torqueAfter: 420, price: 30000 },
          { name: '430i Stage 1', powerBefore: 245, powerAfter: 330, torqueBefore: 400, torqueAfter: 480, price: 30000 },
          { name: 'M440i Stage 1', powerBefore: 374, powerAfter: 430, torqueBefore: 500, torqueAfter: 600, price: 35000 }
        ]
      },
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M4 Stage 1', powerBefore: 480, powerAfter: 600, torqueBefore: 550, torqueAfter: 750, price: 40000 },
          { name: 'M4 Competition Stage 1', powerBefore: 510, powerAfter: 630, torqueBefore: 650, torqueAfter: 800, price: 40000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '420d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 30000 },
          { name: '430d Stage 1', powerBefore: 286, powerAfter: 350, torqueBefore: 650, torqueAfter: 750, price: 30000 }
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
          { name: '520i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 32000 },
          { name: '528i Stage 1', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 430, price: 32000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '530i Stage 1', powerBefore: 252, powerAfter: 330, torqueBefore: 350, torqueAfter: 480, price: 32000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '535i Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 32000 },
          { name: '540i Stage 1', powerBefore: 340, powerAfter: 410, torqueBefore: 450, torqueAfter: 570, price: 32000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '550i Stage 1', powerBefore: 449, powerAfter: 550, torqueBefore: 650, torqueAfter: 780, price: 38000 }
        ]
      },
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'M5 Stage 1', powerBefore: 560, powerAfter: 680, torqueBefore: 680, torqueAfter: 850, price: 42000 },
          { name: 'M5 Competition Stage 1', powerBefore: 575, powerAfter: 700, torqueBefore: 750, torqueAfter: 900, price: 42000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '518d Stage 1', powerBefore: 150, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 32000 },
          { name: '520d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 32000 },
          { name: '525d Stage 1', powerBefore: 218, powerAfter: 280, torqueBefore: 450, torqueAfter: 540, price: 32000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '530d Stage 1', powerBefore: 258, powerAfter: 330, torqueBefore: 560, torqueAfter: 680, price: 32000 },
          { name: '535d Stage 1', powerBefore: 313, powerAfter: 380, torqueBefore: 630, torqueAfter: 750, price: 32000 }
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
          { name: '520i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 290, torqueAfter: 420, price: 35000 },
          { name: '530i Stage 1', powerBefore: 252, powerAfter: 350, torqueBefore: 350, torqueAfter: 510, price: 35000 },
          { name: 'M550i Stage 1', powerBefore: 530, powerAfter: 620, torqueBefore: 750, torqueAfter: 870, price: 40000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '540i Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 580, price: 35000 }
        ]
      },
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'M5 Stage 1', powerBefore: 600, powerAfter: 750, torqueBefore: 750, torqueAfter: 950, price: 45000 },
          { name: 'M5 Competition Stage 1', powerBefore: 625, powerAfter: 780, torqueBefore: 750, torqueAfter: 950, price: 45000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: '520d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 35000 },
          { name: '530d Stage 1', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 740, price: 35000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '540d Stage 1', powerBefore: 320, powerAfter: 400, torqueBefore: 680, torqueAfter: 830, price: 35000 },
          { name: 'M550d Stage 1', powerBefore: 400, powerAfter: 480, torqueBefore: 760, torqueAfter: 920, price: 38000 }
        ]
      }
    ]
  },
  // 6 Series F1x
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
          { name: '640i Stage 1', powerBefore: 320, powerAfter: 390, torqueBefore: 450, torqueAfter: 540, price: 34000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '650i Stage 1', powerBefore: 449, powerAfter: 550, torqueBefore: 650, torqueAfter: 780, price: 40000 }
        ]
      },
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'M6 Stage 1', powerBefore: 560, powerAfter: 680, torqueBefore: 680, torqueAfter: 850, price: 42000 },
          { name: 'M6 Competition Stage 1', powerBefore: 575, powerAfter: 700, torqueBefore: 750, torqueAfter: 900, price: 42000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '640d Stage 1', powerBefore: 313, powerAfter: 380, torqueBefore: 630, torqueAfter: 750, price: 34000 }
        ]
      }
    ]
  },
  // 7 Series F01
  {
    name: '7 Series',
    series: 'F01',
    generation: 'F',
    engines: [
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '740i Stage 1', powerBefore: 326, powerAfter: 400, torqueBefore: 450, torqueAfter: 550, price: 36000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '750i Stage 1', powerBefore: 449, powerAfter: 550, torqueBefore: 650, torqueAfter: 780, price: 42000 },
          { name: '750i xDrive Stage 1', powerBefore: 449, powerAfter: 550, torqueBefore: 650, torqueAfter: 780, price: 42000 }
        ]
      },
      {
        code: 'N74',
        type: 'petrol',
        displacement: '6.0',
        modifications: [
          { name: '760Li Stage 1', powerBefore: 544, powerAfter: 630, torqueBefore: 750, torqueAfter: 880, price: 48000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '730d Stage 1', powerBefore: 258, powerAfter: 330, torqueBefore: 560, torqueAfter: 680, price: 36000 },
          { name: '740d Stage 1', powerBefore: 313, powerAfter: 390, torqueBefore: 630, torqueAfter: 770, price: 36000 }
        ]
      }
    ]
  },
  // 7 Series G11/G12
  {
    name: '7 Series',
    series: 'G11/G12',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: '730i Stage 1', powerBefore: 258, powerAfter: 350, torqueBefore: 400, torqueAfter: 510, price: 38000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: '740i Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 580, price: 38000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: '750i Stage 1', powerBefore: 450, powerAfter: 560, torqueBefore: 650, torqueAfter: 800, price: 44000 },
          { name: '750i xDrive Stage 1', powerBefore: 450, powerAfter: 560, torqueBefore: 650, torqueAfter: 800, price: 44000 },
          { name: 'M760Li Stage 1', powerBefore: 585, powerAfter: 700, torqueBefore: 850, torqueAfter: 1000, price: 50000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: '730d Stage 1', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 740, price: 38000 },
          { name: '740d Stage 1', powerBefore: 320, powerAfter: 400, torqueBefore: 680, torqueAfter: 830, price: 38000 }
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
          { name: 'xDrive20i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 28000 },
          { name: 'xDrive28i Stage 1', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 430, price: 28000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'sDrive18d Stage 1', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: 'xDrive18d Stage 1', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 28000 },
          { name: 'sDrive20d Stage 1', powerBefore: 184, powerAfter: 240, torqueBefore: 380, torqueAfter: 480, price: 28000 },
          { name: 'xDrive20d Stage 1', powerBefore: 184, powerAfter: 240, torqueBefore: 380, torqueAfter: 480, price: 28000 }
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
          { name: 'sDrive18i Stage 1', powerBefore: 136, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 30000 },
          { name: 'xDrive18i Stage 1', powerBefore: 136, powerAfter: 170, torqueBefore: 220, torqueAfter: 280, price: 30000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'sDrive20i Stage 1', powerBefore: 192, powerAfter: 280, torqueBefore: 280, torqueAfter: 430, price: 30000 },
          { name: 'xDrive20i Stage 1', powerBefore: 192, powerAfter: 280, torqueBefore: 280, torqueAfter: 430, price: 30000 },
          { name: 'xDrive25i Stage 1', powerBefore: 231, powerAfter: 310, torqueBefore: 350, torqueAfter: 460, price: 30000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'sDrive18d Stage 1', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 430, price: 30000 },
          { name: 'xDrive18d Stage 1', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 430, price: 30000 },
          { name: 'sDrive20d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 30000 },
          { name: 'xDrive20d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 30000 },
          { name: 'xDrive25d Stage 1', powerBefore: 231, powerAfter: 290, torqueBefore: 450, torqueAfter: 560, price: 30000 }
        ]
      }
    ]
  },
  // X1 U11
  {
    name: 'X1',
    series: 'U11',
    generation: 'G',
    engines: [
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'xDrive20i Stage 1', powerBefore: 204, powerAfter: 290, torqueBefore: 300, torqueAfter: 440, price: 32000 },
          { name: 'xDrive23i Stage 1', powerBefore: 218, powerAfter: 300, torqueBefore: 360, torqueAfter: 470, price: 32000 },
          { name: 'xDrive28i Stage 1', powerBefore: 245, powerAfter: 330, torqueBefore: 400, torqueAfter: 480, price: 32000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'sDrive18d Stage 1', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 430, price: 32000 },
          { name: 'xDrive18d Stage 1', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 430, price: 32000 },
          { name: 'xDrive20d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 32000 },
          { name: 'xDrive23d Stage 1', powerBefore: 211, powerAfter: 280, torqueBefore: 430, torqueAfter: 550, price: 32000 }
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
          { name: 'sDrive18i Stage 1', powerBefore: 140, powerAfter: 175, torqueBefore: 220, torqueAfter: 285, price: 30000 }
        ]
      },
      {
        code: 'B48',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'sDrive20i Stage 1', powerBefore: 192, powerAfter: 280, torqueBefore: 280, torqueAfter: 430, price: 30000 },
          { name: 'xDrive20i Stage 1', powerBefore: 192, powerAfter: 280, torqueBefore: 280, torqueAfter: 430, price: 30000 },
          { name: 'M35i Stage 1', powerBefore: 306, powerAfter: 360, torqueBefore: 450, torqueAfter: 530, price: 35000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'sDrive18d Stage 1', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 430, price: 30000 },
          { name: 'xDrive18d Stage 1', powerBefore: 150, powerAfter: 200, torqueBefore: 350, torqueAfter: 430, price: 30000 },
          { name: 'sDrive20d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 30000 },
          { name: 'xDrive20d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 30000 }
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
          { name: 'xDrive20i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 30000 },
          { name: 'xDrive28i Stage 1', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 430, price: 30000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive35i Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 30000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'xDrive18d Stage 1', powerBefore: 143, powerAfter: 190, torqueBefore: 320, torqueAfter: 400, price: 30000 },
          { name: 'xDrive20d Stage 1', powerBefore: 184, powerAfter: 240, torqueBefore: 380, torqueAfter: 480, price: 30000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive30d Stage 1', powerBefore: 258, powerAfter: 330, torqueBefore: 560, torqueAfter: 680, price: 30000 },
          { name: 'xDrive35d Stage 1', powerBefore: 313, powerAfter: 390, torqueBefore: 630, torqueAfter: 770, price: 30000 }
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
          { name: 'xDrive20i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 290, torqueAfter: 420, price: 32000 },
          { name: 'xDrive30i Stage 1', powerBefore: 252, powerAfter: 350, torqueBefore: 350, torqueAfter: 510, price: 32000 },
          { name: 'M40i Stage 1', powerBefore: 360, powerAfter: 420, torqueBefore: 500, torqueAfter: 600, price: 36000 }
        ]
      },
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M Competition Stage 1', powerBefore: 510, powerAfter: 630, torqueBefore: 650, torqueAfter: 800, price: 42000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'xDrive20d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 32000 },
          { name: 'xDrive30d Stage 1', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 740, price: 32000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'M40d Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 700, torqueAfter: 850, price: 36000 }
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
          { name: 'xDrive20i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 30000 },
          { name: 'xDrive28i Stage 1', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 430, price: 30000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive35i Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 30000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'xDrive20d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 30000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive30d Stage 1', powerBefore: 258, powerAfter: 330, torqueBefore: 560, torqueAfter: 680, price: 30000 },
          { name: 'xDrive35d Stage 1', powerBefore: 313, powerAfter: 390, torqueBefore: 630, torqueAfter: 770, price: 30000 }
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
          { name: 'xDrive20i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 290, torqueAfter: 420, price: 32000 },
          { name: 'xDrive30i Stage 1', powerBefore: 252, powerAfter: 350, torqueBefore: 350, torqueAfter: 510, price: 32000 },
          { name: 'M40i Stage 1', powerBefore: 360, powerAfter: 420, torqueBefore: 500, torqueAfter: 600, price: 36000 }
        ]
      },
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M Competition Stage 1', powerBefore: 510, powerAfter: 630, torqueBefore: 650, torqueAfter: 800, price: 42000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'xDrive20d Stage 1', powerBefore: 190, powerAfter: 250, torqueBefore: 400, torqueAfter: 500, price: 32000 },
          { name: 'xDrive30d Stage 1', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 740, price: 32000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'M40d Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 700, torqueAfter: 850, price: 36000 }
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
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'xDrive25i Stage 1', powerBefore: 218, powerAfter: 290, torqueBefore: 310, torqueAfter: 440, price: 32000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive35i Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 32000 },
          { name: 'xDrive40e Stage 1', powerBefore: 313, powerAfter: 380, torqueBefore: 450, torqueAfter: 530, price: 32000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'xDrive50i Stage 1', powerBefore: 449, powerAfter: 550, torqueBefore: 650, torqueAfter: 780, price: 40000 }
        ]
      },
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X5 M Stage 1', powerBefore: 575, powerAfter: 700, torqueBefore: 750, torqueAfter: 900, price: 45000 }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'xDrive25d Stage 1', powerBefore: 218, powerAfter: 280, torqueBefore: 450, torqueAfter: 540, price: 32000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive30d Stage 1', powerBefore: 258, powerAfter: 330, torqueBefore: 560, torqueAfter: 680, price: 32000 },
          { name: 'xDrive40d Stage 1', powerBefore: 313, powerAfter: 390, torqueBefore: 630, torqueAfter: 770, price: 32000 },
          { name: 'M50d Stage 1', powerBefore: 381, powerAfter: 460, torqueBefore: 740, torqueAfter: 900, price: 36000 }
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
          { name: 'xDrive30i Stage 1', powerBefore: 252, powerAfter: 350, torqueBefore: 350, torqueAfter: 510, price: 35000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive40i Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 580, price: 35000 },
          { name: 'M50i Stage 1', powerBefore: 530, powerAfter: 620, torqueBefore: 750, torqueAfter: 870, price: 40000 }
        ]
      },
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X5 M Stage 1', powerBefore: 600, powerAfter: 750, torqueBefore: 750, torqueAfter: 950, price: 48000 },
          { name: 'X5 M Competition Stage 1', powerBefore: 625, powerAfter: 780, torqueBefore: 750, torqueAfter: 950, price: 48000 }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          { name: 'xDrive25d Stage 1', powerBefore: 231, powerAfter: 290, torqueBefore: 450, torqueAfter: 560, price: 35000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive30d Stage 1', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 740, price: 35000 },
          { name: 'xDrive40d Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 700, torqueAfter: 850, price: 35000 },
          { name: 'M50d Stage 1', powerBefore: 400, powerAfter: 480, torqueBefore: 760, torqueAfter: 920, price: 40000 }
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
          { name: 'xDrive35i Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 34000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'xDrive50i Stage 1', powerBefore: 449, powerAfter: 550, torqueBefore: 650, torqueAfter: 780, price: 42000 }
        ]
      },
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X6 M Stage 1', powerBefore: 575, powerAfter: 700, torqueBefore: 750, torqueAfter: 900, price: 46000 }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive30d Stage 1', powerBefore: 258, powerAfter: 330, torqueBefore: 560, torqueAfter: 680, price: 34000 },
          { name: 'xDrive40d Stage 1', powerBefore: 313, powerAfter: 390, torqueBefore: 630, torqueAfter: 770, price: 34000 },
          { name: 'M50d Stage 1', powerBefore: 381, powerAfter: 460, torqueBefore: 740, torqueAfter: 900, price: 38000 }
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
          { name: 'xDrive40i Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 580, price: 36000 },
          { name: 'M50i Stage 1', powerBefore: 530, powerAfter: 620, torqueBefore: 750, torqueAfter: 870, price: 42000 }
        ]
      },
      {
        code: 'S63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'X6 M Stage 1', powerBefore: 600, powerAfter: 750, torqueBefore: 750, torqueAfter: 950, price: 50000 },
          { name: 'X6 M Competition Stage 1', powerBefore: 625, powerAfter: 780, torqueBefore: 750, torqueAfter: 950, price: 50000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive30d Stage 1', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 740, price: 36000 },
          { name: 'xDrive40d Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 700, torqueAfter: 850, price: 36000 },
          { name: 'M50d Stage 1', powerBefore: 400, powerAfter: 480, torqueBefore: 760, torqueAfter: 920, price: 42000 }
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
          { name: 'xDrive40i Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 450, torqueAfter: 580, price: 38000 },
          { name: 'M50i Stage 1', powerBefore: 530, powerAfter: 620, torqueBefore: 750, torqueAfter: 870, price: 44000 }
        ]
      },
      {
        code: 'N63',
        type: 'petrol',
        displacement: '4.4',
        modifications: [
          { name: 'M60i Stage 1', powerBefore: 530, powerAfter: 640, torqueBefore: 750, torqueAfter: 900, price: 46000 }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          { name: 'xDrive30d Stage 1', powerBefore: 265, powerAfter: 340, torqueBefore: 620, torqueAfter: 740, price: 38000 },
          { name: 'xDrive40d Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 700, torqueAfter: 850, price: 38000 },
          { name: 'M50d Stage 1', powerBefore: 400, powerAfter: 480, torqueBefore: 760, torqueAfter: 920, price: 44000 }
        ]
      }
    ]
  },
  // Z4 E89
  {
    name: 'Z4',
    series: 'E89',
    generation: 'F',
    engines: [
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          { name: 'sDrive20i Stage 1', powerBefore: 184, powerAfter: 270, torqueBefore: 270, torqueAfter: 420, price: 28000 },
          { name: 'sDrive28i Stage 1', powerBefore: 245, powerAfter: 310, torqueBefore: 350, torqueAfter: 430, price: 28000 }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'sDrive35i Stage 1', powerBefore: 306, powerAfter: 370, torqueBefore: 400, torqueAfter: 500, price: 28000 },
          { name: 'sDrive35is Stage 1', powerBefore: 340, powerAfter: 410, torqueBefore: 450, torqueAfter: 550, price: 28000 }
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
          { name: 'sDrive20i Stage 1', powerBefore: 197, powerAfter: 280, torqueBefore: 320, torqueAfter: 430, price: 30000 },
          { name: 'sDrive30i Stage 1', powerBefore: 258, powerAfter: 350, torqueBefore: 400, torqueAfter: 510, price: 30000 }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          { name: 'M40i Stage 1', powerBefore: 340, powerAfter: 420, torqueBefore: 500, torqueAfter: 600, price: 34000 }
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