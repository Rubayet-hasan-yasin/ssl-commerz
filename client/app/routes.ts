import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('checkout', './page/Checkout/Checkout.tsx')
] satisfies RouteConfig;
