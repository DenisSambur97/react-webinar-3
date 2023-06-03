import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import AuthUser from "../../components/auth-user";
import UserBar from "../../components/user-bar";

function Auth() {
  const store = useStore();

    const { t } = useTranslate();

  const select = useSelector(state => ({
    login: state.auth.login,
    password: state.auth.password,
    isLogged: state.auth.isLogged,
    error: state.auth.error
  }));

  const callbacks = {
    // Вход в профайл
      onLogin: useCallback((login, password) => store.actions.auth.sign(login,password), [store]),
      onLogout: useCallback(() => store.actions.auth.logout(), [store])
  }

  return (
    <PageLayout>
      <UserBar login={select.login} isLogged={select.isLogged} onLogout={callbacks.onLogout}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <AuthUser
          login={select.login}
          password={select.password}
          onLogin={callbacks.onLogin}
          isLogged={select.isLogged}
          error={select.error}
      />
    </PageLayout>
  );
}

export default memo(Auth);
