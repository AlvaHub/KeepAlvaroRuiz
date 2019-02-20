import React from 'react';


export function formatNumber(x) {
    if (x == null || isNaN(x)) return "";
    var parts = x.toString().split(".");
    if (parts.length == 1)
        parts.push("00");
    if (parts[1].length > 2)
        parts[1] = parts[1].substring(0, 2);
    if (parts[1].length == 1)
        parts[1] += "0";

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}
export function getData(path) {
    return fetch(path).then(data => data.json());
}
export function postData(path, dataInput) {
    return fetch(path, {
        method: 'post', body: JSON.stringify(dataInput)
    }).then(data => data.json());
}