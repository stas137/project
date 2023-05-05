import { screen } from '@testing-library/react';
import { ComponentRender } from '@/shared/config/tests/ComponentRender/ComponentRender';
import { AppRouter } from './AppRouter';
import {
  getRouteAbout, getRouteAdminPanel, getRouteArticles, getRouteProfile,
} from '@/shared/const/router';
import { UserRole } from '@/entities/User';

describe('AppRouter.test', () => {
  it('About page is render', async () => {
    ComponentRender(<AppRouter />, { route: getRouteAbout() });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  it('Page is not found', async () => {
    ComponentRender(<AppRouter />, { route: '/123' });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  it('Redirect when user is unauthorized', async () => {
    ComponentRender(<AppRouter />, { route: getRouteArticles() });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  it('Redirect when user is unauthorized', async () => {
    ComponentRender(<AppRouter />, { route: getRouteProfile('1') });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  it('User is authorized and can open ProfilePage', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { authData: {} },
      },
    });

    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });

  it('Redirect when user is authorized and is not an admin', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          authData: {},
        },
      },
    });

    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  it('AdminPanelPage open when user is authorized and admin', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          authData: {
            roles: [UserRole.ADMIN],
          },
        },
      },
    });

    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
