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

export const validateUserId = (userId: string): string | null => {
  return (
    minLength(8)(userId) || maxLength(10)(userId) || containsDigit(userId) || containEn(userId)
  );
};

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
