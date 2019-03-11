import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import FormPage from './components/pages/FormPage';
import DynamicRoutePage from './components/pages/DynamicRoutePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PanelLeftPage from './components/pages/PanelLeftPage';
import PanelRightPage from './components/pages/PanelRightPage';
import ResponsesPage from "./components/pages/ResponsesPage";
import ResponsePage from "./components/pages/ResponsePage";
import ChatPage from "./components/pages/ChatPage";

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
        path: '/requests/:reqId/',
        component: ResponsesPage,
    },
    {
        path: '/requests/response/:reqId/',
        component: ResponsePage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];
