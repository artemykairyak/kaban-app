import { ReactSVG } from 'react-svg';
import { FC } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

interface SVGProps {
  src: { src: string };
  className?: string;
}

export const SVG: FC<SVGProps> = ({ src, className }) => {
  return <ReactSVG src={src.src} className={clsx(s.svg, className)} />;
};
