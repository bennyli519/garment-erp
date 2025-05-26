// TODO: Implement actual email sending logic
export async function sendResetPasswordEmail(
  email: string,
  token: string,
  userName: string,
  companyName: string
): Promise<void> {
  console.log('Reset password email would be sent to:', email);
  console.log('Reset token:', token);
  console.log('User name:', userName);
  console.log('Company name:', companyName);
} 