/**
 * 이 파일은 애플리케이션의 API 호출을 정의합니다.
 *
 * `apiUrls` 객체는 애플리케이션에서 사용하는 모든 API의 URL을 관리합니다.
 *
 */
import signUp from '../api/signUp';


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
