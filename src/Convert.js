const convert = (kelvin) => {
    let answer = (kelvin - 273.15) * (9/5) + 32;
    return Math.round(answer);
}

export default convert;