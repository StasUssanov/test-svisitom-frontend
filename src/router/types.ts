export type TRoute = {
  label?: string,
  path: string,
  showInHeader?: boolean,
  showInSidebar?: boolean,
  items?: TRouteList
}

export type TRouteList = {
  [p: string]: TRoute;
}
