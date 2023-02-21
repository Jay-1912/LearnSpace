export interface ICourse{
    id: number,
    title: string,
    instructor: string,
    progress: number
}

export interface INotice{
    id: number,
    title: string,
    date: string
}

export interface INotification{
    id: number, 
    title: string,
    time: string
}