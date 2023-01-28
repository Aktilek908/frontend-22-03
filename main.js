const som = document.querySelector("#som");
const label = document.querySelector("#label-converted");
const value = document.querySelector("#value-converted");
const select = document.querySelector("select");

const convert = (elem, target, isTrue) => {
    if (isTrue) {
        target.value = (elem.value / select.value).toFixed(2);
    } else {
        target.value = (elem.value * select.value).toFixed(2);
    }
    elem.value === "" && (target.value = "");
};

const getValues = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "data.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();
    request.onload = () => {
        const response = JSON.parse(request.response);
        for (const key in response) {
            if (Object.hasOwnProperty.call(response, key)) {
                const element = response[key];
                const option = document.createElement("option");
                option.innerHTML = key;
                option.value = element;
                select.append(option);
            }
        }
    }
}

select.addEventListener("change", () => convert(som, value, true))
som.addEventListener("input", () => convert(som, value, true))
value.addEventListener("input", () => convert(value, som, false))

getValues();
