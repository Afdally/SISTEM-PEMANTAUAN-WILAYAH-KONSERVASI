import { useNavigate } from "react-router";
import AdminIcon from "../../components/admin/AdminIcon";
import { adminSessionKey } from "../../components/admin/AdminGuard";
import "../../admin.css";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const signIn = () => {
    sessionStorage.setItem(adminSessionKey, "active");
    navigate("/admin", { replace: true });
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-wave" aria-hidden="true" />
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <div className="admin-login-brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span><strong>SIMEKA</strong><small>Admin KKP</small></span></div>
        <div className="admin-login-copy"><h1 id="admin-login-title">Login</h1></div>
        <form className="admin-login-form" onSubmit={(event) => { event.preventDefault(); signIn(); }}>
          <label htmlFor="admin-email">Email</label>
          <input id="admin-email" name="email" type="email" autoComplete="email" placeholder="nama@instansi.go.id" required />
          <label htmlFor="admin-password">Kata sandi</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" placeholder="Masukkan kata sandi" required />
          <button type="submit" className="admin-login-submit">Login</button>
        </form>
        <div className="admin-login-divider"><span>atau</span></div>
        <button type="button" className="admin-google-login" onClick={signIn}><i aria-hidden="true">G</i><span>Login dengan Google</span><AdminIcon name="arrow" /></button>
        <small>Mode desain · autentikasi belum terhubung</small>
      </section>
    </main>
  );
}

