import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: 'POST',
    body: JSON.stringify(signupRequest)
  });
}

// export function checkAliasAvailability(alias) {
//     return request({
//         url: API_BASE_URL + "/user/checkAliasAvailability?username=" + username,
//         method: 'GET'
//     });
// }
//
// export function checkEmailAvailability(email) {
//     return request({
//         url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
//         method: 'GET'
//     });
// }

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/trainers/me",
        method: 'GET'
    });
}


export function createPost(postData) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/trainers/me/posts",
        method: 'POST',
        body: JSON.stringify(postData)
    });
}

export function getAllPosts() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/posts",
        method: 'GET'
    });
}

export function getAllMyPosts() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/trainers/me/posts",
        method: 'GET'
    });
}

export function searchPostByAlias(alias) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/posts/search?alias=" + alias,
        method: 'GET'
    });
}

export function getAllPostsByTrainerId(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/trainers/"+ id + "/posts",
        method: 'GET'
    });
}
