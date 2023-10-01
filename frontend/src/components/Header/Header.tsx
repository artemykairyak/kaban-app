'use client';
import Logo from '../images/logo.svg';
import SearchIcon from '../images/search.svg';
import { ReactSVG } from 'react-svg';
import s from './styles.module.scss';
import { Avatar } from '@/components/Header/components/Avatar';
import { User } from '@/types/types';
import { useBoardStore } from '@/store/BoardStore';
import { Input } from '@/components/ui/Input/Input';

const testUser: User = {
  name: 'Artemy',
  surname: 'Kairyak',
  email: 'kek@kek.ru',
  avatar: 'https://www.serebii.net/scarletviolet/pichugift.jpg',
  id: 1,
};

export const Header = () => {
  const { searchString, setSearchString } = useBoardStore(
    ({ searchString, setSearchString }) => ({
      searchString,
      setSearchString,
    }),
  );
  const onSearch = (e) => {
    e.preventDefault();

    console.log('search');
  };

  return (
    <header className={s.header}>
      <a className={s.logo} href="/">
        <img src={Logo.src} alt="Kaban logo" className={s.logoPic} /> Kaban
      </a>
      <div className={s.controls}>
        <form className={s.search}>
          <Input
            name="search"
            placeholder="Search"
            icon={SearchIcon}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </form>
        <Avatar logged={true} user={testUser} />
      </div>
    </header>
  );
};
