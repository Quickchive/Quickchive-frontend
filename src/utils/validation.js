// 비밀번호 검사
function validatePw(pw) {
	const re =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&^])[A-Za-z\d$@$!%*#?&^]{8}$/;
	return re.test(String(pw.toLowerCase()));
}

export { validatePw };
