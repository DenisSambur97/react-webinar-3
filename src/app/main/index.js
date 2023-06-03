import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import UserBar from "../../components/user-bar";
import useSelector from "../../hooks/use-selector";

function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

    const select = useSelector(state => ({
        data: state.auth.data,
        login: state.auth.login,
        isLogged: state.auth.isLogged
    }));

    const callbacks = {
        onLogout: useCallback(() => store.actions.auth.logout(), [store])
    }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserBar login={select.login} isLogged={select.isLogged} onLogout={callbacks.onLogout} name={select.data.profile}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
