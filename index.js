import chalk from "chalk";
import number from "@inquirer/number";
import { createSpinner } from "nanospinner";
import { ValueNoise } from "value-noise-js";

var lat;
var long;
var seed;
var seed = lat + long;

async function welcome() {
    console.log(chalk.bgBlueBright.whiteBright("Hello, ") + chalk.bgBlueBright.yellowBright("sunshine!"));
}

async function askLoc() {
    lat = await number({ message: "Enter your latitude" });
    long = await number({message: "Enter your longitude"});
}

async function perlin() {
    const noise = new ValueNoise(seed)

    var x = 1;

    // Evaluate at x
    var value = noise.evalX(x);
    console.log(value);
}

await welcome();
await askLoc();
await perlin();