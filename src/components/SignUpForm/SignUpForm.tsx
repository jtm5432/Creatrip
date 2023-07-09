import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDebounce } from '../hooks';
import { validateUserId, validatePassword } from '../auth';
import { apiUrls } from '../fetchapi';

export default function SignUpForm() {
  const [userId, setUserId] = useState<string>('');
  const [passwords, setPasswords] = useState<{ password: string | null; confirmPassword: string | null; }>({
    password: null,
    confirmPassword: null,
  });
  const [enableChanges, setEnableChanges] = useState<{
    ID: Boolean;
    password: Boolean;
    confirmPassword: Boolean;
  }>({ ID: false, password: false, confirmPassword: false });
  const [CheckResults, setCheckResults] = useState<{
    ID: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({ ID: '', password: '', confirmPassword: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [submitMessage, setsubmitMessage] = useState<string | null>(null);

  const debouncedUserId = useDebounce(userId, 500);
  const debouncedPassword = useDebounce(passwords, 500);
  const register = apiUrls.SignUp;

  useEffect(() => {
    // 아이디와 비밀번호 값이 모두 유효한지 검사
    if (Object.values(CheckResults).every((value) => value === null)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [CheckResults]);
  /**
   * ID(debouncedUserId)
   * enableChanges['ID'] :아이디의 onBlur Event
   * validateUserId : 유효성 검증 함수
   */
  useEffect(() => {
    if (debouncedUserId && enableChanges['ID']) {
      setCheckResults((prevState) => ({
        ...prevState,
        ID: validateUserId(`${debouncedUserId}`),
      }));
    }
  }, [debouncedUserId, enableChanges['ID']]);
  /**
   * password(debouncedPassword.password)
   * enableChanges['password'] : password의 onBlur Event
   * validatePassword : 유효성 검증 함수
   */
  useEffect(() => {
    if (debouncedPassword.password && enableChanges['password']) {
      setCheckResults((prevState) => ({
        ...prevState,
        password: validatePassword(`${debouncedPassword.password}`),
      }));
    }
  }, [debouncedPassword, enableChanges['password']]);
  /**
   * confirmPassword(debouncedPassword.confirmPassword)
   * enableChanges['confirmPassword'] : confirmPassword의 onBlur Event
   * confirmPassword의 confirmPassword와 password가 다른 경우 errormsg
   */
  useEffect(() => {
    if (debouncedPassword !==null && enableChanges['confirmPassword']) {
      console.log('debouncedPassword',debouncedPassword.confirmPassword)
      let msg = (debouncedPassword.confirmPassword==='')
        ? 'passwordConfirm은 필수 입력 사항입니다.'
        : debouncedPassword.password !== debouncedPassword.confirmPassword
        ? 'password와 passwordConfirm이 서로 다릅니다.'
        : '';
      setCheckResults((prevState) => ({
        ...prevState,
        confirmPassword: msg ,
      }));
    }
  }, [debouncedPassword, enableChanges['confirmPassword']]);
  /**
   * 입력 값이 변경되었을 때 상태를 업데이트
   *
   * @param {React.Dispatch<React.SetStateAction<string>>} setState
   * @returns {React.ChangeEventHandler<HTMLInputElement>} 이벤트 핸들러
   */
  const handleInputChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  /**
   * 배열 입력 값이 변경되었을 때 상태를 업데이트
   *
   * @param {keyof typeof passwords} inputID - 입력 필드의 ID
   * @returns {React.ChangeEventHandler<HTMLInputElement>} 이벤트 핸들러
   */
  const handleInputChangeArray =
    (inputID: keyof typeof passwords) => (event: ChangeEvent<HTMLInputElement>) => {
      setPasswords((prevState) => ({
        ...prevState,
        [inputID]: event.target.value,
      }));
    };
  /**
   * Element에 대해 FocusOut시 해당 EnableChanges 값 변경
   *
   */
  const handleFocusOut =
    (inputID: keyof typeof enableChanges) => (event: React.FocusEvent<HTMLInputElement>) => {
      setEnableChanges((prevState) => ({ ...prevState, [inputID]: true }));
    };
  /**
   * Submit 버튼 Onclick
   */
  const handlesubmitClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    try {
      await register(userId, passwords.password);
      setsubmitMessage('Registration Success'); // 성공하면 성공 메시지를 초기화합니다.
      console.log('Registration success');
    } catch (error) {
      console.error('Registration failed:', error);
      setsubmitMessage('Registration failed'); // 실패하면 에러 메시지를 설정합니다.
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <form>
      <label htmlFor="userId">
        User ID:
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleInputChange(setUserId)}
          onBlur={enableChanges.ID ? undefined : handleFocusOut('ID')}
        />
      </label>
      {CheckResults.ID && <p style={{ color: 'red' }}>아이디는 {CheckResults.ID}</p>}
      <label htmlFor="password">
        Password:
        <input
          type="password"
          id="password"
          value={passwords.password}
          onChange={handleInputChangeArray('password')}
          onBlur={enableChanges.password ? undefined : handleFocusOut('password')}
        />
      </label>
      {CheckResults.password && <p style={{ color: 'red' }}>비밀번호는 {CheckResults.password}</p>}
      <label htmlFor="password">
        PasswordConfirm:
        <input
          type="password"
          id="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleInputChangeArray('confirmPassword')}
          onBlur={enableChanges.confirmPassword ? undefined : handleFocusOut('confirmPassword')}
          // assuming you will add state and logic for password confirmation
        />
      </label>
      {CheckResults.confirmPassword && (
        <p style={{ color: 'red' }}>{CheckResults.confirmPassword}</p>
      )}
      <button type="submit" disabled={isButtonDisabled} onClick={handlesubmitClick}>
        Register
      </button>
      {submitMessage && <div>{submitMessage}</div>}
    </form>
  );
}
