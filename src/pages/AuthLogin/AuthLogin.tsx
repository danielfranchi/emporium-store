import React, { useRef, useState } from 'react';

import { Redirect } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import { api } from '../../services/api';
import './AuthLogin.css';

const AuthLogin = () => {
  const [loginUser, setLoginUser] = useState<any>(false);
  const [account, setAccount] = useState<boolean>(false);

  const email = useRef<HTMLInputElement>(null);
  const senha = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  const login = (e: any) => {
    e.preventDefault();
    const requisicao = {
      email: email.current?.value,
      password: senha.current?.value,
    };

    api
      .post('auth/login', requisicao)
      .then((response) => {
        localStorage.setItem('token', response.data.access_token);
        setLoginUser(true);
      })
      .catch((erro) => {
        toast.error('Usuário ou senha invalido');
      });
  };

  const createAcount = (e: any) => {
    e.preventDefault();
    setAccount(!account);
  };

  return (
    <>
      <Header />
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>

      <div className="login-box">
        <form>
          {account ? <h1>Criar conta</h1> : <h1>Login</h1>}

          {account && (
            <div className="textbox">
              <input
                name="text"
                type="text"
                ref={name}
                placeholder="name"
                required
              />
            </div>
          )}

          <div className="textbox">
            <input
              name="email"
              type="email"
              ref={email}
              placeholder="e-mail"
              required
            />
          </div>

          <div className="textbox">
            <input
              name="password"
              type="password"
              ref={senha}
              placeholder="senha"
              autoComplete="off"
            />
          </div>

          <br />

          {account ? (
            <Button text="Criar conta" onClick={login} />
          ) : (
            <Button text="Entrar" onClick={login} />
          )}

          <span onClick={createAcount}>
            {account ? 'Login' : 'Criar conta'}
          </span>
        </form>

        {loginUser && <Redirect to="/carryBag" />}
      </div>
    </>
  );
};

export default AuthLogin;
