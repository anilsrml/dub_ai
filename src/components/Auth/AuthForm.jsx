import { useState } from "react";
import Input from "./AuthInput";
import { FiArrowRight, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const AuthForm = (onClose) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-300 hover:text-blue-400 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Logo/Brand */}
      <div className="flex justify-center mb-6">
        <div className="text-white font-bold text-2xl flex items-center">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            AI Dublaj
          </span>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white/10 rounded-lg p-1">
          <button
            className={`btn btn-secondary `}
            onClick={() => setIsLogin(true)}>
            Giriş Yap
          </button>
          <button
            className={`btn btn-secondary`}
            onClick={() => setIsLogin(false)}>
            Kayıt Ol
          </button>
        </div>
      </div>

      {/* Form Title */}
      <h2 className="text-2xl font-bold text-center text-white mb-2">
        {isLogin ? "Hesabınıza Giriş Yapın" : "Yeni Hesap Oluşturun"}
      </h2>
      <p className="text-gray-300 text-center mb-8">
        {isLogin
          ? "Devam etmek için giriş yapın"
          : "Başlamak için hesabınızı oluşturun"}
      </p>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            name="name"
            type="text"
            placeholder="Ad Soyad"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            icon="user"
          />
        )}

        <Input
          name="email"
          type="email"
          placeholder="E-posta Adresi"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon="email"
        />

        <Input
          name="password"
          type="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon="password"
        />

        {!isLogin && (
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Şifre Tekrar"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon="password"
          />
        )}

        {isLogin && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-300">
                Beni Hatırla
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
              Şifremi Unuttum?
            </a>
          </div>
        )}

        <button type="submit" className="btn btn-secondary">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          <FiArrowRight className="ml-2 animate-pulse" />
        </button>
      </form>

      {/* Social Login */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-gray-400">
              veya sosyal medya ile
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-colors">
            <FiGithub className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-colors">
            <FiTwitter className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-colors">
            <FiLinkedin className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
            {isLogin ? "Kayıt Ol" : "Giriş Yap"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
