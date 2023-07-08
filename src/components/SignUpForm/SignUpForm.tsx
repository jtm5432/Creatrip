import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDebounce } from '../hooks';
import { validateUserId, validatePassword } from '../auth'
export default function SignUpForm() {
  const [userId, setUserId] = useState<string>('');
  const [passwords, setPasswords] = useState<{ password: string; confirmPassword: string }>({ password: '', confirmPassword: '' });
  const [enableChanges, setEnableChanges] = useState<{ ID: Boolean;password: Boolean; confirmPassword: Boolean }>({ ID:false, password: false, confirmPassword: false });
  const [CheckResults, setCheckResults] = useState<{ ID:string | null; password: string | null; confirmPassword: string | null }>({ID:'', password: '', confirmPassword: '' });
   
  const debouncedUserId = useDebounce(userId, 500);
  const debouncedPassword = useDebounce(passwords, 500);


  useEffect(() => {
    if (debouncedUserId && enableChanges["ID"]) {
      console.log(`User ID: ${debouncedUserId}`);
      setCheckResults(prevState => ({
        ...prevState,
        "ID":  validateUserId(`${debouncedUserId}`),
      }));
    }
  }, [debouncedUserId,enableChanges["ID"]]);

  useEffect(() => {
    if (debouncedPassword && enableChanges["password"]) {
      console.log('debouncedPassword',debouncedPassword.password)
      setCheckResults(prevState => ({
        ...prevState,
        "password":  validatePassword(`${debouncedPassword.password}`),
      }));
    }
  }, [debouncedPassword,enableChanges["password"]]);

  useEffect(() => {
    if (debouncedPassword && enableChanges["confirmPassword"] ){
      let msg = (debouncedPassword.password !== debouncedPassword.confirmPassword )?  "password와 passwordConfirm이 서로 다릅니다." : '';
      setCheckResults(prevState => ({
        ...prevState,
        "confirmPassword":  `${msg}`,
      }));
    }
  }, [debouncedPassword,enableChanges["confirmPassword"]]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Submit form logic here. For instance, you could call an API.
    console.log(`User ID: ${userId}`);
    console.log(`Password: ${passwords.password}`);
  };
  const handleInputChange = (setState: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    
  };
  const handleInputChangeArray = (inputID: keyof typeof passwords) => (event: ChangeEvent<HTMLInputElement>) => {
    setPasswords(prevState => ({
      ...prevState,
      [inputID]: event.target.value,
    }));
  };
  const handleFocusOut = (inputID: keyof typeof enableChanges) => (event: React.FocusEvent<HTMLInputElement>) => {
    // Your logic here. For example:
    console.log(`${inputID} input lost focus. Current value: ${event.target.value}`);
  
    setEnableChanges(prevState => ({ ...prevState, [inputID]: true }));
   
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userId">
        User ID:
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={ handleInputChange(setUserId)}
          onBlur={enableChanges.ID ?  undefined : handleFocusOut("ID")}
        />
      </label>
      {CheckResults.ID && <p style={{ color: 'red' }}>{CheckResults.ID}</p>}
      <label htmlFor="password">
        Password:
        <input
          type="password"
          id="password"
          value={passwords.password}
          onChange={handleInputChangeArray("password")}
          onBlur={enableChanges.password ?  undefined : handleFocusOut("password")}
        />
      </label>
      {CheckResults.password && <p style={{ color: 'red' }}>{CheckResults.password}</p>}
      <label htmlFor="password">
        PasswordConfirm:
        <input
          type="password"
          id="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleInputChangeArray("confirmPassword")}
          onBlur={enableChanges.confirmPassword ?  undefined : handleFocusOut("confirmPassword")}
          // assuming you will add state and logic for password confirmation
        />  
      </label>
      {CheckResults.confirmPassword && <p style={{ color: 'red' }}>{CheckResults.confirmPassword}</p>}
      <button type="submit">Register</button>
    </form>
  );



}
