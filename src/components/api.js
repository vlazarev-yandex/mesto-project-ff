const authorizationToken = "936197d7-9c28-4a02-b461-a2e30a81b6a7";

export const GET = (url) => {
  return fetch(url, {
    headers: {
      authorization: authorizationToken,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("[GET] Успешно", res, url);
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .catch((err) => {
      console.log(`Ошибка в запросе GET: ${err}.`);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};

export const PATCH = (obj, url) => {
  return fetch(url, {
    method: "PATCH",
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) {
        console.log("[PATCH] Успешно", obj, url, res);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка в запросе PATCH:", err, obj, url);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};

export const DELETE = (url) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("[DELETE] Успешно", res, url);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка в запросе DELETE:", err, url);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};

export const POST = (obj, url) => {
  return fetch(url, {
    method: "POST",
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) {
        console.log("[POST] Успешно", obj, url);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка в запросе POST:", obj, url, err);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};

export const PUT = (obj, url) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      authorization: authorizationToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) {
        console.log("[PUT] Успешно", obj, url);
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка в запросе PUT:", obj, url, err);
      return Promise.reject(`Что-то пошло не так: ${err}`);
    });
};
