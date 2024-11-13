import AuthForm from "@/app/login/AuthForm";

export default function LoginPage() {
  return (
    <section className="auth-page">
      <div className="inner card py-[20px] px-[35px] w-[360px]">
        <AuthForm />
      </div>
    </section>
  );
}
