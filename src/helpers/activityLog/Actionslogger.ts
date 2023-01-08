export class Actionslogger {
  clickedBtn: HTMLElement;

  constructor(clickedBtn: HTMLElement) {
    this.clickedBtn = clickedBtn;
  }

  whichAction(e: any): any {
    const actionType = e.target.value;
    if (actionType === "xx") {
      console.log("f", actionType);
    }
    console.log(actionType);
  }

  // logAction(): string | null {
  //   const thisEntity = this.whichAction();
  //   const wording = `Admin has created a new ${thisEntity} on ${new Date()}`;
  //   return wording;
  // }
}
