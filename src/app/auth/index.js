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

function Auth() {
  const store = useStore();

    const { t } = useTranslate();

  const select = useSelector(state => ({
    login: state.auth.login,
    password: state.auth.password
  }));

  const callbacks = {
    // Вход в профайл
      onLogin: useCallback((login, password) => store.actions.auth.sign(login,password), [store]),
  }

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <AuthUser
          login={select.login}
          password={select.password}
          onLogin={callbacks.onLogin}
          isLogged={select.isLogged}
      />
    </PageLayout>
  );
}

export default memo(Auth);
