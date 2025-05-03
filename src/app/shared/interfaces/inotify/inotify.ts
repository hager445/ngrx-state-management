export interface Inotify {
    id:number,
    message:string,
    type:notifyType,
    duration:number,
    selected:boolean
}
export enum notifyType{
success,
warning ,
error
}
