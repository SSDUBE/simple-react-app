import { Routes, Route } from 'react-router-dom';
import { RouteItems } from './constants';

const AppRoutes = () => {
  return (
    <Routes>
      {Object.keys(RouteItems).map((key: any) => {
        const routeExtraProps: { element?: any } = {};

        if (RouteItems[key].base.Component) {
          routeExtraProps.element = RouteItems[key].base.Component;
        }

        return (
          <Route
            path={RouteItems[key].base.path}
            {...routeExtraProps}
            key={key}
          >
            {RouteItems[key].routes.map((route, idx) => {
              const { paths, Component } = route;
              const routeComponents = [];

              for (let i = 0; i < paths.length; i++) {
                routeComponents.push(
                  <Route
                    key={`${idx}${i}`}
                    path={paths[i]}
                    element={<Component name={'this is passed'} />}
                  />
                );
              }

              return routeComponents;
            })}
          </Route>
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
