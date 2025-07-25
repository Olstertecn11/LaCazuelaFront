export interface AdminRoute {
  path: string,
  component: React.ComponentType<any>,
  public?: boolean,
  index?: boolean
}
