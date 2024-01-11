import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div>
      <SignIn afterSignUpUrl={'/dashboard'} />
    </div>
  );
}
