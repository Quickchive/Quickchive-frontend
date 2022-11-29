function saveAccessTokenToCookie(value) {
  document.cookie = `accessToken=${value}`;
}

function saveUserToCookie(value) {
  document.cookie = `bookmark_user=${value}`;
}

function getAccessTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)bookmark_user\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAccessTokenToCookie,
  saveUserToCookie,
  getAccessTokenFromCookie,
  getUserFromCookie,
  deleteCookie,
};
