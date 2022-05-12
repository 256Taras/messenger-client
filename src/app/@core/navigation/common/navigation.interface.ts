export enum NavigationPath {
  Home = "",
  singUp = "sing-up",
  singIn = "sing-in"
}

export interface NavigationLink {
  route: NavigationPath;
  label: string;
  params?: Record<string, any>;
}
