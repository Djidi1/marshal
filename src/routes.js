import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import FormPage from './components/pages/FormPage';
import DynamicRoutePage from './components/pages/DynamicRoutePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PanelLeftPage from './components/pages/PanelLeftPage';
import PanelRightPage from './components/pages/PanelRightPage';
import NewRequestPage from "./components/pages/NewRequestPage";
import ResponsesPage from "./components/pages/ResponsesPage";
import ResponsePage from "./components/pages/ResponsePage";
import ChatPage from "./components/pages/ChatPage";
import StoresList from "./components/pages/StoresList";

export default [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/panel-left/',
        component: PanelLeftPage,
    },
    {
        path: '/panel-right/',
        component: PanelRightPage,
    },
    {
        path: '/about/',
        component: AboutPage,
    },
    {
        path: '/form/',
        component: FormPage,
    },
    {
        path: '/messages/',
        component: ChatPage,
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
    },
    {
        path: '/open_request/:reqId/',
        component: NewRequestPage,
    },
    {
        path: '/requests/:reqId/',
        component: ResponsesPage,
    },
    {
        path: '/requests/response/:reqId/',
        component: ResponsePage,
    },
    {
        path: '/stores_list/',
        component: StoresList,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];
