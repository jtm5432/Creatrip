/**
 * 이 함수들은 사용자 입력값에 대한 제약조건을 검사하는 역할을 합니다.
 *
 */
type ValidationFn = (value: string) => string | null;

const minLength =
  (length: number): ValidationFn =>
  (value: string) =>
    value.length >= length ? null : `${length}자 이상이어야 합니다`;

const maxLength =
  (length: number): ValidationFn =>
  (value: string) =>
    value.length <= length ? null : `${length}자 이하이어야 합니다`;

const containsDigit: ValidationFn = (value: string) =>
  /\d/.test(value) ? null : '숫자를 포함해야 합니다';

const containsLowercase: ValidationFn = (value: string) =>
  /[a-z]/.test(value) ? null : '소문자를 포함해야 합니다';

const containsUppercase: ValidationFn = (value: string) =>
  /[A-Z]/.test(value) ? null : '대문자를 포함해야 합니다';

const containEn: ValidationFn = (value: string) =>
  !containsLowercase(value) || !containsUppercase(value) ? null : '문자를 포함해야 합니다';
/**
 * 사용자 ID를 유효성 검사하는 함수입니다.
 *
 * @param {string} userId - 유효성을 검사할 사용자 ID 문자열입니다.
 * @returns {string|null} - 모든 검사를 통과하면 null을 반환하고, 아니면 해당 에러 메시지를 반환합니다.
 */

export const validateUserId = (userId: string): string | null => {
  return (
    minLength(8)(userId) || maxLength(10)(userId) || containsDigit(userId) || containEn(userId)
  );
};
/**
 * 사용자 password를 유효성 검사하는 함수입니다.
 *
 * @param {string} password - 유효성을 검사할 사용자 password 문자열입니다.
 * @returns {string|null} - 모든 검사를 통과하면 null을 반환하고, 아니면 해당 에러 메시지를 반환합니다.
 */

export const validatePassword = (password: string): string | null => {
  console.log('validatePassword', password, password.length);
  return (
    minLength(1)(password) ||
    maxLength(10)(password) ||
    containsDigit(password) ||
    containsLowercase(password) ||
    containsUppercase(password)
  );
};
