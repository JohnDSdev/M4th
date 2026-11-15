/* Declarative Unit 2 lesson package; 15 topics, 45 parameterized question templates. */
window.UNIT2 = [
  {
    "id": "2.1",
    "title": "Change in Arithmetic and Geometric Sequences",
    "subtitle": "Constant differences versus constant ratios.",
    "sections": [
      {
        "title": "Arithmetic sequences",
        "text": "An arithmetic sequence adds a fixed difference $d$ on every step. Its explicit rule is $a_n=a_1+(n-1)d$. Check successive subtractions to identify the difference."
      },
      {
        "title": "Geometric sequences",
        "text": "A geometric sequence multiplies by a fixed ratio $r$: $a_n=a_1r^{n-1}$. Check quotients of consecutive terms. If $0<r<1$, positive terms decay."
      },
      {
        "title": "Sequences and functions",
        "text": "The input $n$ is an integer index. Arithmetic sequences sample linear functions, while geometric sequences sample exponential functions. Pay attention to whether counting starts at $n=0$ or $n=1$."
      }
    ],
    "worked": [
      {
        "prompt": "Find term 7 in $5,9,13,17,...$.",
        "steps": [
          "The difference is $4$.",
          "$a_7=5+(7-1)4=29$."
        ]
      },
      {
        "prompt": "Find term 5 in $3,6,12,24,...$.",
        "steps": [
          "The ratio is $2$.",
          "$a_5=3\\cdot2^{4}=48$."
        ]
      }
    ],
    "pitfalls": [
      "Differences are additive; ratios are multiplicative.",
      "Starting at term one means using exponent $n-1$."
    ],
    "visual": {
      "kind": "flow",
      "nodes": [
        "List terms",
        "Subtract adjacent terms",
        "Divide adjacent terms",
        "Choose a model"
      ]
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "a": [
            2,
            12
          ],
          "d": [
            2,
            8
          ],
          "n": [
            4,
            11
          ]
        },
        "prompt": "An arithmetic sequence has first term {{a}} and common difference {{d}}. Find term {{n}}.",
        "answer": "a+(n-1)*d",
        "steps": [
          "Use $a_n=a_1+(n-1)d$.",
          "$a_{{n}}={{a}}+({{n}}-1)({{d}})={{a+(n-1)*d}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "a": [
            2,
            6
          ],
          "r": [
            2,
            3
          ],
          "n": [
            3,
            6
          ]
        },
        "prompt": "A geometric sequence begins with {{a}} and common ratio {{r}}. Find term {{n}}.",
        "answer": "a*r^(n-1)",
        "steps": [
          "Use $a_n=a_1r^{n-1}$.",
          "$a_{{n}}={{a}}\\cdot{{r}}^{{{n-1}}}={{a*r^(n-1)}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "a": [
            2,
            5
          ],
          "r": [
            2,
            3
          ]
        },
        "prompt": "In a positive geometric sequence, $a_2={{a*r}}$ and $a_5={{a*r^4}}$. Find $a_4$.",
        "answer": "a*r^3",
        "steps": [
          "The quotient $a_5/a_2=r^3$, giving $r={{r}}$.",
          "$a_4=a_2r^2={{a*r^3}}$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.2",
    "title": "Change in Linear and Exponential Functions",
    "subtitle": "Distinguish additive and multiplicative function change.",
    "sections": [
      {
        "title": "Linear change",
        "text": "A linear function $f(x)=mx+b$ changes by the same amount $m$ for each one-unit increase in $x$. Its rate of change is the slope."
      },
      {
        "title": "Exponential change",
        "text": "For $g(x)=ab^x$, an increase of one in $x$ multiplies the output by $b$. The corresponding percent change is $(b-1)\\cdot100\\%$."
      },
      {
        "title": "Read data",
        "text": "When input steps are equal, compare first differences and ratios. Constant differences indicate a linear model; constant nonzero ratios indicate an exponential model."
      }
    ],
    "worked": [
      {
        "prompt": "Identify the pattern $4,10,16,22$.",
        "steps": [
          "The differences are always $6$.",
          "A linear model is $y=4+6x$ for $x=0,1,2,3$."
        ]
      },
      {
        "prompt": "Identify $5,15,45,135$.",
        "steps": [
          "Each term is triple the preceding one.",
          "An exponential model is $y=5\\cdot3^x$."
        ]
      }
    ],
    "pitfalls": [
      "A constant percentage change is not a constant additive increase.",
      "Always compare measurements over equal input intervals."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "2*x+2",
        "2*1.6^x"
      ],
      "xMin": 0,
      "xMax": 6,
      "yMin": 0,
      "yMax": 40,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "b": [
            3,
            11
          ],
          "m": [
            2,
            9
          ],
          "n": [
            2,
            5
          ]
        },
        "prompt": "A linear function starts at $f(0)={{b}}$ and adds {{m}} each step. What is $f({{n}})$?",
        "answer": "b+m*n",
        "steps": [
          "Use $f(x)=b+mx$.",
          "$f({{n}})={{b}}+{{m}}({{n}})={{b+m*n}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "a": [
            2,
            8
          ],
          "r": [
            2,
            4
          ],
          "n": [
            2,
            4
          ]
        },
        "prompt": "An exponential function has $g(0)={{a}}$ and multiplies by {{r}} each step. Find $g({{n}})$.",
        "answer": "a*r^n",
        "steps": [
          "Use $g(x)=ab^x$.",
          "$g({{n}})={{a}}({{r}})^{{{n}}}={{a*r^n}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "a": [
            3,
            9
          ],
          "r": [
            2,
            4
          ]
        },
        "prompt": "At equal input intervals the outputs are {{a}}, {{a*r}}, {{a*r*r}}. Which model fits exactly?",
        "options": [
          "Exponential",
          "Linear",
          "Neither"
        ],
        "steps": [
          "Each consecutive ratio is {{r}}.",
          "Constant ratios mean exponential change."
        ],
        "derived": {},
        "correct": 0,
        "kind": "choice"
      }
    ]
  },
  {
    "id": "2.3",
    "title": "Exponential Functions",
    "subtitle": "Initial values, multipliers, growth, and decay.",
    "sections": [
      {
        "title": "Understand $ab^x$",
        "text": "In $f(x)=ab^x$, $a=f(0)$ is the starting value and $b>0$, $b\\ne1$ is the per-step multiplier. For positive $a$, values grow if $b>1$ and decay if $0<b<1$."
      },
      {
        "title": "Domain, range, and asymptote",
        "text": "For $a>0$, the domain is all real inputs, the range is $(0,\\infty)$, and the graph approaches the horizontal asymptote $y=0$. It passes through $(0,a)$."
      },
      {
        "title": "Percent interpretation",
        "text": "Increasing $r\\%$ per period means multiplier $1+r/100$; decreasing $r\\%$ means $1-r/100$. Apply the multiplier once per specified period."
      }
    ],
    "worked": [
      {
        "prompt": "Evaluate $f(x)=3\\cdot2^x$ at $x=4$.",
        "steps": [
          "$2^4=16$.",
          "$3\\cdot16=48$."
        ]
      },
      {
        "prompt": "Model 200 objects decreasing 25% yearly.",
        "steps": [
          "Each period retains 75%.",
          "$A(t)=200(0.75)^t$."
        ]
      }
    ],
    "pitfalls": [
      "$2^{x+1}$ is different from $2^x+1$.",
      "The coefficient, not the base, is $f(0)$."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "2^x",
        "(1/2)^x"
      ],
      "xMin": -3,
      "xMax": 4,
      "yMin": 0,
      "yMax": 12,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "a": [
            2,
            8
          ],
          "b": [
            2,
            4
          ],
          "x": [
            2,
            4
          ]
        },
        "prompt": "For $f(x)={{a}}\\cdot{{b}}^x$, find $f({{x}})$.",
        "answer": "a*b^x",
        "steps": [
          "Evaluate the power first.",
          "$f({{x}})={{a}}({{b}})^{{{x}}}={{a*b^x}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "a": [
            50,
            160
          ],
          "r": {
            "values": [
              10,
              20,
              25,
              50
            ]
          }
        },
        "prompt": "A population of {{a}} falls by {{r}}%. How many remain after one period?",
        "answer": "round(a*(1-r/100),2)",
        "steps": [
          "The decay multiplier is $1-{{r}}/100$.",
          "$A={{a}}(1-{{r}}/100)={{round(a*(1-r/100),2)}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "b": [
            2,
            5
          ]
        },
        "prompt": "For $f(x)={{b}}^x$, by what percent does the output increase whenever $x$ increases by 1? Enter a number without %.",
        "answer": "(b-1)*100",
        "steps": [
          "The multiplier is {{b}}.",
          "The rate is $({{b}}-1)\\cdot100\\%={{(b-1)*100}}\\%$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.4",
    "title": "Exponential Function Manipulation",
    "subtitle": "Move, stretch, and reflect exponential graphs.",
    "sections": [
      {
        "title": "Transformation formula",
        "text": "Write $g(x)=a\\,b^{x-h}+k$. The $h$ shifts horizontally, $k$ vertically, and $a$ vertically scales or reflects the graph."
      },
      {
        "title": "Asymptotes and intercepts",
        "text": "The horizontal asymptote is $y=k$, while the $y$-intercept is found by substituting $x=0$. A negative $a$ reflects the exponential part."
      },
      {
        "title": "Order of operations",
        "text": "When evaluating, compute the exponent $x-h$ before multiplying by $a$ and adding $k$. A shift right appears as subtraction inside the exponent."
      }
    ],
    "worked": [
      {
        "prompt": "Describe $g(x)=2^{x-3}+4$.",
        "steps": [
          "Shift $2^x$ right 3 units and up 4 units.",
          "The new horizontal asymptote is $y=4$."
        ]
      },
      {
        "prompt": "Evaluate $3\\cdot2^{x-2}-5$ at $x=4$.",
        "steps": [
          "The exponent is $2$.",
          "$3\\cdot4-5=7$."
        ]
      }
    ],
    "pitfalls": [
      "Horizontal shifts reverse the apparent sign.",
      "The vertical shift determines the asymptote."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "2^x",
        "2^(x-2)+3"
      ],
      "xMin": -4,
      "xMax": 6,
      "yMin": -1,
      "yMax": 18,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "h": [
            2,
            8
          ]
        },
        "prompt": "How many units right is $g(x)=2^{x-{{h}}}$ shifted?",
        "answer": "h",
        "steps": [
          "Compare $b^{x-h}$ to $b^x$.",
          "It moves {{h}} units right."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "k": [
            2,
            12
          ]
        },
        "prompt": "Find the $y$-intercept value of $g(x)=3^x+{{k}}$.",
        "answer": "1+k",
        "steps": [
          "Set $x=0$.",
          "$g(0)=3^0+{{k}}={{1+k}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "a": [
            2,
            5
          ],
          "h": [
            1,
            4
          ],
          "k": [
            1,
            9
          ]
        },
        "prompt": "Calculate $g({{h+2}})$ if $g(x)={{a}}\\cdot2^{x-{{h}}}+{{k}}$.",
        "answer": "a*4+k",
        "steps": [
          "The exponent is ${{h+2}}-{{h}}=2$.",
          "$g={{a}}\\cdot4+{{k}}={{a*4+k}}$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.5",
    "title": "Exponential Function Context and Data Modeling",
    "subtitle": "Apply compound growth and decay to real contexts.",
    "sections": [
      {
        "title": "Write an exponential model",
        "text": "Repeated proportional change follows $A(t)=P(1+r)^t$, where $P$ is initial value and $r$ is a signed decimal rate per period."
      },
      {
        "title": "Read a data table",
        "text": "For equally spaced time values, approximately constant ratios suggest an exponential model. Use the starting value and typical multiplier, then compare model predictions against data."
      },
      {
        "title": "Interpret your answer",
        "text": "Units matter. A percentage per decade must use decades for $t$. Round money to cents and consider whether the model is plausible far beyond observed data."
      }
    ],
    "worked": [
      {
        "prompt": "A 500 dollar balance grows 10% annually for two years.",
        "steps": [
          "Use $A(t)=500(1.1)^t$.",
          "$A(2)=500(1.21)=605$ dollars."
        ]
      },
      {
        "prompt": "A sample of 80 mg halves every hour.",
        "steps": [
          "Use $M(t)=80(0.5)^t$.",
          "After three hours, $M(3)=10$ mg."
        ]
      }
    ],
    "pitfalls": [
      "Convert percentages before raising to powers.",
      "Compounded change is not adding the same amount every time."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "100*1.2^x"
      ],
      "xMin": 0,
      "xMax": 8,
      "yMin": 0,
      "yMax": 450,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "p": {
            "values": [
              100,
              200,
              300,
              500
            ]
          },
          "r": {
            "values": [
              10,
              20,
              25
            ]
          },
          "t": [
            1,
            3
          ]
        },
        "prompt": "A balance starts at ${{p}}$ dollars and grows by {{r}}% yearly. Find the balance after {{t}} years, rounded to cents.",
        "answer": "round(p*(1+r/100)^t,2)",
        "steps": [
          "Use $A=P(1+r)^t$.",
          "$A={{p}}(1+{{r}}/100)^{{{t}}}={{round(p*(1+r/100)^t,2)}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "p": {
            "values": [
              64,
              128,
              256,
              512
            ]
          },
          "t": [
            1,
            4
          ]
        },
        "prompt": "A sample starts at {{p}} grams and halves each hour. How many grams remain after {{t}} hours?",
        "answer": "p/2^t",
        "steps": [
          "Use a multiplier of $1/2$ each hour.",
          "$A={{p}}(1/2)^{{{t}}}={{p/2^t}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "p": [
            30,
            80
          ],
          "r": {
            "values": [
              20,
              50,
              100
            ]
          },
          "t": [
            2,
            4
          ]
        },
        "prompt": "A town has {{p}} thousand residents and grows {{r}}% per decade. Find the population in thousands after {{t}} decades (round to hundredths).",
        "answer": "round(p*(1+r/100)^t,2)",
        "steps": [
          "A decade is one step, not one year.",
          "$A={{p}}(1+{{r}}/100)^{{{t}}}={{round(p*(1+r/100)^t,2)}}$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.6",
    "title": "Competing Function Model Validation",
    "subtitle": "Test predictions, calculate residuals, and select reasonable models.",
    "sections": [
      {
        "title": "Models make predictions",
        "text": "A linear model predicts equal additive changes for equal input steps. An exponential model predicts equal ratios. Compare both against the observed data."
      },
      {
        "title": "Residuals measure error",
        "text": "A residual is $e=y-\\hat y$, observed minus predicted. Compare absolute errors for individual points or sum squared residuals over multiple points."
      },
      {
        "title": "Validate on new observations",
        "text": "A model may perfectly fit a few points yet predict poorly elsewhere. Inspect leftover errors, units, and whether extrapolating makes physical sense."
      }
    ],
    "worked": [
      {
        "prompt": "Compare models for the data $3,6,12,24$.",
        "steps": [
          "The consecutive ratios are all $2$.",
          "$y=3\\cdot2^x$ fits the data for $x=0,1,2,3$."
        ]
      },
      {
        "prompt": "Observed 23; predictions 19 and 26.",
        "steps": [
          "Absolute errors are $|23-19|=4$ and $|23-26|=3$.",
          "The second model is closer for this observation."
        ]
      }
    ],
    "pitfalls": [
      "One good prediction does not prove a model is universally valid.",
      "Check observations not used to construct the model."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "3*2^x",
        "3+5*x"
      ],
      "xMin": 0,
      "xMax": 5,
      "yMin": 0,
      "yMax": 100,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "a": [
            3,
            9
          ],
          "d": [
            2,
            6
          ]
        },
        "prompt": "Outputs are {{a}}, {{a+d}}, {{a+2*d}}, {{a+3*d}} at equally spaced inputs. Which model fits?",
        "options": [
          "Linear",
          "Exponential",
          "Neither"
        ],
        "steps": [
          "Every adjacent difference is {{d}}.",
          "Constant first difference means linear."
        ],
        "derived": {},
        "correct": 0,
        "kind": "choice"
      },
      {
        "tier": 2,
        "vars": {
          "actual": [
            25,
            80
          ],
          "errA": [
            5,
            15
          ],
          "errB": [
            1,
            4
          ]
        },
        "prompt": "The observed value is {{actual}}. Model A predicts {{actual+errA}} and model B predicts {{actual-errB}}. What is the smaller absolute residual?",
        "answer": "errB",
        "steps": [
          "Model A error is {{errA}}; model B error is {{errB}}.",
          "The smaller residual magnitude is {{errB}}."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "a": [
            2,
            6
          ],
          "r": [
            2,
            3
          ]
        },
        "prompt": "For $x=0,1,2$, the outputs are {{a}}, {{a*r}}, {{a*r^2}}. Using an exponential model, predict $y$ at $x=3$.",
        "answer": "a*r^3",
        "steps": [
          "Each output is multiplied by {{r}}.",
          "$y(3)={{a}}\\cdot{{r}}^3={{a*r^3}}$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.7",
    "title": "Composition of Functions",
    "subtitle": "Apply an inner function, then an outer function.",
    "sections": [
      {
        "title": "Inside first",
        "text": "$(f\\circ g)(x)=f(g(x))$ means first evaluate $g$, then use its output as the input of $f$. Composition is not multiplication."
      },
      {
        "title": "Order matters",
        "text": "Generally, $f(g(x))\\ne g(f(x))$. Draw an input-output chain and substitute carefully; numerical examples reveal the difference."
      },
      {
        "title": "Composite domains",
        "text": "A valid input must be allowed by $g$, and its output must be in the domain of $f$. Logarithms and square roots often add restrictions."
      }
    ],
    "worked": [
      {
        "prompt": "If $f(x)=2x+1$ and $g(x)=x^2$, evaluate $f(g(3))$.",
        "steps": [
          "$g(3)=9$.",
          "$f(9)=2(9)+1=19$."
        ]
      },
      {
        "prompt": "For the same functions, evaluate $g(f(3))$.",
        "steps": [
          "$f(3)=7$.",
          "$g(7)=49$; the order matters."
        ]
      }
    ],
    "pitfalls": [
      "Evaluate the inner expression first.",
      "Always check the domain of the outer function."
    ],
    "visual": {
      "kind": "flow",
      "nodes": [
        "x",
        "Apply g",
        "g(x)",
        "Apply f",
        "f(g(x))"
      ]
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "a": [
            2,
            6
          ],
          "b": [
            1,
            9
          ],
          "c": [
            2,
            6
          ],
          "x": [
            1,
            5
          ]
        },
        "prompt": "$f(x)={{a}}x+{{b}}$, $g(x)={{c}}x$. Find $f(g({{x}}))$.",
        "answer": "a*(c*x)+b",
        "steps": [
          "$g({{x}})={{c*x}}$.",
          "$f({{c*x}})={{a*(c*x)+b}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "a": [
            2,
            5
          ],
          "b": [
            2,
            8
          ],
          "c": [
            2,
            5
          ],
          "x": [
            1,
            4
          ]
        },
        "prompt": "$f(x)={{a}}x+{{b}}$, $g(x)={{c}}x$. Find $g(f({{x}}))$.",
        "answer": "c*(a*x+b)",
        "steps": [
          "First $f({{x}})={{a*x+b}}$.",
          "Then $g({{a*x+b}})={{c*(a*x+b)}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "a": [
            2,
            6
          ],
          "b": [
            2,
            7
          ],
          "c": [
            2,
            5
          ],
          "x": [
            1,
            4
          ]
        },
        "prompt": "For $f(x)={{a}}x+{{b}}$ and $g(x)={{c}}x$, calculate $f(g({{x}}))-g(f({{x}}))$.",
        "answer": "a*(c*x)+b-c*(a*x+b)",
        "steps": [
          "$f(g({{x}}))={{a*c*x+b}}$.",
          "$g(f({{x}}))={{c*(a*x+b)}}$. Their difference is {{a*c*x+b-c*(a*x+b)}}."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.8",
    "title": "Inverse Functions",
    "subtitle": "Undo functions and reflect graphs across $y=x$.",
    "sections": [
      {
        "title": "Inverse relationship",
        "text": "An inverse function reverses the original mapping: $f^{-1}(f(x))=x$ for valid inputs. The superscript $-1$ here is not a reciprocal."
      },
      {
        "title": "Find the inverse",
        "text": "Set $y=f(x)$, swap $x$ and $y$, and solve for the new $y$. For $f(x)=ax+b$, $f^{-1}(x)=(x-b)/a$ if $a\\ne0$."
      },
      {
        "title": "One-to-one functions",
        "text": "To have an inverse function, each output must correspond to exactly one input. Restrict the domain of $x^2$ to $x\\ge0$ before taking its square-root inverse. Domains and ranges exchange."
      }
    ],
    "worked": [
      {
        "prompt": "Find the inverse of $f(x)=3x+4$.",
        "steps": [
          "Swap variables in $y=3x+4$ to get $x=3y+4$.",
          "Solve: $f^{-1}(x)=(x-4)/3$."
        ]
      },
      {
        "prompt": "Why is $x^2$ not invertible on all real inputs?",
        "steps": [
          "Both $2$ and $-2$ map to $4$.",
          "Restricting $x\\ge0$ produces the inverse $\\sqrt{x}$."
        ]
      }
    ],
    "pitfalls": [
      "An inverse function is not $1/f(x)$.",
      "An inverse exchanges domain and range."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "2*x+1",
        "(x-1)/2",
        "x"
      ],
      "xMin": -4,
      "xMax": 6,
      "yMin": -4,
      "yMax": 8,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "a": [
            2,
            8
          ],
          "b": [
            1,
            12
          ],
          "x": [
            2,
            11
          ]
        },
        "prompt": "$f(x)={{a}}x+{{b}}$. Find $f^{-1}({{a*x+b}})$.",
        "answer": "x",
        "steps": [
          "Solve $y={{a}}x+{{b}}$ for $x$.",
          "$x=({{a*x+b}}-{{b}})/{{a}}={{x}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "x": [
            2,
            7
          ]
        },
        "prompt": "If $f(x)=x^3$, what is $f^{-1}({{x^3}})$?",
        "answer": "x",
        "steps": [
          "Undo cubing with the cube root.",
          "$\\sqrt[3]{{{x^3}}}={{x}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "h": [
            2,
            8
          ]
        },
        "prompt": "For $f(x)=\\sqrt{x-{{h}}}$ with $x\\ge{{h}}$, what is the inverse's domain?",
        "options": [
          "$x\\ge0$",
          "$x\\ge{{h}}$",
          "All real numbers",
          "$x<0$"
        ],
        "steps": [
          "The original range is $[0,\\infty)$.",
          "That range becomes the domain of the inverse."
        ],
        "derived": {},
        "correct": 0,
        "kind": "choice"
      }
    ]
  },
  {
    "id": "2.9",
    "title": "Logarithmic Expressions",
    "subtitle": "Convert logarithmic statements to exponential statements.",
    "sections": [
      {
        "title": "Definition",
        "text": "$\\log_b(a)=c$ is equivalent to $b^c=a$ where $b>0$, $b\\ne1$, and $a>0$. A logarithm is the exponent you need."
      },
      {
        "title": "Understand special bases",
        "text": "Common log $\\log(x)$ is base 10 in typical school notation; natural log $\\ln(x)$ is base $e$. Both are defined for positive real arguments."
      },
      {
        "title": "Evaluate powers and reciprocals",
        "text": "Since $2^5=32$, $\\log_2(32)=5$. Since $2^{-3}=1/8$, $\\log_2(1/8)=-3$. Logarithms can be negative."
      }
    ],
    "worked": [
      {
        "prompt": "Evaluate $\\log_3(81)$.",
        "steps": [
          "Because $3^4=81$, the exponent is 4.",
          "So $\\log_3(81)=4$."
        ]
      },
      {
        "prompt": "Evaluate $\\log_2(1/16)$.",
        "steps": [
          "$1/16=2^{-4}$.",
          "Hence $\\log_2(1/16)=-4$."
        ]
      }
    ],
    "pitfalls": [
      "The log argument must be strictly positive.",
      "The result is an exponent, not a quotient."
    ],
    "visual": {
      "kind": "flow",
      "nodes": [
        "b^c = a",
        "Base b",
        "Exponent c",
        "log_b(a) = c"
      ]
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "b": [
            2,
            5
          ],
          "k": [
            2,
            5
          ]
        },
        "prompt": "Evaluate $\\log_{{b}}({{b^k}})$.",
        "answer": "k",
        "steps": [
          "Convert to ${{b}}^x={{b^k}}$.",
          "The exponent is $x={{k}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "b": [
            2,
            5
          ],
          "k": [
            1,
            5
          ]
        },
        "prompt": "Evaluate $\\log_{{b}}(1/{{b^k}})$.",
        "answer": "-k",
        "steps": [
          "$1/{{b^k}}={{b}}^{-{{k}}}$.",
          "The logarithm is $-{{k}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "b": [
            2,
            4
          ],
          "m": [
            2,
            5
          ],
          "n": [
            1,
            4
          ]
        },
        "prompt": "Evaluate $\\log_{{b}}({{b}}^{{{m}}}\\cdot{{b}}^{{{n}}})$.",
        "answer": "m+n",
        "steps": [
          "Multiplication of equal bases adds exponents.",
          "$\\log_{{b}}({{b}}^{{{m+n}}})={{m+n}}$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.10",
    "title": "Inverses of Exponential Functions",
    "subtitle": "Use logarithms to reverse exponential rules.",
    "sections": [
      {
        "title": "Undo $b^x$",
        "text": "For $f(x)=b^x$ with positive base not equal to 1, the inverse is $f^{-1}(x)=\\log_b(x)$. Its domain is $x>0$ and range is all real numbers."
      },
      {
        "title": "Undo a leading coefficient",
        "text": "For $f(x)=ab^x$ with $a>0$, divide output by $a$ before taking a logarithm: $f^{-1}(y)=\\log_b(y/a)$."
      },
      {
        "title": "Graph interpretation",
        "text": "Inverse graphs reflect over $y=x$. The horizontal asymptote $y=0$ of an exponential becomes the vertical asymptote $x=0$ of its logarithmic inverse."
      }
    ],
    "worked": [
      {
        "prompt": "Find the inverse of $f(x)=2^x$.",
        "steps": [
          "Swap $x$ and $y$ in $y=2^x$ to get $x=2^y$.",
          "Solve for $y$: $y=\\log_2(x)$."
        ]
      },
      {
        "prompt": "Solve $5\\cdot3^x=135$.",
        "steps": [
          "Divide by five: $3^x=27$.",
          "Since $3^3=27$, $x=3$."
        ]
      }
    ],
    "pitfalls": [
      "Use the logarithm only on positive arguments.",
      "Inverse notation is not a reciprocal."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "2^x",
        "log(2,x)",
        "x"
      ],
      "xMin": -2,
      "xMax": 6,
      "yMin": -2,
      "yMax": 6,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "b": [
            2,
            5
          ],
          "k": [
            2,
            5
          ]
        },
        "prompt": "For $f(x)={{b}}^x$, find $f^{-1}({{b^k}})$.",
        "answer": "k",
        "steps": [
          "$f^{-1}(y)=\\log_{{b}}(y)$.",
          "$\\log_{{b}}({{b^k}})={{k}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "a": [
            2,
            6
          ],
          "b": [
            2,
            4
          ],
          "k": [
            2,
            4
          ]
        },
        "prompt": "$f(x)={{a}}\\cdot{{b}}^x$. Find $f^{-1}({{a*b^k}})$.",
        "answer": "k",
        "steps": [
          "Divide the output by {{a}} to obtain {{b^k}}.",
          "$\\log_{{b}}({{b^k}})={{k}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "a": [
            2,
            8
          ]
        },
        "prompt": "What is the domain of the inverse of $f(x)={{a}}\\cdot2^x$?",
        "options": [
          "$x>0$",
          "All real numbers",
          "$x<0$",
          "$x>{{a}}$"
        ],
        "steps": [
          "The original range is all positive numbers.",
          "The inverse's domain is therefore $(0,\\infty)$."
        ],
        "derived": {},
        "correct": 0,
        "kind": "choice"
      }
    ]
  },
  {
    "id": "2.11",
    "title": "Logarithmic Functions",
    "subtitle": "Domains, vertical asymptotes, and graph behavior.",
    "sections": [
      {
        "title": "Basic graph",
        "text": "$y=\\log_b(x)$ passes through $(1,0)$ and $(b,1)$ and has vertical asymptote $x=0$. It increases for $b>1$ and decreases for $0<b<1$."
      },
      {
        "title": "Domain and range",
        "text": "Logarithm arguments must be positive. For $\\log_b(x-h)$ the domain is $x>h$ and the asymptote is $x=h$. The range of an unrestricted logarithm is all real numbers."
      },
      {
        "title": "Find intercepts",
        "text": "Set $y=0$ and solve an exponential equation to get an $x$-intercept. Vertical shifts change the intercept but not the restriction on the argument."
      }
    ],
    "worked": [
      {
        "prompt": "Find the domain of $\\log_2(x-4)$.",
        "steps": [
          "Require $x-4>0$.",
          "So $x>4$ and the asymptote is $x=4$."
        ]
      },
      {
        "prompt": "Find the x-intercept of $\\log_2(x)+1$.",
        "steps": [
          "Set $\\log_2(x)=-1$.",
          "Then $x=2^{-1}=1/2$."
        ]
      }
    ],
    "pitfalls": [
      "Logarithms do not include zero in their domain.",
      "A log with a base between 0 and 1 decreases."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "log(2,x)",
        "log(2,x-2)+1"
      ],
      "xMin": -1,
      "xMax": 10,
      "yMin": -4,
      "yMax": 5,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "b": [
            2,
            5
          ],
          "k": [
            1,
            5
          ]
        },
        "prompt": "Evaluate $f({{b^k}})$ for $f(x)=\\log_{{b}}(x)$.",
        "answer": "k",
        "steps": [
          "$\\log_b(b^k)=k$.",
          "The result is {{k}}."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "h": [
            1,
            9
          ]
        },
        "prompt": "Which is the domain of $f(x)=\\log_2(x-{{h}})$?",
        "options": [
          "$x>{{h}}$",
          "$x<{{h}}$",
          "All real numbers",
          "$x\\ge0$"
        ],
        "steps": [
          "The argument must be positive.",
          "$x-{{h}}>0$ gives $x>{{h}}$."
        ],
        "derived": {},
        "correct": 0,
        "kind": "choice"
      },
      {
        "tier": 3,
        "vars": {
          "b": {
            "values": [
              2,
              4,
              5
            ]
          },
          "h": [
            1,
            8
          ]
        },
        "prompt": "Find the x-intercept of $f(x)=\\log_{{b}}(x-{{h}})+1$. Give a fraction or decimal.",
        "answer": "h+1/b",
        "steps": [
          "Set $\\log_{{b}}(x-{{h}})=-1$.",
          "Then $x={{h}}+1/{{b}}={{h+1/b}}$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.12",
    "title": "Logarithmic Function Manipulation",
    "subtitle": "Use logarithm laws, change of base, and shifts.",
    "sections": [
      {
        "title": "Logarithm laws",
        "text": "For positive $M,N$: $\\log_b(MN)=\\log_b(M)+\\log_b(N)$ and $\\log_b(M/N)=\\log_b(M)-\\log_b(N)$. Also $\\log_b(M^p)=p\\log_b(M)$."
      },
      {
        "title": "Change of base",
        "text": "$\\log_b(x)=\\ln(x)/\\ln(b)$ allows evaluation using ordinary calculators. Both logarithms in the quotient must use the same base."
      },
      {
        "title": "Shift and stretch",
        "text": "$a\\log_b(x-h)+k$ shifts right by $h$ and up by $k$, and scales vertically by $a$. The vertical asymptote remains at $x=h$."
      }
    ],
    "worked": [
      {
        "prompt": "Expand $\\log_2(8x)$ for $x>0$.",
        "steps": [
          "Use the product law: $\\log_2(8)+\\log_2(x)$.",
          "Simplify to $3+\\log_2(x)$."
        ]
      },
      {
        "prompt": "Evaluate $\\log_4(64)$.",
        "steps": [
          "Use change of base: $\\ln(64)/\\ln(4)$.",
          "The result is $3$ because $4^3=64$."
        ]
      }
    ],
    "pitfalls": [
      "$\\log(a+b)$ cannot be split into a sum of logarithms.",
      "Keep the original domain restrictions."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "log(2,x)",
        "2*log(2,x-2)+1"
      ],
      "xMin": -1,
      "xMax": 10,
      "yMin": -5,
      "yMax": 8,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "b": [
            2,
            4
          ],
          "m": [
            2,
            4
          ],
          "n": [
            1,
            3
          ]
        },
        "prompt": "Evaluate $\\log_{{b}}({{b}}^{{{m}}})+\\log_{{b}}({{b}}^{{{n}}})$.",
        "answer": "m+n",
        "steps": [
          "Each log cancels the corresponding power.",
          "Add the exponents: ${{m}}+{{n}}={{m+n}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "b": [
            2,
            4
          ],
          "m": [
            3,
            6
          ],
          "n": [
            1,
            2
          ]
        },
        "prompt": "Evaluate $\\log_{{b}}({{b}}^{{{m}}}/{{b}}^{{{n}}})$.",
        "answer": "m-n",
        "steps": [
          "Division subtracts exponents.",
          "The result is ${{m}}-{{n}}={{m-n}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "h": [
            2,
            7
          ],
          "k": [
            1,
            5
          ],
          "b": [
            2,
            4
          ]
        },
        "prompt": "Find $f({{h+1}})$ for $f(x)=3\\log_{{b}}(x-{{h}})+{{k}}$.",
        "answer": "k",
        "steps": [
          "The argument is ${{h+1}}-{{h}}=1$.",
          "Since $\\log_{{b}}(1)=0$, the answer is {{k}}."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.13",
    "title": "Exponential and Logarithmic Equations and Inequalities",
    "subtitle": "Solve for unknown exponents and respect domains.",
    "sections": [
      {
        "title": "Exponential equations",
        "text": "If $b^u=b^v$ with $b>0$ and $b\\ne1$, then $u=v$. Otherwise use logarithms: $b^x=c$ gives $x=\\ln(c)/\\ln(b)$ for positive $c$."
      },
      {
        "title": "Logarithmic equations",
        "text": "Rewrite $\\log_b(g(x))=c$ as $g(x)=b^c$. Solve, then check every original log argument is positive. Algebra can introduce invalid candidates."
      },
      {
        "title": "Inequalities",
        "text": "For bases above 1, exponentials and logarithms increase, preserving inequalities. For bases between 0 and 1, they decrease, reversing inequalities."
      }
    ],
    "worked": [
      {
        "prompt": "Solve $3^{2x}=81$.",
        "steps": [
          "Write $81=3^4$.",
          "So $2x=4$ and $x=2$."
        ]
      },
      {
        "prompt": "Solve $\\log_2(x-1)>3$.",
        "steps": [
          "Since base 2 is increasing, $x-1>8$.",
          "The solution is $x>9$, satisfying the domain."
        ]
      }
    ],
    "pitfalls": [
      "Always check logarithm argument restrictions.",
      "For a base less than one, reverse inequality comparisons."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "2^x",
        "8"
      ],
      "xMin": -2,
      "xMax": 6,
      "yMin": 0,
      "yMax": 22,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "b": [
            2,
            5
          ],
          "k": [
            2,
            5
          ]
        },
        "prompt": "Solve ${{b}}^x={{b^k}}$ for $x$.",
        "answer": "k",
        "steps": [
          "Same positive base on each side.",
          "Therefore $x={{k}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "b": [
            2,
            5
          ],
          "h": [
            1,
            8
          ],
          "k": [
            2,
            4
          ]
        },
        "prompt": "Solve $\\log_{{b}}(x-{{h}})={{k}}$.",
        "answer": "h+b^k",
        "steps": [
          "Exponentiate: $x-{{h}}={{b^k}}$.",
          "Therefore $x={{h+b^k}}$, which is in the domain."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "k": [
            2,
            8
          ]
        },
        "prompt": "Solve $(1/2)^x<(1/2)^{{k}}$.",
        "options": [
          "$x>{{k}}$",
          "$x<{{k}}$",
          "$x={{k}}$",
          "All real inputs"
        ],
        "steps": [
          "$1/2$ is a decreasing exponential base.",
          "To make the output smaller, make the exponent larger: $x>{{k}}$."
        ],
        "derived": {},
        "correct": 0,
        "kind": "choice"
      }
    ]
  },
  {
    "id": "2.14",
    "title": "Logarithmic Function Context and Data Modeling",
    "subtitle": "Use logs in sound, acidity, and measured trends.",
    "sections": [
      {
        "title": "Logarithmic scales",
        "text": "Logarithms compress large multiplicative ratios into additive changes. One step on a base-10 logarithmic scale represents multiplication by ten."
      },
      {
        "title": "Sound and chemistry",
        "text": "Sound intensity level follows $L=10\\log_{10}(I/I_0)$ decibels. For hydrogen-ion concentration in mol/L, $pH=-\\log_{10}([H^+])$."
      },
      {
        "title": "Context modeling",
        "text": "A relationship $y=a+b\\log_{10}(t)$ changes by $b$ each time $t$ multiplies by ten. Domain restrictions and physical meaning matter when extrapolating."
      }
    ],
    "worked": [
      {
        "prompt": "Sound intensity increases 100 times.",
        "steps": [
          "$\\Delta L=10\\log_{10}(100)$.",
          "The increase is $20$ decibels."
        ]
      },
      {
        "prompt": "Find pH if $[H^+]=10^{-4}$ mol/L.",
        "steps": [
          "$pH=-\\log_{10}(10^{-4})$.",
          "Therefore $pH=4$."
        ]
      }
    ],
    "pitfalls": [
      "Do not treat log-scale changes as ordinary additive increases.",
      "The logarithm's argument must stay positive."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "10*log(10,x)"
      ],
      "xMin": 0.1,
      "xMax": 100,
      "yMin": -12,
      "yMax": 22,
      "semiLog": false
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "k": [
            1,
            5
          ]
        },
        "prompt": "Sound intensity rises by a factor of {{10^k}}. What is the increase in decibels?",
        "answer": "10*k",
        "steps": [
          "$\\Delta L=10\\log_{10}({{10^k}})$.",
          "$10({{k}})={{10*k}}$ decibels."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "k": [
            2,
            9
          ]
        },
        "prompt": "Hydrogen-ion concentration is $10^{-{{k}}}$ mol/L. What is the pH?",
        "answer": "k",
        "steps": [
          "$pH=-\\log_{10}(10^{-{{k}}})$.",
          "$pH={{k}}$."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "a": [
            2,
            15
          ],
          "b": [
            2,
            9
          ],
          "t": {
            "values": [
              10,
              100,
              1000
            ]
          }
        },
        "prompt": "A model is $y={{a}}+{{b}}\\log_{10}(t)$. Find $y$ when $t={{t}}$.",
        "answer": "a+b*log(10,t)",
        "steps": [
          "$\\log_{10}({{t}})={{log(10,t)}}$.",
          "$y={{a}}+{{b}}({{log(10,t)}})={{a+b*log(10,t)}}$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  },
  {
    "id": "2.15",
    "title": "Semi-log Plots",
    "subtitle": "Why exponentials become straight lines on log axes.",
    "sections": [
      {
        "title": "Read the axes",
        "text": "A semi-log plot uses a logarithmic scale on one axis and a linear scale on the other. On a base-10 logarithmic vertical axis, equally spaced ticks may be 1, 10, 100, 1000."
      },
      {
        "title": "Turn exponentials into lines",
        "text": "For $y=ab^x$ with positive $a,b$, $\\log_{10}(y)=\\log_{10}(a)+x\\log_{10}(b)$. This is a straight line in coordinates $(x,\\log_{10}(y))$."
      },
      {
        "title": "Interpret the slope",
        "text": "The straight-line slope on the transformed graph is $\\log_{10}(b)$, where $b$ is the ratio per unit of $x$. Nonpositive outputs cannot be displayed on ordinary logarithmic axes."
      }
    ],
    "worked": [
      {
        "prompt": "Plot $y=5\\cdot10^{2x}$ on semi-log axes.",
        "steps": [
          "Take logs: $\\log_{10}(y)=\\log_{10}(5)+2x$.",
          "The transformed graph is a line with slope 2."
        ]
      },
      {
        "prompt": "Values at $x=0,1,2$ are $2,20,200$.",
        "steps": [
          "Each step multiplies output by 10.",
          "So $y=2\\cdot10^x$, giving semi-log slope 1."
        ]
      }
    ],
    "pitfalls": [
      "A straight semi-log graph often corresponds to exponential data, not a linear original model.",
      "Logarithmic axes cannot display zero or negative values."
    ],
    "visual": {
      "kind": "graph",
      "functions": [
        "2*10^x"
      ],
      "xMin": 0,
      "xMax": 3,
      "yMin": 1,
      "yMax": 2200,
      "semiLog": true
    },
    "problems": [
      {
        "tier": 1,
        "vars": {
          "a": [
            2,
            9
          ],
          "r": [
            2,
            5
          ]
        },
        "prompt": "Semi-log data have values {{a}}, {{a*r}}, {{a*r^2}} at equal time steps. What is their common ratio?",
        "answer": "r",
        "steps": [
          "Divide consecutive values: ${{a*r}}/{{a}}={{r}}$.",
          "The next ratio is also {{r}}."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 2,
        "vars": {
          "a": [
            2,
            9
          ],
          "r": {
            "values": [
              10,
              100,
              1000
            ]
          }
        },
        "prompt": "For $y={{a}}\\cdot{{r}}^x$, find the slope of $\\log_{10}(y)$ against $x$.",
        "answer": "log(10,r)",
        "steps": [
          "Taking log gives $\\log_{10}(y)=\\log_{10}({{a}})+x\\log_{10}({{r}})$.",
          "The slope is {{log(10,r)}}."
        ],
        "derived": {},
        "kind": "number"
      },
      {
        "tier": 3,
        "vars": {
          "a": [
            2,
            8
          ],
          "r": [
            2,
            5
          ]
        },
        "prompt": "A straight semi-log pattern goes through $(0,{{a}})$ and $(1,{{a*r}})$ in original coordinates. Predict $y$ at $x=3$.",
        "answer": "a*r^3",
        "steps": [
          "The multiplicative factor is ${{a*r}}/{{a}}={{r}}$.",
          "$y(3)={{a}}({{r}})^3={{a*r^3}}$."
        ],
        "derived": {},
        "kind": "number"
      }
    ]
  }
];
