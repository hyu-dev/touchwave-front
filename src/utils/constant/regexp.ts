export const regexp = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/g,
  nickname: /^[a-zA-Z가-힣]{1,15}$/g,
  teamname: /^[a-zA-Z가-힣]{1,15}$/g,
  buttonname: /^[a-zA-Z가-힣]{1,15}$/g,
};
