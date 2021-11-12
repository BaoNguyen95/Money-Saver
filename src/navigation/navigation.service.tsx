import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator: any;
export default class NavigationService {

    setTopLevelNavigator = (ref: any) => {
        _navigator = ref;
    }

    navigate = (routeName: any, params?: any) => {
        _navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params
            })
        );
    }

    openDrawer = () => {
        _navigator.dispatch(
            DrawerActions.openDrawer()
        );
    }

    closeDrawer = () => {
        _navigator.dispatch(
            DrawerActions.closeDrawer()
        );
    }

    goBack = () => {
        _navigator.dispatch(
            NavigationActions.back()
        );
    }
}