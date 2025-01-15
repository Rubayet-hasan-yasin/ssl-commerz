import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./page/Checkout/Checkout.tsx"),
    // route('checkout', './page/Checkout/Checkout.tsx')
    route('/cancle', './components/Cancle.tsx'),
    route('/fail', './components/Fail.tsx'),
    route('/success', './components/Success.tsx'),
] satisfies RouteConfig;
