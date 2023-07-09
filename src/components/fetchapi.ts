import signUp from '../api/signUp';
const ServerIP = 'http://127.0.0.1:5173';

interface User {
  id: string;
  password: string;
}

export const apiUrls = {
  SignUp: signUp,

  // login: `${baseURL}/login`,
  // getUser: `${baseURL}/user`,
};

export const fetch_async =
  (apiUrl: string) =>
  async (...args: any[]): Promise<void> => {
    try {
      // 성공적으로 처리됨
    } catch (error) {
      // 네트워크 요청 자체에 문제가 있거나 서버에서 오류 응답을 받았을 때
      console.error('Error:', error);
      throw error;
    }
  };
