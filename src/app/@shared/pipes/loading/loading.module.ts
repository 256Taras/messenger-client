import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadingPipe } from "@shared/pipes/loading/loading.pipe";

@NgModule({
  declarations: [LoadingPipe],
  imports: [CommonModule]
})
export class LoadingModule {}
