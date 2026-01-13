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
  // F-серия модели
  {
    name: '3 Series',
    series: 'F30',
    generation: 'F',
    engines: [
      {
        code: 'N20',
        type: 'petrol',
        displacement: '2.0',
        modifications: [
          {
            name: '320i',
            powerBefore: 184,
            powerAfter: 260,
            torqueBefore: 270,
            torqueAfter: 440,
            price: 80000
          }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: '335i',
            powerBefore: 306,
            powerAfter: 365,
            torqueBefore: 400,
            torqueAfter: 520,
            price: 40000
          }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          {
            name: '320d',
            powerBefore: 184,
            powerAfter: 220,
            torqueBefore: 380,
            torqueAfter: 440,
            price: 30000
          }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: '330d',
            powerBefore: 258,
            powerAfter: 310,
            torqueBefore: 560,
            torqueAfter: 650,
            price: 35000
          }
        ]
      }
    ]
  },
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
          {
            name: '520i',
            powerBefore: 184,
            powerAfter: 260,
            torqueBefore: 270,
            torqueAfter: 440,
            price: 80000
          }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: '535i',
            powerBefore: 306,
            powerAfter: 365,
            torqueBefore: 400,
            torqueAfter: 520,
            price: 40000
          }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          {
            name: '520d',
            powerBefore: 184,
            powerAfter: 220,
            torqueBefore: 380,
            torqueAfter: 440,
            price: 30000
          }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: '530d',
            powerBefore: 258,
            powerAfter: 310,
            torqueBefore: 560,
            torqueAfter: 650,
            price: 35000
          }
        ]
      }
    ]
  },
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
          {
            name: 'X3 20i',
            powerBefore: 184,
            powerAfter: 260,
            torqueBefore: 270,
            torqueAfter: 440,
            price: 80000
          }
        ]
      },
      {
        code: 'N55',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: 'X3 35i',
            powerBefore: 306,
            powerAfter: 365,
            torqueBefore: 400,
            torqueAfter: 520,
            price: 40000
          }
        ]
      },
      {
        code: 'N47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          {
            name: 'X3 20d',
            powerBefore: 184,
            powerAfter: 220,
            torqueBefore: 380,
            torqueAfter: 440,
            price: 30000
          }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: 'X3 35d',
            powerBefore: 313,
            powerAfter: 375,
            torqueBefore: 630,
            torqueAfter: 730,
            price: 35000
          }
        ]
      }
    ]
  },
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
          {
            name: 'X5 35i',
            powerBefore: 306,
            powerAfter: 365,
            torqueBefore: 400,
            torqueAfter: 520,
            price: 40000
          }
        ]
      },
      {
        code: 'N57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: 'X5 30d',
            powerBefore: 258,
            powerAfter: 310,
            torqueBefore: 560,
            torqueAfter: 650,
            price: 35000
          },
          {
            name: 'X5 40d',
            powerBefore: 313,
            powerAfter: 375,
            torqueBefore: 630,
            torqueAfter: 730,
            price: 35000
          }
        ]
      }
    ]
  },
  // G-серия модели
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
          {
            name: '320i',
            powerBefore: 184,
            powerAfter: 280,
            torqueBefore: 290,
            torqueAfter: 440,
            price: 30000
          },
          {
            name: '330i',
            powerBefore: 252,
            powerAfter: 280,
            torqueBefore: 350,
            torqueAfter: 460,
            price: 30000
          }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: 'M340i',
            powerBefore: 387,
            powerAfter: 450,
            torqueBefore: 500,
            torqueAfter: 650,
            price: 40000
          }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          {
            name: '318d',
            powerBefore: 150,
            powerAfter: 230,
            torqueBefore: 350,
            torqueAfter: 490,
            price: 30000
          },
          {
            name: '320d',
            powerBefore: 190,
            powerAfter: 230,
            torqueBefore: 400,
            torqueAfter: 490,
            price: 30000
          }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: '330d',
            powerBefore: 265,
            powerAfter: 340,
            torqueBefore: 620,
            torqueAfter: 770,
            price: 35000
          },
          {
            name: 'M340d',
            powerBefore: 340,
            powerAfter: 400,
            torqueBefore: 700,
            torqueAfter: 800,
            price: 35000
          }
        ]
      }
    ]
  },
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
          {
            name: '520i',
            powerBefore: 184,
            powerAfter: 280,
            torqueBefore: 290,
            torqueAfter: 440,
            price: 30000
          },
          {
            name: '530i',
            powerBefore: 252,
            powerAfter: 280,
            torqueBefore: 350,
            torqueAfter: 460,
            price: 30000
          }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: '540i',
            powerBefore: 340,
            powerAfter: 450,
            torqueBefore: 450,
            torqueAfter: 650,
            price: 40000
          }
        ]
      },
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: 'M550i',
            powerBefore: 530,
            powerAfter: 600,
            torqueBefore: 750,
            torqueAfter: 850,
            price: 50000
          },
          {
            name: 'M550d',
            powerBefore: 400,
            powerAfter: 460,
            torqueBefore: 760,
            torqueAfter: 860,
            price: 40000
          }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          {
            name: '520d',
            powerBefore: 190,
            powerAfter: 230,
            torqueBefore: 400,
            torqueAfter: 490,
            price: 30000
          }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: '530d',
            powerBefore: 265,
            powerAfter: 340,
            torqueBefore: 620,
            torqueAfter: 770,
            price: 35000
          }
        ]
      }
    ]
  },
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
          {
            name: 'X3 20i',
            powerBefore: 184,
            powerAfter: 280,
            torqueBefore: 290,
            torqueAfter: 440,
            price: 30000
          },
          {
            name: 'X3 30i',
            powerBefore: 252,
            powerAfter: 280,
            torqueBefore: 350,
            torqueAfter: 460,
            price: 30000
          }
        ]
      },
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: 'X3 M40i',
            powerBefore: 387,
            powerAfter: 450,
            torqueBefore: 500,
            torqueAfter: 650,
            price: 40000
          }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          {
            name: 'X3 20d',
            powerBefore: 190,
            powerAfter: 230,
            torqueBefore: 400,
            torqueAfter: 490,
            price: 30000
          }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: 'X3 30d',
            powerBefore: 265,
            powerAfter: 340,
            torqueBefore: 620,
            torqueAfter: 770,
            price: 35000
          },
          {
            name: 'X3 M40d',
            powerBefore: 340,
            powerAfter: 400,
            torqueBefore: 700,
            torqueAfter: 800,
            price: 35000
          }
        ]
      }
    ]
  },
  {
    name: 'X5',
    series: 'G05',
    generation: 'G',
    engines: [
      {
        code: 'B58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: 'X5 40i',
            powerBefore: 340,
            powerAfter: 450,
            torqueBefore: 450,
            torqueAfter: 650,
            price: 40000
          }
        ]
      },
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: 'X5 M50i',
            powerBefore: 530,
            powerAfter: 600,
            torqueBefore: 750,
            torqueAfter: 850,
            price: 50000
          },
          {
            name: 'X5 M50d',
            powerBefore: 400,
            powerAfter: 460,
            torqueBefore: 760,
            torqueAfter: 860,
            price: 40000
          }
        ]
      },
      {
        code: 'B47',
        type: 'diesel',
        displacement: '2.0',
        modifications: [
          {
            name: 'X5 25d',
            powerBefore: 190,
            powerAfter: 230,
            torqueBefore: 400,
            torqueAfter: 490,
            price: 30000
          }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: 'X5 30d',
            powerBefore: 265,
            powerAfter: 340,
            torqueBefore: 620,
            torqueAfter: 770,
            price: 35000
          },
          {
            name: 'X5 40d',
            powerBefore: 340,
            powerAfter: 400,
            torqueBefore: 700,
            torqueAfter: 800,
            price: 35000
          }
        ]
      }
    ]
  },
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
          {
            name: 'X7 40i',
            powerBefore: 340,
            powerAfter: 450,
            torqueBefore: 450,
            torqueAfter: 650,
            price: 40000
          }
        ]
      },
      {
        code: 'S58',
        type: 'petrol',
        displacement: '3.0',
        modifications: [
          {
            name: 'X7 M50i',
            powerBefore: 530,
            powerAfter: 600,
            torqueBefore: 750,
            torqueAfter: 850,
            price: 50000
          }
        ]
      },
      {
        code: 'B57',
        type: 'diesel',
        displacement: '3.0',
        modifications: [
          {
            name: 'X7 30d',
            powerBefore: 265,
            powerAfter: 340,
            torqueBefore: 620,
            torqueAfter: 770,
            price: 35000
          }
        ]
      }
    ]
  }
];

export const getTypeColor = (type: string): string => {
  return type === 'petrol' ? '#FF6B35' : '#00D4FF';
};

export const getGainPercentage = (before: number, after: number): number => {
  return Math.round(((after - before) / before) * 100);
};
