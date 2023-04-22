import { userService } from './user.service'
import { authHeader } from '../helpers/auth-header';

// Need to update to work with server.js responses!!
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (response.status !== 200) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const apiUrl = "http://127.0.0.1:8002"

function getProbands() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${apiUrl}/proband`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            return result
        })
}

async function getProbandById(proband) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    let cProband = proband.toString()

    return await fetch(`${apiUrl}/proband/id?id=${cProband}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            return result
        })
}

function getPheno(proband) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    console.log("Get Pheno called: " + proband)
    return fetch(`${apiUrl}/proband/pheno?id=${proband.substring(1, proband.length-1)}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            let text = result.map(({ text }) => text)
            console.log(text.join(" - "))
            return text.join(" - ")
        })
}
function getGenes(proband) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${apiUrl}/proband/genes?id=${proband}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            if (data) {
                return data
            }
            return "Error";
        });
}

export const api = {
    getProbands,
    getProbandById,
    getPheno,
    getGenes
};