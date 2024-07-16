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
var seed = lat + long;

async function welcome() {
    console.log(chalk.bgBlueBright.whiteBright("Hello, ") + chalk.bgBlueBright.yellowBright("sunshine!"));
}

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
}

async function perlin() {
    var noise = new ValueNoise(seed)
    var time = hour + meridiem + min * 0.01
    var value = noise.evalX(time);

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
            console.log(`Weather at ${hour + meridiem}:${min} at ( ${lat}, ${long} ):`);
            break;
    }
    console.log(value);
}

await welcome();
await askLoc();
await perlin();