import { Routes } from "@angular/router";
import { LayoutComponent } from "@ui/templates/layout/layout.component";
import { NavigationPath } from "@core/navigation/common/navigation.interface";

export const authRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: NavigationPath.singUp,
        loadChildren: () =>
          import("@auth/modules/sign-up/sign-up.module").then(
            (modules) => modules.SignUpModule
          )
      },
      {
        path: NavigationPath.singIn,
        loadChildren: () =>
          import("@auth/modules/sing-in/sing-in.module").then(
            (modules) => modules.SingInModule
          )
      }
    ]
  }
];
