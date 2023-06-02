import {memo, useCallback, useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import UserBar from "../../components/user-bar";
import Profile from "../../components/profile";

function ProfilePage() {
    const store = useStore();

    const select = useSelector(state => ({
        data: state.auth.data,
    }));

    const {t} = useTranslate();

    const callbacks = {
        onLoad: useCallback(() => store.actions.auth.load(), [store])
    }

  return (
    <PageLayout>
      <UserBar/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Profile onLoad={callbacks.onLoad} data={select.data}

      />
    </PageLayout>
  );
}

export default memo(ProfilePage);
