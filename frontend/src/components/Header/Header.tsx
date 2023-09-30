'use client';
import Logo from '../images/logo.svg';
import SearchIcon from '../images/search.svg';
import { ReactSVG } from 'react-svg';
import s from './styles.module.scss';
import { Avatar } from '@/components/Header/components/Avatar';
import { User } from '@/types/types';

const testUser: User = {
  name: 'Artemy',
  surname: 'Kairyak',
  email: 'kek@kek.ru',
  avatar: 'https://www.serebii.net/scarletviolet/pichugift.jpg',
  id: 1,
};

export const Header = () => {
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
          <input type="search" className={s.input} />
          <button className={s.searchBtn} onClick={onSearch}>
            <ReactSVG src={SearchIcon.src} />
          </button>
        </form>
        <Avatar logged={true} user={testUser} />
      </div>
    </header>
  );
};
