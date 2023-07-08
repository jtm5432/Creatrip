/**
 * 이 파일은 수정하지 말아주세요.
 */
const delay = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const mockSuccess = async () => {
  await delay(1000);
  return Promise.resolve();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFail = async () => {
  await delay(1000);
  return Promise.reject(new Error('회원가입 실패'));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signUp = async (id: string, password: string): Promise<void> => {
  /** 10% 확률로 실패 할 수 있습니다. */
  if (Math.random() > 0.1) {
    await mockSuccess();
  } else {
    await mockFail();
  }
};

export default signUp;
