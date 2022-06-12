import { Container, styled } from '@mui/material';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { UnitRoutesProvider } from 'shared/contexts/unit-routes-context';
import { url } from 'shared/helpers';
import { Logo } from 'shared/ui/logo';
import { HEIGHT } from '../constants';
import { HeaderRoutes } from '../types';
import { AccountDispatcher } from './account-dispatcher';

const Root = styled(Container)(({ theme }) => ({
  height: HEIGHT,
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: `0 0 ${HEIGHT}px`,
}));

export type HeaderProps = {
  usedRoutes: HeaderRoutes;
};

export const Header: FC<HeaderProps> = ({ usedRoutes }) => {
  const location = useLocation();
  const params = new URLSearchParams({
    redirect: location.pathname,
  });

  const unitRoutes: HeaderRoutes = {
    ...usedRoutes,
    signIn: url(usedRoutes.signIn, params),
    signUp: url(usedRoutes.signUp, params),
  };

  return (
    <Root maxWidth={false}>
      <UnitRoutesProvider routes={unitRoutes}>
        <Logo />
        <AccountDispatcher />
      </UnitRoutesProvider>
    </Root>
  );
};
