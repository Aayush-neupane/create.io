import { RouteLoader } from "@/components/layout/RouteLoader";

/** Global loading boundary: RouteLoader stays invisible on fast loads and
 *  only appears when a route genuinely takes time (slow network, cold start). */
export default function Loading() {
  return <RouteLoader />;
}
