export interface User{
    id:string,
    name:string,
    email:string,
    role:"Admin"|"User",
    password:string,
    createdAt:string,
}