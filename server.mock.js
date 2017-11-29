var bodyParser = require('body-parser');
var url = require('url');

var sampleData =
[
    {
        "id": "58f875f89ea4127f3bcda2b5",
        "index": 0,
        "isActive": true,
        "balance": "$2,382.63",
        "age": 37,
        "name": "Shepard",
        "surname": "Reyes",
        "address": "S. GEORGIA AND S. SANDWICH ISLS.",
        "email": "undefined.undefined@undefined.co.uk",
        "phone": "+421 (812) 413-2935"
    },
    {
        "id": "58f875f8d52a07fcf6bcbd00",
        "index": 1,
        "isActive": false,
        "balance": "$1,711.72",
        "age": 20,
        "name": "Merrill",
        "surname": "Campos",
        "address": "ST. PIERRE AND MIQUELON",
        "email": "undefined.undefined@undefined.tv",
        "phone": "+421 (912) 518-3510"
    },
    {
        "id": "58f875f84f8f9880f2a0f86b",
        "index": 2,
        "isActive": false,
        "balance": "$3,108.37",
        "age": 23,
        "name": "Cotton",
        "surname": "Fry",
        "address": "US MINOR OUTLYING ISLANDS",
        "email": "undefined.undefined@undefined.ca",
        "phone": "+421 (988) 491-2831"
    },
    {
        "id": "58f875f8f8d7f6b39ae2330e",
        "index": 3,
        "isActive": true,
        "balance": "$1,465.11",
        "age": 20,
        "name": "Huffman",
        "surname": "Mcgowan",
        "address": "JORDAN",
        "email": "undefined.undefined@undefined.com",
        "phone": "+421 (914) 537-2551"
    },
    {
        "id": "58f875f863873e62ad42eba2",
        "index": 4,
        "isActive": false,
        "balance": "$1,976.55",
        "age": 23,
        "name": "Elisabeth",
        "surname": "Douglas",
        "address": "CHINA",
        "email": "undefined.undefined@undefined.org",
        "phone": "+421 (821) 440-2007"
    },
    {
        "id": "58f875f8d02c9d505da161a2",
        "index": 5,
        "isActive": true,
        "balance": "$3,285.29",
        "age": 32,
        "name": "Valenzuela",
        "surname": "Hurley",
        "address": "ARGENTINA",
        "email": "undefined.undefined@undefined.io",
        "phone": "+421 (854) 416-2598"
    },
    {
        "id": "58f875f8cce4751911b58f22",
        "index": 6,
        "isActive": true,
        "balance": "$1,159.23",
        "age": 39,
        "name": "Nelda",
        "surname": "Hogan",
        "address": "COCOS (KEELING ISLANDS)",
        "email": "undefined.undefined@undefined.info",
        "phone": "+421 (838) 561-2483"
    },
    {
        "id": "58f875f87a98990d925f0474",
        "index": 7,
        "isActive": false,
        "balance": "$3,241.48",
        "age": 35,
        "name": "Alice",
        "surname": "Rose",
        "address": "INDONESIA",
        "email": "undefined.undefined@undefined.us",
        "phone": "+421 (852) 412-3606"
    },
    {
        "id": "58f875f8612ddb0d0708d132",
        "index": 8,
        "isActive": true,
        "balance": "$1,255.01",
        "age": 24,
        "name": "Francis",
        "surname": "Wong",
        "address": "GUADELOUPE",
        "email": "undefined.undefined@undefined.biz",
        "phone": "+421 (870) 580-2911"
    },
    {
        "id": "58f875f864bdc2b43223da8a",
        "index": 9,
        "isActive": false,
        "balance": "$2,989.46",
        "age": 37,
        "name": "Savage",
        "surname": "Mack",
        "address": "ETHIOPIA",
        "email": "undefined.undefined@undefined.me",
        "phone": "+421 (895) 600-3375"
    },
    {
        "id": "58f875f81b4d07c5c7e20c84",
        "index": 10,
        "isActive": false,
        "balance": "$1,778.29",
        "age": 27,
        "name": "Mindy",
        "surname": "Montoya",
        "address": "VIRGIN ISLANDS (BRITISH)",
        "email": "undefined.undefined@undefined.net",
        "phone": "+421 (979) 429-2204"
    },
    {
        "id": "58f875f8552456d4345382b6",
        "index": 11,
        "isActive": false,
        "balance": "$2,911.02",
        "age": 36,
        "name": "Monroe",
        "surname": "Kramer",
        "address": "BOUVET ISLAND",
        "email": "undefined.undefined@undefined.biz",
        "phone": "+421 (811) 519-2845"
    },
    {
        "id": "58f875f8157929d72c603757",
        "index": 12,
        "isActive": true,
        "balance": "$3,599.70",
        "age": 38,
        "name": "Donovan",
        "surname": "Hunt",
        "address": "GEORGIA",
        "email": "undefined.undefined@undefined.co.uk",
        "phone": "+421 (806) 568-2947"
    },
    {
        "id": "58f875f8c06c0027cfabff57",
        "index": 13,
        "isActive": true,
        "balance": "$1,579.72",
        "age": 24,
        "name": "Boyer",
        "surname": "Ware",
        "address": "CAMBODIA",
        "email": "undefined.undefined@undefined.tv",
        "phone": "+421 (851) 544-2634"
    },
    {
        "id": "58f875f88a462402625e6318",
        "index": 14,
        "isActive": false,
        "balance": "$1,873.51",
        "age": 33,
        "name": "Rogers",
        "surname": "Lopez",
        "address": "SEYCHELLES",
        "email": "undefined.undefined@undefined.ca",
        "phone": "+421 (853) 545-3450"
    },
    {
        "id": "58f875f88b68fd03e39e3645",
        "index": 15,
        "isActive": false,
        "balance": "$3,401.11",
        "age": 39,
        "name": "Walton",
        "surname": "Benson",
        "address": "TOKELAU",
        "email": "undefined.undefined@undefined.com",
        "phone": "+421 (929) 462-2024"
    },
    {
        "id": "58f875f86c930413499b4144",
        "index": 16,
        "isActive": false,
        "balance": "$2,783.32",
        "age": 25,
        "name": "Bowen",
        "surname": "French",
        "address": "TOGO",
        "email": "undefined.undefined@undefined.org",
        "phone": "+421 (968) 498-3465"
    },
    {
        "id": "58f875f810b2f0885fbc3142",
        "index": 17,
        "isActive": true,
        "balance": "$2,581.73",
        "age": 29,
        "name": "Corine",
        "surname": "Dillard",
        "address": "FAROE ISLANDS",
        "email": "undefined.undefined@undefined.io",
        "phone": "+421 (990) 527-3790"
    },
    {
        "id": "58f875f83a38dba3c26741f5",
        "index": 18,
        "isActive": false,
        "balance": "$3,417.50",
        "age": 20,
        "name": "Barbara",
        "surname": "Potter",
        "address": "PALAU",
        "email": "undefined.undefined@undefined.info",
        "phone": "+421 (946) 501-2316"
    },
    {
        "id": "58f875f831fd89d526560f75",
        "index": 19,
        "isActive": false,
        "balance": "$3,609.39",
        "age": 32,
        "name": "Stella",
        "surname": "Vazquez",
        "address": "ST. HELENA",
        "email": "undefined.undefined@undefined.us",
        "phone": "+421 (887) 422-2376"
    },
    {
        "id": "58f875f8dfa040f095a05d89",
        "index": 20,
        "isActive": false,
        "balance": "$1,985.47",
        "age": 32,
        "name": "Bowman",
        "surname": "Contreras",
        "address": "IRELAND",
        "email": "undefined.undefined@undefined.biz",
        "phone": "+421 (820) 589-2183"
    },
    {
        "id": "58f875f8714f3bf6468b40e2",
        "index": 21,
        "isActive": false,
        "balance": "$1,431.46",
        "age": 40,
        "name": "Flynn",
        "surname": "Meyer",
        "address": "CHRISTMAS ISLAND",
        "email": "undefined.undefined@undefined.me",
        "phone": "+421 (847) 401-2114"
    },
    {
        "id": "58f875f8d4464086f7854de5",
        "index": 22,
        "isActive": false,
        "balance": "$2,929.49",
        "age": 31,
        "name": "Blair",
        "surname": "Pena",
        "address": "ANGOLA",
        "email": "undefined.undefined@undefined.net",
        "phone": "+421 (902) 591-2866"
    },
    {
        "id": "58f875f894bb0f6f90129720",
        "index": 23,
        "isActive": false,
        "balance": "$2,783.35",
        "age": 25,
        "name": "Meredith",
        "surname": "Mcmahon",
        "address": "PARAGUAY",
        "email": "undefined.undefined@undefined.biz",
        "phone": "+421 (999) 554-2294"
    },
    {
        "id": "58f875f8b1f52f371ccf9a9c",
        "index": 24,
        "isActive": true,
        "balance": "$3,507.93",
        "age": 38,
        "name": "Jacobs",
        "surname": "Freeman",
        "address": "BOSNIA AND HERZEGOVINA",
        "email": "undefined.undefined@undefined.co.uk",
        "phone": "+421 (915) 402-3889"
    },
    {
        "id": "58f875f82285731fbf7c342e",
        "index": 25,
        "isActive": false,
        "balance": "$2,496.65",
        "age": 38,
        "name": "Hillary",
        "surname": "Hanson",
        "address": "GHANA",
        "email": "undefined.undefined@undefined.tv",
        "phone": "+421 (996) 489-2364"
    },
    {
        "id": "58f875f8b64c587a5a179a2e",
        "index": 26,
        "isActive": true,
        "balance": "$2,282.08",
        "age": 24,
        "name": "Weber",
        "surname": "Rios",
        "address": "MAURITANIA",
        "email": "undefined.undefined@undefined.ca",
        "phone": "+421 (968) 497-3280"
    },
    {
        "id": "58f875f8abc8dc3047b9d04f",
        "index": 27,
        "isActive": false,
        "balance": "$3,345.41",
        "age": 39,
        "name": "Vega",
        "surname": "Day",
        "address": "ARMENIA",
        "email": "undefined.undefined@undefined.com",
        "phone": "+421 (983) 439-3094"
    },
    {
        "id": "58f875f8fd386845803e493c",
        "index": 28,
        "isActive": false,
        "balance": "$3,446.36",
        "age": 33,
        "name": "Noble",
        "surname": "Daugherty",
        "address": "MAURITIUS",
        "email": "undefined.undefined@undefined.org",
        "phone": "+421 (829) 403-3452"
    },
    {
        "id": "58f875f8806b9a0b69526ea9",
        "index": 29,
        "isActive": true,
        "balance": "$1,611.77",
        "age": 27,
        "name": "Sherrie",
        "surname": "Frank",
        "address": "BURKINA FASO",
        "email": "undefined.undefined@undefined.io",
        "phone": "+421 (937) 545-2767"
    },
    {
        "id": "58f875f8ae3ad90cdd4aed38",
        "index": 30,
        "isActive": false,
        "balance": "$1,214.58",
        "age": 38,
        "name": "Sherman",
        "surname": "Hensley",
        "address": "VENEZUELA",
        "email": "undefined.undefined@undefined.info",
        "phone": "+421 (897) 426-2776"
    },
    {
        "id": "58f875f8ebd53d963c038808",
        "index": 31,
        "isActive": false,
        "balance": "$3,741.14",
        "age": 21,
        "name": "Bonner",
        "surname": "Henderson",
        "address": "ANTIGUA AND BARBUDA",
        "email": "undefined.undefined@undefined.us",
        "phone": "+421 (960) 502-3672"
    },
    {
        "id": "58f875f8182eb999bb66e169",
        "index": 32,
        "isActive": false,
        "balance": "$2,206.20",
        "age": 37,
        "name": "Kathie",
        "surname": "Hobbs",
        "address": "NAURU",
        "email": "undefined.undefined@undefined.biz",
        "phone": "+421 (810) 494-3494"
    },
    {
        "id": "58f875f8ded244b623defc19",
        "index": 33,
        "isActive": false,
        "balance": "$3,352.41",
        "age": 31,
        "name": "Bridget",
        "surname": "Stephenson",
        "address": "SOUTH AFRICA",
        "email": "undefined.undefined@undefined.me",
        "phone": "+421 (810) 589-2712"
    },
    {
        "id": "58f875f8166ebaaff4b415dd",
        "index": 34,
        "isActive": true,
        "balance": "$1,470.42",
        "age": 27,
        "name": "Frances",
        "surname": "Carrillo",
        "address": "BOTSWANA",
        "email": "undefined.undefined@undefined.net",
        "phone": "+421 (911) 553-2160"
    },
    {
        "id": "58f875f84bd27f72d13c8a39",
        "index": 35,
        "isActive": true,
        "balance": "$3,288.12",
        "age": 40,
        "name": "Collins",
        "surname": "Mendez",
        "address": "BANGLADESH",
        "email": "undefined.undefined@undefined.biz",
        "phone": "+421 (969) 600-3173"
    },
    {
        "id": "58f875f8c5c140824f38128a",
        "index": 36,
        "isActive": true,
        "balance": "$2,641.27",
        "age": 22,
        "name": "Rodriquez",
        "surname": "Collins",
        "address": "MEXICO",
        "email": "undefined.undefined@undefined.co.uk",
        "phone": "+421 (935) 539-3253"
    },
    {
        "id": "58f875f83cdc29c6ceac0390",
        "index": 37,
        "isActive": true,
        "balance": "$1,845.42",
        "age": 30,
        "name": "Samantha",
        "surname": "Tanner",
        "address": "FIJI",
        "email": "undefined.undefined@undefined.tv",
        "phone": "+421 (841) 559-2446"
    },
    {
        "id": "58f875f8b316597aeefb597c",
        "index": 38,
        "isActive": false,
        "balance": "$1,096.76",
        "age": 25,
        "name": "Betty",
        "surname": "Mcintyre",
        "address": "SAN MARINO",
        "email": "undefined.undefined@undefined.ca",
        "phone": "+421 (851) 425-3815"
    },
    {
        "id": "58f875f8cd8b2bdf9a9e51a2",
        "index": 39,
        "isActive": false,
        "balance": "$2,674.63",
        "age": 21,
        "name": "Everett",
        "surname": "Norton",
        "address": "MALAWI",
        "email": "undefined.undefined@undefined.com",
        "phone": "+421 (895) 589-2927"
    },
    {
        "id": "58f875f8dac9d503b1aad634",
        "index": 40,
        "isActive": true,
        "balance": "$1,048.18",
        "age": 30,
        "name": "Anita",
        "surname": "Mcneil",
        "address": "TANZANIA",
        "email": "undefined.undefined@undefined.org",
        "phone": "+421 (913) 528-2086"
    },
    {
        "id": "58f875f873c40e0546039476",
        "index": 41,
        "isActive": false,
        "balance": "$2,501.88",
        "age": 40,
        "name": "Lottie",
        "surname": "Joseph",
        "address": "SAINT LUCIA",
        "email": "undefined.undefined@undefined.io",
        "phone": "+421 (847) 446-3471"
    },
    {
        "id": "58f875f8690b74ac5a325721",
        "index": 42,
        "isActive": false,
        "balance": "$1,212.21",
        "age": 30,
        "name": "Cynthia",
        "surname": "Bauer",
        "address": "MONTSERRAT",
        "email": "undefined.undefined@undefined.info",
        "phone": "+421 (886) 518-2934"
    },
    {
        "id": "58f875f8ae537f003e8543cf",
        "index": 43,
        "isActive": true,
        "balance": "$2,613.50",
        "age": 38,
        "name": "Kay",
        "surname": "Mcfadden",
        "address": "GUINEA",
        "email": "undefined.undefined@undefined.us",
        "phone": "+421 (837) 420-2987"
    },
    {
        "id": "58f875f8a5c81a3d2a653c17",
        "index": 44,
        "isActive": false,
        "balance": "$2,689.03",
        "age": 36,
        "name": "Fisher",
        "surname": "Benjamin",
        "address": "UNITED STATES",
        "email": "undefined.undefined@undefined.biz",
        "phone": "+421 (996) 537-2526"
    },
    {
        "id": "58f875f8833baad7b115517e",
        "index": 45,
        "isActive": true,
        "balance": "$2,080.41",
        "age": 21,
        "name": "Lillian",
        "surname": "Kemp",
        "address": "AZERBAIJAN",
        "email": "undefined.undefined@undefined.me",
        "phone": "+421 (914) 481-2172"
    },
    {
        "id": "58f875f8d99a0e0968a1ab21",
        "index": 46,
        "isActive": false,
        "balance": "$2,262.44",
        "age": 30,
        "name": "Holcomb",
        "surname": "Heath",
        "address": "MARTINIQUE",
        "email": "undefined.undefined@undefined.net",
        "phone": "+421 (821) 582-3525"
    },
    {
        "id": "58f875f8036c2e69d0fa12f6",
        "index": 47,
        "isActive": true,
        "balance": "$1,768.29",
        "age": 34,
        "name": "Alexander",
        "surname": "Holder",
        "address": "UZBEKISTAN",
        "email": "undefined.undefined@undefined.biz",
        "phone": "+421 (849) 477-2202"
    }
]

module.exports = function(app)
{
    var originalUse = app.use;

    app.use = function()
    {
        var regex = arguments[0];
        var func = arguments[1];
        var method;

        if(arguments.length == 3)
        {
            regex = arguments[1];
            func = arguments[2];
            method = arguments[0];
        }

        var methodSelector = function(req, res, next)
        {
            if(!method)
            {
                return true;
            }

            if(method == req.method)
            {
                if(!arguments[3])
                {
                    func(req, res, next);
                }

                return true;
            }
            else
            {
                next();

                return false;
            }
        };

        if(regex instanceof RegExp)
        {
            return originalUse.call(this, function (req, res, next)
            {
                if(!methodSelector(req, res, next, true))
                {
                    return;
                }

                if(regex.test(req.originalUrl))
                {
                    req.matches = regex.exec(req.originalUrl);

                    func(req, res, next);
                }
                else
                {
                    next();
                }
            });
        }

        if(method)
        {
            return originalUse.call(this, arguments[1], methodSelector);
        }
        else
        {
            return originalUse.apply(this, arguments);
        }
    };

    var user = null;

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/api/authentication', function (req, res, next)
    {
        console.time(`GET ${req.originalUrl}`);

        res.statusCode = 204;

        if(req.body.j_username != 'admin' || req.body.j_password != 'admin')
        {
            res.statusCode = 401;
        }
        else
        {
            user = true;
        }

        res.end(null);

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use('/api/longcall', function (req, res, next)
    {
        setTimeout(() =>
        {
            res.statusCode = 204;
            res.end(null);
        }, 120000);
    });

    app.use('/api/unauthorized', function (req, res, next)
    {
        console.time(`GET ${req.originalUrl}`);

        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 401;

        res.end(null);

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use('/api/continue', function (req, res, next)
    {
        console.time(`GET ${req.originalUrl}`);

        res.setHeader('Content-Type', 'application/json');

        res.statusCode = 100;
        res.end(null);

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use('/api/badRequest', function (req, res, next)
    {
        console.time(`GET ${req.originalUrl}`);

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;

        res.end(null);

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use('/api/logout', function (req, res, next)
    {
        console.time(`GET ${req.originalUrl}`);

        user = null;

        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 204;

        res.end(null);

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use('/api/myaccount', function (req, res, next)
    {
        console.time(`GET ${req.originalUrl}`);

        var data =
        {
            login: 'mock-user',
            privileges:
            [
                'userGroup-menu',
                'logoutAction-menu',
                'samplesGroup-menu',
                'gridSample-page',
                'bootstrapSample-page',
                'commonSample-page',
                'notificationsSample-page',
                'authorizationSample-page',
                'home-page'
            ]
        };

        if(!user)
        {
            res.statusCode = 401;
        }

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(data));

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use('/api/config/release', function (req, res, next)
    {
        console.time(`GET ${req.originalUrl}`);

        var data =
        {
            release: "1.0.0-server.0",
            title: "CONNECT-MOCK"
        };

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(data));

        console.time(`GET ${req.originalUrl}`);
    });

    app.use('/api/grid-data', function (req, res, next) 
    {
        console.time(`GET ${req.originalUrl}`);

        var data = sampleData;
        var query = url.parse(req.url, true).query;

        let items = data.length;
        let last = true;

        if(query.size && query.page)
        {
            let size = parseInt(query.size);
            let page = parseInt(query.page);

            data = data.slice(page * size, (page * size) + size);
            last = items <= (page * size) + size;
        }
        
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(
        {
            content: data,
            last: last,
            totalElements: sampleData.length
        }));

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use('/api/data', function (req, res, next)
    {
        console.time(`GET ${req.originalUrl}`);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({greeting: 'Hello', name: 'World'}));

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use('GET', /api\/cis/, function (req, res, next)
    {
        var data;
        var urlParts = url.parse(req.url, true);
        var query = urlParts.query;

        //detail request
        data =
        [
            {
                "kod": "P80747",
                "popis": "Larsen Monroe"
            },
            {
                "kod": "3105230",
                "popis": "Guadalupe Bean"
            },
            {
                "kod": "5956332045406944970a0153",
                "popis": "Lee Bond"
            },
            {
                "kod": "595633206ac136c3123f6698",
                "popis": "Mcbride Berger"
            },
            {
                "kod": "59563320b694184f8452de43",
                "popis": "Gilda Estes"
            },
            {
                "kod": "59563320f6520e0001bfebe4",
                "popis": "Watts Rodriquez"
            },
            {
                "kod": "59563320aa1405840788e9c4",
                "popis": "Blackwell Peters"
            },
            {
                "kod": "59563320e51dc4c15f7c5425",
                "popis": "Solis Cline"
            },
            {
                "kod": "59563320f0a28a57f6611af5",
                "popis": "Suzette Montgomery"
            },
            {
                "kod": "59563320c28675efe8053bad",
                "popis": "Christi Cortez"
            },
            {
                "kod": "595633206f2b237f813e3310",
                "popis": "Slater Dickerson"
            },
            {
                "kod": "5956332031fa37dd1f57f11b",
                "popis": "Hope Paul"
            },
            {
                "kod": "595633201b104140ebc4d9d3",
                "popis": "Edith Farmer"
            },
            {
                "kod": "P83216",
                "popis": "Ofelia Arnold"
            },
            {
                "kod": "59563320985fc8ed3c5edefe",
                "popis": "Vickie Hewitt"
            },
            {
                "kod": "595633204806ec013fa0b3e7",
                "popis": "Bethany Boyer"
            },
            {
                "kod": "59563320a5d22738d3ee6f6b",
                "popis": "Franklin Ware"
            },
            {
                "kod": "P85687",
                "popis": "Pena Cleveland"
            },
            {
                "kod": "5956332099b4395952452586",
                "popis": "Sherrie Guerrero"
            },
            {
                "kod": "59563320f9b36b0e595aebd0",
                "popis": "Mckenzie Meyers"
            },
            {
                "kod": "595633202698b67d5d8af31d",
                "popis": "Mae Oneil"
            },
            {
                "kod": "P40707",
                "popis": "Shelly Potts"
            },
            {
                "kod": "59563320d1e1ca7a6b0b0d38",
                "popis": "Rodgers Wooten"
            },
            {
                "kod": "59563320a5649f883c65f8b4",
                "popis": "Brooke Bolton"
            },
            {
                "kod": "59563320c5425dbf8a8e191c",
                "popis": "Case Chambers"
            },
            {
                "kod": "595633201b92e339b9d34580",
                "popis": "Alma Olson"
            },
            {
                "kod": "59563320e15c488ca35b59fb",
                "popis": "Janis Medina"
            },
            {
                "kod": "P66599",
                "popis": "Katelyn Wolfe"
            },
            {
                "kod": "595633206275281529aac76d",
                "popis": "Marsh Gomez"
            },
            {
                "kod": "59563320ab0f0508c8cd3dcb",
                "popis": "Mccullough Coleman"
            },
            {
                "kod": "59563320841e6f97ce163d10",
                "popis": "Claire Montoya"
            },
            {
                "kod": "59563320698efde749e16f4f",
                "popis": "Acevedo Marks"
            },
            {
                "kod": "5956332052e49cf6bed05426",
                "popis": "Estrada Trujillo"
            },
            {
                "kod": "59563320ab1a70e1f07563d6",
                "popis": "Moody Stone"
            },
            {
                "kod": "595633202d7cce7adb7e4542",
                "popis": "Wyatt Booth"
            },
            {
                "kod": "59563320dca25a88a6e90586",
                "popis": "Kathrine Huber"
            },
            {
                "kod": "P77017",
                "popis": "Melinda Rush"
            },
            {
                "kod": "N92725",
                "popis": "Rosella Meyer"
            },
            {
                "kod": "P79469",
                "popis": "Michele Duncan"
            },
            {
                "kod": "595633203ce30997481927c6",
                "popis": "Garcia Ray"
            },
            {
                "kod": "59563320c088c6abd49b969d",
                "popis": "Sonja Thornton"
            },
            {
                "kod": "59563320ea97da7350e035a4",
                "popis": "Murphy Mcfadden"
            },
            {
                "kod": "595633201c9d05544782f260",
                "popis": "Macdonald Ayers"
            },
            {
                "kod": "59563320e3d5ad637c57dadb",
                "popis": "Dolores Rosales"
            },
            {
                "kod": "595633201bab97d8ce3976a2",
                "popis": "Anna Moore"
            },
            {
                "kod": "59563320b7a44f5a230975a6",
                "popis": "Sophie Beard"
            },
            {
                "kod": "59563320d2d974927b95608d",
                "popis": "Mack Gallegos"
            },
            {
                "kod": "5956332073a28413843c565e",
                "popis": "Odom Eaton"
            },
            {
                "kod": "5956332007f9a9b6cfb26402",
                "popis": "Travis Robbins"
            },
            {
                "kod": "595633207ad7497635db165c",
                "popis": "Roach Huff"
            },
            {
                "kod": "595633202c83589f5c9bbe66",
                "popis": "Clarissa Weber"
            },
            {
                "kod": "P80747",
                "popis": "Melanie Johns"
            },
            {
                "kod": "595633206e41c88fa23c3114",
                "popis": "Gretchen Garrison"
            },
            {
                "kod": "5956332028c4b32d93a10296",
                "popis": "Kathy Stephens"
            },
            {
                "kod": "595633200e3cecfaa9ba6eea",
                "popis": "Rosa Spencer"
            },
            {
                "kod": "595633201d62fc0328a49ae4",
                "popis": "Baldwin Sears"
            },
            {
                "kod": "5956332094c6052275a52474",
                "popis": "Myrna Glass"
            },
            {
                "kod": "59563320e968583168b3d6b9",
                "popis": "Jane Giles"
            },
            {
                "kod": "59563320ed0cc7fcf89895e4",
                "popis": "Mitzi Kaufman"
            },
            {
                "kod": "5956332045d51afd36a038da",
                "popis": "Avila Schroeder"
            },
            {
                "kod": "59563320b2b2b2fcd5281c3e",
                "popis": "Whitley Mcgee"
            },
            {
                "kod": "59563320fcd5a4048123c684",
                "popis": "Lauren Randolph"
            },
            {
                "kod": "595633200dfd3e8b01ec8efb",
                "popis": "Booker Erickson"
            },
            {
                "kod": "59563320b2418dbf5e520c21",
                "popis": "Walters Miles"
            },
            {
                "kod": "595633201a490fa75d0cbe36",
                "popis": "Koch Maynard"
            },
            {
                "kod": "59563320ddf411c50de75d2f",
                "popis": "Olive Madden"
            },
            {
                "kod": "5956332044ab228e62c299fe",
                "popis": "Mooney Bray"
            },
            {
                "kod": "595633204b18852458956ed9",
                "popis": "Angelina Moss"
            },
            {
                "kod": "5956332062f4a55561fb6bfa",
                "popis": "Malone Hooper"
            },
            {
                "kod": "5956332073f36c40632be0ad",
                "popis": "Merritt Stark"
            },
            {
                "kod": "5956332011da49d9b01b0ef4",
                "popis": "Jillian Allison"
            },
            {
                "kod": "59563320a94c207fb3152e60",
                "popis": "Nichols Sosa"
            },
            {
                "kod": "59563320c665c0cb533f7e44",
                "popis": "Jan Fulton"
            },
            {
                "kod": "595633202cac7505eafffd82",
                "popis": "Bryant Mcmillan"
            },
            {
                "kod": "595633209ac614239526077d",
                "popis": "Wiley Gilliam"
            },
            {
                "kod": "59563320e8ec520816e539a0",
                "popis": "Nannie Chapman"
            },
            {
                "kod": "59563320500b05784a684c10",
                "popis": "Moran Mcdonald"
            },
            {
                "kod": "59563320d8f0d6e6603924b1",
                "popis": "Lorna Wiley"
            },
            {
                "kod": "59563320846db5bd5121dfad",
                "popis": "Norman Finley"
            },
            {
                "kod": "59563320fd12a1ea2a05e552",
                "popis": "Therese Atkinson"
            }
        ];

        if(query.search)
        {
            data = data.filter(itm => itm.popis.toLowerCase().indexOf(query.search.toLowerCase()) >= 0);
        }

        if(query.size)
        {
            let size = parseInt(query.size);

            data = data.slice(0, size);
        }

        console.time(`GET ${req.originalUrl}`);
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(
        {
            content: data
        }));

        console.timeEnd(`GET ${req.originalUrl}`);
    });

    app.use = originalUse;
};
