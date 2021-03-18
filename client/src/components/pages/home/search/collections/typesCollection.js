/*
STRUCTURE - array/object
[
    {
        Manufacturer: [
            { type: "type", 
              engineSize: [
                  { cc: Number,
                    horsePower: [
                        { hp: Number }
                    ]}
              ]}
        ]
    }
]
*/

// when user click audio - izadje mu modal sa tipovima, kada klikne na tip izadje engineSize itd, ako nesto nece moze skip
// i moze da stavi - obicna pretraga
// i kada na kraju stavim za svaki motor ponaosob sve ukupne delove koji postoje bice pleees
// da napravim interfejs gde mehanicar moze da ubacuje delove, ili pogledam na netu
const typesCollection = [
    {
    Audi: [
        { type: "A3",
          productionYear: [
              { year: 1996,
                subTypes: [
                    { type: "8L",
                      petrol: [
                        { cc: 1600,
                          horsePower: [
                              { hp: 100,
                                other: [
                                    { kilowates: [
                                        { kW: 74 }
                                    ]},
                                    { pferdestarke: [
                                        { PS: 101 }
                                    ]},
                                    { years: [
                                        { yearToYear: [1996, 2000]}
                                    ]}
                            ]},
                                { hp: 101,
                                    other: [
                                        { kilowates: [
                                            { kW: 75 }
                                        ]},
                                        { pferdestarke: [
                                            { PS: 102 }
                                        ]},
                                        { years: [
                                            { yearToYear: [2000, 2003]}
                                        ]}
                                ]}
                             ]},
                        { cc: 1800,
                            horsePower: [
                                { hp: Number,
                                  other: [
                                      { kilowates: [
                                          { kW: Number }
                                      ]},
                                      { pferdestarke: [
                                          { PS: Number }
                                      ]},
                                      { years: [
                                          { yearToYear: [Number, Number]}
                                      ]}
                                    ]},
                                { hp: Number,
                                    other: [
                                        { kilowates: [
                                            { kW: Number }
                                        ]},
                                        { pferdestarke: [
                                            { PS: Number }
                                        ]},
                                        { years: [
                                            { yearToYear: [Number, Number]}
                                        ]}
                                ]}
                            ]}                 
                      ],
                     diesel: [
                        { cc: Number,
                            horsePower: [
                                { hp: Number,
                                  other: [
                                      { kilowates: [
                                          { kW: Number }
                                      ]},
                                      { pferdestarke: [
                                          { PS: Number }
                                      ]},
                                      { years: [
                                          { yearToYear: [Number, Number]}
                                      ]}
                              ]},
                              { hp: Number,
                                  other: [
                                      { kilowates: [
                                          { kW: Number }
                                      ]},
                                      { pferdestarke: [
                                          { PS: Number }
                                      ]},
                                      { years: [
                                          { yearToYear: [Number, Number]}
                                    ]}
                            ]}
                        ]}                         
                     ]},
                     { type: String,
                        petrol: [
                            { cc: Number,
                                horsePower: [
                                    { hp: Number,
                                      other: [
                                          { kilowates: [
                                              { kW: Number }
                                          ]},
                                          { pferdestarke: [
                                              { PS: Number }
                                          ]},
                                          { years: [
                                              { yearToYear: [Number, Number]}
                                          ]}
                                        ]},
                                    { hp: Number,
                                        other: [
                                            { kilowates: [
                                                { kW: Number }
                                            ]},
                                            { pferdestarke: [
                                                { PS: Number }
                                            ]},
                                            { years: [
                                                { yearToYear: [Number, Number]}
                                            ]}
                                    ]}
                                ]}
                        ],
                        diesel: [
                            { cc: Number,
                                horsePower: [
                                    { hp: Number,
                                      other: [
                                          { kilowates: [
                                              { kW: Number }
                                          ]},
                                          { pferdestarke: [
                                              { PS: Number }
                                          ]},
                                          { years: [
                                              { yearToYear: [Number, Number]}
                                          ]}
                                  ]},
                                  { hp: Number,
                                      other: [
                                          { kilowates: [
                                              { kW: Number }
                                          ]},
                                          { pferdestarke: [
                                              { PS: Number }
                                          ]},
                                          { years: [
                                              { yearToYear: [Number, Number]}
                                        ]}
                                ]}
                            ]}                         
                        ]                                            
                    }
                ]}
          ]
         },
        { type: "A4" },
        { type: "A5" },
        { type: "A6" },
        { type: "A7" },
        { type: "A8" },
        { type: "Q3" }
    ]
   ,
    BMW: [
        { type: "1" },
        { type: "2" },
        { type: "3" }
    ]
    ,
    Opel: [
        { type: "Astra" },
        { type: "Insignia" }
    ]
    }
 ]

 export default typesCollection;