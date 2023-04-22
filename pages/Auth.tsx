import Input from '@/components/Input';
import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,

        username,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/streamingBackground.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/NetflixLogo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="self-center w-full px-16 py-16 mt-2 bg-black rounded-md bg-opacity-70 lg:max-w-md">
            <h2 className="mb-8 text-4xl font-semibold text-white">{variant === 'login' ? 'Sign In' : 'Register'}</h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  id="username"
                  type="text"
                  value={username}
                />
              )}

              <Input
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className="w-full py-3 mt-10 text-white transition bg-red-600 rounded-md hover:bg-red-700"
            >
              {variant === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              <div className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80">
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="mt-12 text-neutral-500">
              {variant === 'login' ? 'First time using Netflix' : 'Already have and account?'}
              <span onClick={toggleVariant} className="ml-1 text-white cursor-pointer hover:underline">
                {variant === 'login' ? 'Create an Account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
