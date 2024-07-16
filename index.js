import chalk from "chalk";
import number from "@inquirer/number";
import select from "@inquirer/select";
import { createSpinner } from "nanospinner";
import { ValueNoise } from "value-noise-js";

var lat;
var long;
var hour;
var min;
var meridiem;
var timeFormat;
var seed;

async function welcome() {
    console.log(chalk.bgBlueBright.whiteBright("Hello, ") + chalk.bgBlueBright.yellowBright("sunshine!"));
}

// Sets the seed
async function askLoc() {
    lat = await number({ message: "Enter your latitude" });
    long = await number({message: "Enter your longitude"});
    timeFormat = await select({
        message: "12 hour or 24 hour time?",
        choices: [
            {
                name: "12 hr",
                value: 0
            },
            {
                name: "24 hr",
                value: 1
            }
        ]
    });

    switch (timeFormat) {
        case 0:
            hour = await number({message: "Enter the hour"});
            min = await number({message: "Enter the minute"});
            meridiem = await select({
                message: "AM or PM?",
                choices: [
                    {
                        name: "AM",
                        value: 0
                    },
                    {
                        name: "PM",
                        value: 12
                    }
                ]
            });
            break;
        case 1:
            hour = await number({message: "Enter the hour"});
            min = await number({message: "Enter the minute"});
            meridiem = 0;
            break;
    }

    seed = lat + long;
}

// Sets the weather using seed
async function perlin() {
    var noise = new ValueNoise(seed);
    var time = hour + meridiem + (min * 0.01);
    var weather = Math.floor(noise.evalX(time) * 100);

    switch (timeFormat) {
        case 0:

            switch (meridiem) {
                case 0:
                    console.log(`Weather at ${hour}:${min} AM at ( ${lat}, ${long} ):`);
                    break;
                case 12:
                    console.log(`Weather at ${hour}:${min} PM at ( ${lat}, ${long} ):`);
                    break;
            }
            break;

        case 1:
            console.log(`Weather at ${hour + meridiem}:${min} at ( ${lat} , ${long} ):`);
            break;
    }

    timeScroll();

    async function timeScroll() {
        let i = 0;
        while (i <= 60) {
            var noise = new ValueNoise(seed);
            var time = hour + meridiem + (min * 0.01);
            var weather = Math.floor(noise.evalX(time) * 100);
            getWeather();

            function getWeather() {
                if (weather == 100) {
                    console.log("Downpour of scalding hot coffee");

                } else if (weather >= 90 && weather <= 99) {
                    console.log("Hail of peanuts");
                    
                } else if (weather >= 80 && weather <= 99) {
                    console.log("Angel death");

                } else if (weather >= 70 && weather <= 89) {
                    console.log("Sonder");
        
                } else if (weather >= 60 && weather <= 79) {
                    console.log("Blood rain");

                } else if (weather >= 50 && weather <= 69) {
                    console.log("Melancholic thunder");
        
                } else if (weather >= 40 && weather <= 59) {
                    console.log("Cacophony of screams");

                } else if (weather >= 30 && weather <= 39) {
                    console.log("Your favorite YouTuber is cancelled");
        
                } else if (weather >= 20 && weather <= 39) {
                    console.log("Blinding sunlight");

                } else if (weather >= 10 && weather <= 19) {
                    console.log("Devilfrost");
        
                } else if (weather <= 9) {
                    console.log("Bone wind");
        
                } else {
                    console.log("Blackholey");
                }
            }

            min = min + 10;
            i++;
            await sleep(5000);
        }
    }

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}

await welcome();
await askLoc();
await perlin();