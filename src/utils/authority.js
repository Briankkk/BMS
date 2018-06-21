// use sessionStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return sessionStorage.getItem('authority')||'guest';
}

export function setAuthority(authority) {
  return sessionStorage.setItem('authority', authority);
}

export function getCust() {
  return sessionStorage.getItem('cust_code')||'';
}

export function setCust(custCode) {
  return sessionStorage.setItem('cust_code', custCode);
}

export function getAuthCodeC(staffCode) {
  return localStorage.getItem('staff_c_'+staffCode)||'';
}

export function setAuthCodeC(staffCode,authCodeC) {
  return localStorage.setItem('staff_c_'+staffCode, authCodeC||'');
}

export function getAuthCodeS(staffCode) {
  return localStorage.getItem('staff_S_'+staffCode)||'';
}

export function setAuthCodeS(staffCode,authCodeS) {
  return localStorage.setItem('staff_S_'+staffCode, authCodeS||'');
}


